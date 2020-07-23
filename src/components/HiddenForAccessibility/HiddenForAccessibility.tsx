import React, {PropsWithChildren} from 'react';
import {HiddenForAccessibilityProps} from '@shopify/argo-checkout';

export function HiddenForAccessibility({
  children,
}: PropsWithChildren<HiddenForAccessibilityProps>) {
  return <span aria-hidden="true">{children}</span>;
}
