import React from 'react';
import {classNames, variationName} from '@shopify/css-utilities';
import {InlineSpacerProps} from '@shopify/argo-checkout';

import styles from './InlineSpacer.css';

export function InlineSpacer({size = 'base'}: InlineSpacerProps) {
  const className = classNames(
    styles.InlineSpacer,
    size && styles[variationName('size', size)],
  );
  return <div className={className} />;
}
