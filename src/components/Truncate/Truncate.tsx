import React, {ReactNode} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';

import styles from './Truncate.css';

type Variation = 'ellipsis';

export interface Props {
  children: ReactNode;
  variation?: Variation;
}

export function Truncate({children, variation = 'ellipsis'}: Props) {
  return (
    <span
      className={classNames(
        styles.Truncate,
        variation && styles[variationName('variation', variation)],
      )}
    >
      {children}
    </span>
  );
}
