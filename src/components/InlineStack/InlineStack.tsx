import React, {PropsWithChildren} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';
import {InlineStackProps} from '@shopify/checkout-ui-extensions';

import styles from './InlineStack.css';

export interface Props extends InlineStackProps {
  /**
   * Specifies the block alignment if elements wrap.
   * @defaultValue `leading`
   */
  blockAlignment?: 'leading' | 'center' | 'trailing';
}

export function InlineStack({
  spacing = 'base',
  alignment,
  blockAlignment,
  children,
  wrap,
}: PropsWithChildren<Props>) {
  const innerClassName = classNames(
    styles.InlineStackInner,
    wrap && styles['InlineStackInner-wrap'],
    spacing && styles[variationName('InlineStackInner-spacing', spacing)],
    alignment && styles[variationName('InlineStackInner-alignment', alignment)],
    blockAlignment &&
      styles[variationName('InlineStackInner-blockAlignment', blockAlignment)],
  );

  return (
    <div className={styles.InlineStack}>
      <div className={innerClassName}>{children}</div>
    </div>
  );
}
