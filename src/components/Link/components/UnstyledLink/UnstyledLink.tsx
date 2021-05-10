import React, {PropsWithChildren} from 'react';
import {LinkProps} from '@shopify/argo-checkout';

import {useLinkComponent} from '../../../AppContext';

import styles from './UnstyledLink.css';

export interface Props extends Omit<LinkProps, 'to'> {
  /** CSS class that is applied to the link */
  className?: string;
  /** Destination to navigate to. */
  to: string;
  ariaBusy?: boolean;
  ariaLive?: 'assertive' | 'polite' | 'off';
  ariaLabel?: string;
}

export function UnstyledLink({
  children,
  className: classNameProp,
  to,
  external,
  id,
  language,
  ariaBusy,
  ariaLive,
  ariaLabel,
  onPress,
}: PropsWithChildren<Props>) {
  const LinkComponent = useLinkComponent();

  const handleClick = onPress && (() => onPress());

  const className = classNameProp ?? styles.UnstyledLink;

  if (LinkComponent) {
    return (
      <LinkComponent
        to={to}
        onClick={handleClick}
        external={external}
        id={id}
        className={className}
        lang={language}
        aria-label={ariaLabel}
        aria-busy={ariaBusy}
        aria-live={ariaLive}
      >
        {children}
      </LinkComponent>
    );
  }

  const target = external ? '_blank' : undefined;
  const rel = external ? 'noopener noreferrer' : undefined;

  return (
    <a
      href={to}
      onClick={handleClick}
      target={target}
      rel={rel}
      id={id}
      className={className}
      lang={language}
      aria-label={ariaLabel}
      aria-busy={ariaBusy}
      aria-live={ariaLive}
    >
      {children}
    </a>
  );
}
