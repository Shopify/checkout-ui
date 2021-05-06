import React, {PropsWithChildren} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';
import {LinkProps} from '@shopify/argo-checkout';

import {Button} from '../Button';
import {useThemeConfiguration} from '../Theme';

import {UnstyledLink} from './components';
import styles from './Link.css';

export interface Props extends LinkProps {
  /** Adds an underline to the link */
  underline?: boolean;
  /**
   * Specify the color of the link.
   * `inheritColor` will take the color of its parent.
   */
  appearance?: 'inheritColor';
}

/**
 * Link is used to navigate the buyer to another page or section within the same page.
 */
export function Link({
  children,
  to,
  language,
  onPress,
  underline,
  appearance,
  accessibilityLabel,
  ...rest
}: PropsWithChildren<Props>) {
  const {
    link: {colorHovered, colorPressed},
  } = useThemeConfiguration();

  if (!to) {
    return (
      <Button
        onPress={onPress}
        plain
        underline={underline}
        appearance={appearance}
        {...rest}
      >
        {children}
      </Button>
    );
  }

  return (
    <UnstyledLink
      className={classNames(
        styles.Link,
        (underline || appearance === 'inheritColor') && styles.underline,
        appearance && appearance === 'inheritColor'
          ? styles.appearanceInheritColor
          : styles.appearanceDefault,
        colorHovered && styles[variationName('colorHovered', colorHovered)],
        colorPressed && styles[variationName('colorPressed', colorPressed)],
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
