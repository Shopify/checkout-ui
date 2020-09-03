import React, {useRef, useMemo} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';

import {Heading} from '../Heading';
import {VisuallyHidden} from '../VisuallyHidden';
import {useThemeConfiguration} from '../Theme';

import {OptionListContext} from './context';
import styles from './OptionList.css';

export interface Props {
  id: string;
  selectedItems: string[];
  onChange(value: string[]): void;
  children?: React.ReactNode;
  allowMultiple?: boolean;
  title?: string;
  titleHidden?: boolean;
}

export function OptionList({
  id,
  selectedItems,
  onChange,
  title,
  titleHidden,
  allowMultiple = false,
  children,
}: Props) {
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const contextValue = useMemo(
    () => ({
      id,
      selectedItems,
      allowMultiple,
      get onChange() {
        return onChangeRef.current;
      },
    }),
    [allowMultiple, id, selectedItems],
  );

  const titleMarkup =
    title &&
    (titleHidden ? (
      <VisuallyHidden>
        <legend>{title}</legend>
      </VisuallyHidden>
    ) : (
      <legend className={styles.Title}>
        <Heading level={3} role="presentation">
          {title}
        </Heading>
      </legend>
    ));

  const {
    optionList: {
      background = 'surfaceTertiary',
      gap = 'none',
      border = 'full',
      borderStyle = 'base',
    },
  } = useThemeConfiguration();

  const className = classNames(
    styles.OptionList,
    styles[variationName('OptionList-background', background)],
    styles[variationName('OptionList-border', border)],
    styles[variationName('OptionList-borderStyle', borderStyle)],
    gap === 'none' && styles.isContainer,
  );

  return (
    <OptionListContext.Provider value={contextValue}>
      <fieldset>
        {titleMarkup}
        <div className={className}>{children}</div>
      </fieldset>
    </OptionListContext.Provider>
  );
}
