import React, {PropsWithChildren} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';
import {TextProps} from '@shopify/argo-checkout';

import {ThemeTypographyStyle} from '../Theme';
import {
  utilityDefaultTextColorSubdued,
  utilityDefaultTextColorEmphasized,
  utilityDefaultColorAccent,
} from '../../utilities/legacy';
import typographyStyles from '../../utilities/typography-styles.css';

import styles from './Text.css';

interface Props
  extends PropsWithChildren<Omit<TextProps, 'size' | 'appearance'>> {
  /** Changes the text based on the Theme styles */
  style?: ThemeTypographyStyle;
  /** Changes the size */
  size?: 'xsmall' | TextProps['size'];
  appearance?: 'accent' | TextProps['appearance'];
}

export function Text({
  children,
  size,
  emphasized,
  subdued,
  appearance,
  role,
  style,
  id,
}: Props) {
  const className = classNames(
    styles.Text,
    emphasized && styles.emphasized,
    emphasized && utilityDefaultTextColorEmphasized,
    subdued && styles.subdued,
    subdued && utilityDefaultTextColorSubdued,
    size && styles[variationName('size', size)],
    appearance && styles[variationName('appearance', appearance)],
    appearance && appearance === 'accent' && utilityDefaultColorAccent,
    style && typographyStyles[style],
  );

  const content = emphasized ? <strong>{children}</strong> : children;

  const defaultProps = {
    className,
    id,
  };

  if (typeof role === 'string') {
    switch (role) {
      case 'address':
        return <address {...defaultProps}>{content}</address>;
      case 'deletion':
        return <del {...defaultProps}>{content}</del>;
      default:
        throw new Error('Invalid Text’s role');
    }
  }

  if (typeof role === 'object') {
    switch (role.type) {
      case 'abbreviation':
        return (
          <abbr
            {...{
              defaultProps,
              className: classNames(className, styles.Abbr),
            }}
            title={role.for}
          >
            {content}
          </abbr>
        );
      case 'directional-override':
        return (
          <bdo {...defaultProps} dir={role.direction}>
            {content}
          </bdo>
        );
      case 'datetime':
        return (
          <time {...defaultProps} dateTime={role.machineReadable}>
            {content}
          </time>
        );
      default:
        throw new Error('Invalid Text’s role');
    }
  }

  return emphasized ? (
    <strong {...defaultProps}>{children}</strong>
  ) : (
    <span {...defaultProps}>{children}</span>
  );
}
