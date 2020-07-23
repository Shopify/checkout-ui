import React, {ReactNode} from 'react';
import {classNames} from '@shopify/css-utilities';

import {colorCanvas} from '../../../../utilities/legacy';

import styles from './Canvas.css';

export interface CanvasProps {
  children: ReactNode;
}

export function Canvas({children}: CanvasProps) {
  return (
    <div className={classNames(styles.Canvas, colorCanvas)}>{children}</div>
  );
}
