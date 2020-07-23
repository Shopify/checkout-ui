import React, {PropsWithChildren} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';
import {TextBlockProps} from '@shopify/argo-checkout';

import {ThemeTypographyStyle} from '../Theme';
import {
  utilityDefaultTextColorSubdued,
  utilityDefaultTextColorEmphasized,
} from '../../utilities/legacy';
import typographyStyles from '../../utilities/typography-styles.css';

import styles from './TextBlock.css';

export interface Props extends PropsWithChildren<TextBlockProps> {
  /** Visually change the text based on the Theme styles */
  style?: ThemeTypographyStyle;
}

export function TextBlock({
  children,
  size,
  emphasized,
  subdued,
  style,
  id,
}: Props) {
  const className = classNames(
    styles.TextBlock,
    size && styles[variationName('size', size)],
    emphasized && styles.isEmphasized,
    emphasized && utilityDefaultTextColorEmphasized,
    subdued && styles.isSubdued,
    subdued && utilityDefaultTextColorSubdued,
    style && typographyStyles[style],
  );

  const content = emphasized ? <strong>{children}</strong> : children;

  return (
    <p className={className} id={id}>
      {content}
    </p>
  );
}
