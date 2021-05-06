import React, {
  PropsWithChildren,
  createContext,
  useContext,
  Children,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import {classNames} from '@shopify/css-utilities';

import {Icon, Props as IconProps} from '../Icon';
import {InlineStack} from '../InlineStack';
import {createIdCreator, useId} from '../../utilities/id';

import styles from './Tabs.css';

export interface TabsProps {
  /** An array of tabs which make up the tabbed interface */
  tabs: (Tab | string)[];
  /** Zero-based index of selected tab */
  selected: number;
  /** Accessibility label for the tab list */
  ariaLabel: string;
  /** Whether or not the tab panel has a border */
  bordered?: boolean;
  /** Callback when tab is selected */
  onChange(selected: number): void;
}

const createId = createIdCreator('Tabs');
const TabsContext = createContext<TabsContext | null>(null);

/**
 * Tabs are used when there’s multiple ways to display the same information,
 * like a map or list view. When a buyer needs to make a choice, use the
 * OptionList component instead as Buyers are more likely to choose the
 * non-default option. Don’t hide important information in tabs. Limit to two
 * of three tabs and keep labels short to optimize for mobile.
 */
export function Tabs({
  tabs,
  selected,
  ariaLabel,
  bordered,
  onChange,
  children,
}: PropsWithChildren<TabsProps>) {
  const id = useId(undefined, createId);
  const tabList = useRef<HTMLInputElement>(null);
  const lastIndex = tabs.length - 1;
  const childrenCount = Children.count(children);

  const handleKeyDown = useCallback(
    (event) => {
      const prev = selected - 1 < 0 ? lastIndex : selected - 1;
      const next = selected + 1 > lastIndex ? 0 : selected + 1;

      const handlerMap = new Map([
        ['ArrowLeft', prev],
        ['Left', prev],
        ['ArrowRight', next],
        ['Right', next],
        ['Home', 0],
        ['End', lastIndex],
      ]);

      const newSelected = handlerMap.get(event.key);

      if (newSelected != null) {
        event.preventDefault();
        onChange(newSelected);
      }
    },
    [onChange, selected, lastIndex],
  );

  useEffect(() => {
    const {current} = tabList;
    if (current == null) return;

    current.addEventListener('keydown', handleKeyDown, false);

    return () => {
      current.removeEventListener('keydown', handleKeyDown, false);
    };
  }, [tabList, handleKeyDown]);

  useEffect(() => {
    if (childrenCount !== tabs.length) {
      // eslint-disable-next-line no-console
      console.warn(
        `<Tabs /> has ${tabs.length} tabs and ${childrenCount} children. A mismatch will cause some content to be unavailable.`,
      );
    }
  }, [childrenCount, tabs.length]);

  const tabsMarkup: JSX.Element[] = [];
  const panelsMarkup: JSX.Element[] = [];

  Children.forEach(children, (child, index) => {
    const tab = tabs[index];

    if (tab != null) {
      const {label, icon} =
        typeof tab === 'string' ? {label: tab, icon: undefined} : tab;

      tabsMarkup.push(
        <Tab
          {...{label, icon, selected, onChange, id}}
          index={index}
          key={label}
        />,
      );
    }
    panelsMarkup.push(<TabPanel index={index}>{child}</TabPanel>);
  });

  return (
    <TabsContext.Provider value={{id, selected, bordered}}>
      <div className={styles.Tabs}>
        <div
          ref={tabList}
          role="tablist"
          aria-label={ariaLabel}
          className={styles.TabList}
        >
          {tabsMarkup}
        </div>
        {panelsMarkup}
      </div>
    </TabsContext.Provider>
  );
}

interface Tab {
  /** Display label */
  label: string;
  /** Display icon */
  icon?: IconProps['source'];
}

interface TabPanelProps {
  index: number;
}

interface TabsContext {
  selected: number;
  id: string;
  bordered?: boolean;
}

function Tab({
  label,
  icon,
  index,
  selected: selectedIndex,
  onChange,
  id,
}: Tab & Omit<TabsProps, 'tabs' | 'ariaLabel'> & {index: number; id: string}) {
  if (index == null) {
    throw new Error('`index` is missing');
  }
  const tabRef = useRef<HTMLButtonElement>(null);
  const mountedRef = useRef(false);
  const selected = selectedIndex === index;
  const markup =
    icon == null ? (
      label
    ) : (
      <InlineStack spacing="extraTight" blockAlignment="center">
        <Icon source={icon} size="large" />
        <span>{label}</span>
      </InlineStack>
    );

  useEffect(() => {
    if (tabRef.current && selected && mountedRef.current)
      tabRef.current.focus();
    else mountedRef.current = true;
  }, [tabRef, selected]);

  return (
    <button
      type="button"
      role="tab"
      tabIndex={selected ? 0 : -1}
      aria-selected={selected}
      id={`${id}Tab${index}`}
      aria-controls={`${id}TabPanel${index}`}
      onClick={() => onChange(index)}
      className={classNames(styles.Tab, selected && styles.selected)}
      ref={tabRef}
    >
      {markup}
    </button>
  );
}

function TabPanel({index, children}: PropsWithChildren<TabPanelProps>) {
  const {selected: selectedIndex, id, bordered} = useTabs();
  const selected = selectedIndex === index;

  return (
    <div
      role="tabpanel"
      id={`${id}TabPanel${index}`}
      aria-labelledby={`${id}Tab${index}`}
      hidden={!selected}
      className={classNames(styles.TabPanel, bordered && styles.bordered)}
    >
      {children}
    </div>
  );
}

function useTabs() {
  const context = useContext(TabsContext);

  if (context == null) {
    throw new Error('No tabs found in context');
  }

  return context;
}
