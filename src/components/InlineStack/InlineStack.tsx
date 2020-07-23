import React, {PropsWithChildren} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';
import {InlineStackProps} from '@shopify/argo-checkout';

import styles from './InlineStack.css';

export function InlineStack({
  spacing,
  alignment,
  children,
}: PropsWithChildren<InlineStackProps>) {
  const className = classNames(
    styles.InlineStack,
    spacing && styles[variationName('spacing', spacing)],
    alignment && styles[variationName('alignment', alignment)],
  );

  return <div className={className}>{children}</div>;
}
