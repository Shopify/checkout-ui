import React, {PropsWithChildren} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';
import {LinkProps} from '@shopify/checkout-ui-extensions';

import {Button} from '../Button';
import {useThemeConfiguration, ThemeTypographyStyle} from '../Theme';
import typographyStyles from '../../utilities/typography-styles.css';

import {UnstyledLink} from './components';
import styles from './Link.css';

export interface Props extends LinkProps {
  /**
   * Specify the color of the link.
   * `monochrome` will take the color of its parent.
   */
  appearance?: 'monochrome';
  /**
   * Changes the text based on the Theme styles
   */
  style?: ThemeTypographyStyle;
}

/**
 * Link is used to navigate the buyer to another page or section within the same page.
 */
export function Link({
  children,
  to,
  language,
  onPress,
  appearance,
  accessibilityLabel,
  ...rest
}: PropsWithChildren<Props>) {
  const {
    link: {colorHovered, typographyStyle},
  } = useThemeConfiguration();

  if (!to) {
    return (
      <Button onPress={onPress} kind="plain" appearance={appearance} {...rest}>
        {children}
      </Button>
    );
  }

  return (
    <UnstyledLink
      className={classNames(
        styles.Link,
        appearance && appearance === 'monochrome'
          ? styles.appearanceMonochrome
          : styles.appearanceDefault,
        colorHovered && styles[variationName('colorHovered', colorHovered)],
        typographyStyle && typographyStyles[typographyStyle],
      )}
      to={to}
      onPress={onPress}
      language={language}
      accessibilityLabel={accessibilityLabel}
      {...rest}
    >
      {children}
    </UnstyledLink>
  );
}
