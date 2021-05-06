import React, {PropsWithChildren} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';
import {BlockStackProps} from '@shopify/argo-checkout';

import styles from './BlockStack.css';

export function BlockStack({
  alignment,
  spacing = 'base',
  children,
}: PropsWithChildren<BlockStackProps>) {
  const className = classNames(
    styles.BlockStack,
    alignment && styles[variationName('alignment', alignment)],
    spacing && styles[variationName('spacing', spacing)],
  );
  return <div className={className}>{children}</div>;
}
