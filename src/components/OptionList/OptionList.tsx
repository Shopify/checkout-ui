import React, {useRef, useMemo} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';

import {Heading} from '../Heading';
import {View} from '../View';
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
  controlHidden?: boolean;
}

export function OptionList({
  id,
  selectedItems,
  onChange,
  title,
  titleHidden,
  controlHidden = false,
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
      controlHidden,
      get onChange() {
        return onChangeRef.current;
      },
    }),
    [allowMultiple, id, selectedItems, controlHidden],
  );

  const titleMarkup =
    title &&
    (titleHidden ? (
      <View visibility="hidden">
        <legend>{title}</legend>
      </View>
    ) : (
      <legend className={styles.Title}>
        <Heading level={3} role="presentation">
          {title}
        </Heading>
      </legend>
    ));

  const {
    controls: {background: controlsBackground},
    optionList: {
      background: optionListBackground,
      spacing = 'none',
      border = 'full',
      borderStyle = 'base',
    },
  } = useThemeConfiguration();

  const background =
    optionListBackground || controlsBackground || 'surfaceTertiary';

  const className = classNames(
    styles.OptionList,
    styles[variationName('OptionList-background', background)],
    styles[variationName('OptionList-border', border)],
    styles[variationName('OptionList-borderStyle', borderStyle)],
    spacing === 'none' && styles.isContainer,
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
