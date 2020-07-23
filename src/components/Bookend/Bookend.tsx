import React, {PropsWithChildren} from 'react';
import {BookendProps} from '@shopify/argo-checkout';
import {classNames, variationName} from '@shopify/css-utilities';

import styles from './Bookend.css';

export function Bookend({
  children,
  spacing,
  alignment,
  leading,
  trailing,
}: PropsWithChildren<BookendProps>) {
  return (
    <div
      className={classNames(
        styles.Bookend,
        leading && styles.leading,
        trailing && styles.trailing,
        spacing && styles[variationName('spacing', spacing)],
        alignment && styles[variationName('alignment', alignment)],
      )}
    >
      {children}
    </div>
  );
}
