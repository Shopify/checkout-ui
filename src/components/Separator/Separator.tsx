import React from 'react';
import {classNames, variationName} from '@shopify/css-utilities';
import {SeparatorProps} from '@shopify/argo-checkout';

import styles from './Separator.css';

const WIDTH_MAP = {
  thin: '1px',
  medium: '3px',
  thick: '5px',
  extraThick: '10px',
};

export function Separator({
  width = 'thin',
  direction = 'horizontal',
}: SeparatorProps) {
  const border = {
    horizontal: {borderBottomWidth: WIDTH_MAP[width]},
    vertical: {borderRightWidth: WIDTH_MAP[width]},
  };

  return (
    <div
      className={classNames(
        styles.Separator,
        styles[variationName('direction', direction)],
      )}
      style={border[direction]}
    />
  );
}
