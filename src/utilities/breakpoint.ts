import {useEffect, useMemo, useCallback, useState} from 'react';
import {Breakpoint} from '@shopify/checkout-ui-extensions';

export interface Media {
  breakpoint: Breakpoint;
  query: string;
}

export type BreakpointsWidths = {
  [key in Breakpoint]: number;
};

export const BREAKPOINTS: BreakpointsWidths = {
  base: 0,
  small: 750,
  medium: 1000,
  large: 1200,
};

export function createMediaQueries(
  {addMaxWidth} = {addMaxWidth: true},
): Media[] {
  return Object.entries(BREAKPOINTS).map(
    ([breakpoint, minWidth], index, breakpoints) => {
      const nextBreakpoint = breakpoints[index + 1];
      const [, maxWidth] = nextBreakpoint ? nextBreakpoint : [];

      const query =
        maxWidth && addMaxWidth
          ? `(min-width: ${minWidth}px) and (max-width: ${maxWidth - 1}px)`
          : `(min-width: ${minWidth}px)`;

      return {
        breakpoint: breakpoint as Breakpoint,
        query,
      };
    },
  );
}

export function useBreakpoint() {
  const mediaQueries = useMemo(() => createMediaQueries(), []);

  const getBreakpoint = useCallback(() => {
    const media = mediaQueries.find(
      ({query}) => window.matchMedia(query).matches,
    );

    return media ? (media.breakpoint as Breakpoint) : undefined;
  }, [mediaQueries]);

  const [breakpoint, setBreakpoint] = useState<Breakpoint | undefined>(
    getBreakpoint(),
  );

  useEffect(() => {
    const onResize = () => {
      const newBreakpoint = getBreakpoint();
      if (breakpoint !== newBreakpoint) {
        setBreakpoint(newBreakpoint);
      }
    };

    onResize();

    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, [breakpoint, getBreakpoint, mediaQueries]);

  return breakpoint;
}
