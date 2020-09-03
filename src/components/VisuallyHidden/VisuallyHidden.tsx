import React, {PropsWithChildren} from 'react';
import {VisuallyHiddenProps} from '@shopify/argo-checkout';

import styles from './VisuallyHidden.css';

export function VisuallyHidden({
  children,
}: PropsWithChildren<VisuallyHiddenProps>) {
  return <span className={styles.VisuallyHidden}>{children}</span>;
}

export interface MaybeProps {
  condition: boolean;
}

export function MaybeVisuallyHidden({
  children,
  condition,
}: PropsWithChildren<MaybeProps>) {
  return condition ? (
    <VisuallyHidden>{children}</VisuallyHidden>
  ) : (
    <>{children}</>
  );
}
