import React from 'react';
import {variationName} from '@shopify/css-utilities';
import {BlockSpacerProps} from '@shopify/checkout-ui-extensions';

import styles from './BlockSpacer.css';

export function BlockSpacer({size = 'base'}: BlockSpacerProps) {
  const className = size && styles[variationName('size', size)];
  return <div className={className} />;
}
