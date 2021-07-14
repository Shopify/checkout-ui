import React, {PropsWithChildren} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';
import {DividerProps} from '@shopify/checkout-ui-extensions';

import styles from './Divider.css';

export type Props = PropsWithChildren<DividerProps>;

export function Divider({
  alignment = 'center',
  width = 'thin',
  direction = 'horizontal',
  blockSpacing,
  children,
}: Props) {
  const hasChildren = React.Children.count(children) > 0;
  return (
    <div
      role="separator"
      className={classNames(
        styles.Divider,
        styles[variationName('direction', direction)],
        alignment &&
          hasChildren &&
          styles[variationName('alignment', alignment)],
        blockSpacing && styles[variationName('spacing', blockSpacing)],
        width && styles[variationName('borderWidth', width)],
      )}
    >
      {hasChildren && (
        <div
          className={classNames(
            styles.DividerContent,
            styles[variationName('contentDirection', direction)],
            alignment && styles[variationName('contentAlignment', alignment)],
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}
