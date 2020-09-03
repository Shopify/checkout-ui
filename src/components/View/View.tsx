import React, {PropsWithChildren} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';
import {ViewProps} from '@shopify/argo-checkout';

import styles from './View.css';

/**
 * A View is a generic container component. Its contents will always be their
 * “natural” size, so this component can be useful in layout components (like `Layout`, `Tiles`,
 * `BlockStack`, `InlineStack`) that would otherwise stretch their children to fit.
 */
export function View({
  children,
  inlinePadding,
  blockPadding,
}: PropsWithChildren<ViewProps>) {
  const className = classNames(
    inlinePadding && styles[variationName('inlinePadding', inlinePadding)],
    blockPadding && styles[variationName('blockPadding', blockPadding)],
  );

  return <div className={className}>{children}</div>;
}
