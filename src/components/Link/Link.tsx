import React from 'react';
import {classNames} from '@shopify/css-utilities';

import {Button} from '../Button';

import {UnstyledLink, UnstyledLinkProps} from './components';
import styles from './Link.css';

export interface Props extends Omit<UnstyledLinkProps, 'to'> {
  /** Destination to navigate to. It will render a plain Button if it’s not provided. */
  to?: string;
  /** Adds an underline to the link */
  underline?: boolean;
}

/**
 * Link is used to navigate the buyer to another page or section within the same page.
 */
export function Link({to, children, onPress, underline, ...rest}: Props) {
  if (!to) {
    return (
      <Button onPress={onPress} plain underline {...rest}>
        {children}
      </Button>
    );
  }

  return (
    <UnstyledLink
      className={classNames(styles.Link, underline && styles.underline)}
      to={to}
      onPress={onPress}
      {...rest}
    >
      {children}
    </UnstyledLink>
  );
}
