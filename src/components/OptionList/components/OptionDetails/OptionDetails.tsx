import React from 'react';
import {classNames, variationName} from '@shopify/css-utilities';

import {useOptionList} from '../../hooks';
import styles from '../../OptionList.css';
import {useThemeConfiguration} from '../../../Theme';

export interface Props {
  controlledBy: string;
  children?: React.ReactNode;
}

export function OptionDetails({controlledBy, children}: Props) {
  const {selectedItems} = useOptionList();
  const {
    optionList: {detailsBackground},
  } = useThemeConfiguration();

  if (!children || !selectedItems.includes(controlledBy)) {
    return null;
  }

  return (
    <div
      className={classNames(
        styles.Details,
        detailsBackground &&
          styles[variationName('Details-background', detailsBackground)],
      )}
    >
      {children}
    </div>
  );
}
