import {Breakpoint} from '@shopify/argo-checkout';

import {BREAKPOINTS, useBreakpoint} from './breakpoint';

export function useResponsiveValue<T = any>(
  values: Partial<Record<Breakpoint, T>>,
) {
  const breakpoint = useBreakpoint();

  if (!breakpoint) {
    return undefined;
  }

  if (values[breakpoint] !== undefined) {
    return values[breakpoint];
  }

  const breakpoints = Object.keys(BREAKPOINTS) as Breakpoint[];
  const breakpointIndex = breakpoints.indexOf(breakpoint);

  for (let i = breakpointIndex; i >= 0; i--) {
    const breakpoint = breakpoints[i];

    if (values[breakpoint] !== undefined) {
      return values[breakpoint];
    }
  }
}
