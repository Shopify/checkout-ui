import React, {ReactNode} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';

import styles from './View.css';

type Spacing = 'extraTight' | 'tight' | 'base' | 'loose' | 'extraLoose';

export interface Props {
  children?: ReactNode;
  /** Adjust the inline padding */
  inlinePadding?: Spacing;
  /** Adjust the block padding */
  blockPadding?: Spacing;
}

/**
 * A View is a generic container component. Its contents will always be their
 * “natural” size, so this component can be useful in layout components (like `Layout`, `Tiles`,
 * `BlockStack`, `InlineStack`) that would otherwise stretch their children to fit.
 */
export function View({children, inlinePadding, blockPadding}: Props) {
  const className = classNames(
    inlinePadding && styles[variationName('inlinePadding', inlinePadding)],
    blockPadding && styles[variationName('blockPadding', blockPadding)],
  );

  return <div className={className}>{children}</div>;
}
