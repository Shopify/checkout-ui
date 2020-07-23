import React, {PropsWithChildren} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';
import {TextContainerProps} from '@shopify/argo-checkout';

import styles from './TextContainer.css';

export function TextContainer({
  alignment,
  spacing,
  children,
}: PropsWithChildren<TextContainerProps>) {
  const className = classNames(
    styles.TextContainer,
    alignment && styles[variationName('alignment', alignment)],
    spacing && styles[variationName('spacing', spacing)],
  );

  return <div className={className}>{children}</div>;
}
