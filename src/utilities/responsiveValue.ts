import {CSSProperties} from 'react';
import {Breakpoint, Responsive} from '@shopify/checkout-ui-extensions';

import {BREAKPOINTS, useBreakpoint} from './breakpoint';

export function useResponsiveValue<T = any>(
  values: Partial<Record<Breakpoint, T>>,
) {
  const breakpoint = useBreakpoint();

  return getResponsiveValue(values, breakpoint);
}

type UseResponsiveStyleOptions = {
  [Property in keyof CSSProperties]?: {
    value?: CSSProperties[Property] | Responsive<CSSProperties[Property]>;
    /**
     * An optional function to transform the value for the current breakpoint.
     */
    transform?: (
      value: Exclude<CSSProperties[Property], undefined>,
    ) => CSSProperties[Property];
  };
};

/**
 * Returns a style object matching the passed one, where each property value
 * is the one that applies to the current viewport size.
 *
 * @param options
 */
export function useResponsiveStyle<
  T = UseResponsiveStyleOptions,
  U = {[key in keyof T]: string}
>(options: T): U | {} {
  const currentBreakpoint = useBreakpoint();

  return Object.entries(options).reduce(
    (styleObject, [cssProperty, {value, transform}]) => {
      return {
        ...styleObject,
        [cssProperty]:
          getResponsiveValue(
            maybeResponsiveToArray(value).reduce(
              (values, [breakpoint, breakpointValue]) => {
                if (breakpointValue) {
                  return {
                    ...values,
                    [breakpoint]: transform
                      ? transform(breakpointValue)
                      : breakpointValue,
                  };
                }

                return values;
              },
              {},
            ),
            currentBreakpoint,
          ) ?? {},
      };
    },
    {},
  );
}

export function maybeResponsiveToArray<T>(
  maybeResponsive: T | Responsive<T>,
): [Breakpoint, T][] {
  if (isResponsiveValue(maybeResponsive)) {
    return Object.entries(maybeResponsive as Responsive<T>) as [
      Breakpoint,
      T,
    ][];
  }

  return [['base' as Breakpoint, maybeResponsive as T]];
}

export function isResponsiveValue(obj: any): boolean {
  if (typeof obj !== 'object' || !obj) {
    return false;
  }

  let hasBreakpoint = false;
  for (const prop of Object.keys(obj)) {
    if (prop in BREAKPOINTS) {
      hasBreakpoint = true;
    } else {
      return false;
    }
  }

  return hasBreakpoint;
}

function getResponsiveValue<T = any>(
  values: Partial<Record<Breakpoint, T>>,
  breakpoint?: Breakpoint,
) {
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
