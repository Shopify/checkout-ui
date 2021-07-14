import React from 'react';
import {classNames, variationName} from '@shopify/css-utilities';
import {TextProps} from '@shopify/checkout-ui-extensions';

import styles from './Redact.css';

export interface Props {
  /**
   * Block size of each redacted text line.
   * These sizes are equivalent to the Text sizes.
   * @default 'base'
   */
  blockSize?: TextProps['size'];
  /**
   * Inline size for each redacted text line.
   * @default [0.6, 0.75, 0.7]
   */
  inlineSizes?: number[];
  /**
   * Number of redacted lines to display
   * @default '1'
   */
  lines?: number;
}

export function Redact({
  lines = 1,
  blockSize = 'base',
  inlineSizes = [0.6, 0.75, 0.7],
}: Props) {
  // TODO: add informations for screen readers
  return (
    <>
      {[...Array(lines).keys()].map((i) => {
        const width = inlineSizes[i % inlineSizes.length] * 100;
        return (
          <div
            className={classNames(
              styles.Redact,
              styles[variationName('blockSize', blockSize)],
            )}
            style={{maxWidth: `${width}%`}}
            key={i}
          />
        );
      })}
    </>
  );
}
