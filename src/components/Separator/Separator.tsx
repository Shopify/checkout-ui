import React from 'react';
import {classNames, variationName} from '@shopify/css-utilities';

import styles from './Separator.css';

type Direction = 'horizontal' | 'vertical';
type Width = 'thin' | 'medium' | 'thick' | 'xthick';

export interface Props {
  width?: Width;
  direction?: Direction;
}

const WIDTH_MAP = {
  thin: '1px',
  medium: '3px',
  thick: '5px',
  xthick: '10px',
};

export function Separator({width = 'thin', direction = 'horizontal'}: Props) {
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
