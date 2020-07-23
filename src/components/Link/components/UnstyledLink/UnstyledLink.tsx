import React, {ReactNode} from 'react';

import {useLinkComponent} from '../../../AppContext';

export interface Props {
  children?: ReactNode;
  /** CSS class that is applied to the link */
  className?: string;
  /** Destination to navigate to. */
  to: string;
  /** Open the link in a new window or tab */
  external?: boolean;
  /** Unique identifier. Typically used as a target for another component’s controls to associate an accessible label with an action. */
  id?: string;
  /** Callback when pressed. If `to` is provided, it will execute the callback and navigate specified. */
  onPress?(): void;
}

export function UnstyledLink({
  children,
  className,
  to,
  external,
  id,
  onPress,
}: Props) {
  const LinkComponent = useLinkComponent();

  if (LinkComponent) {
    return (
      <LinkComponent
        to={to}
        onClick={onPress}
        external={external}
        id={id}
        className={className}
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
      onClick={onPress}
      target={target}
      rel={rel}
      id={id}
      className={className}
    >
      {children}
    </a>
  );
}
