/* eslint id-length: off */

import React, {useMemo, ReactNode} from 'react';

import {UiTheme, ThemeContext} from './context';
import {
  Canvas,
  CustomProperties,
  CustomPropertiesFallback,
  MaybeWebFonts,
} from './components';

export interface Props {
  children?: ReactNode;
  theme: UiTheme;
}

export function Theme({children, theme}: Props) {
  const supportsCustomProperties = useSupportsCustomProperties();

  return (
    <ThemeContext.Provider value={theme}>
      <MaybeWebFonts condition={process.env.NODE_ENV !== 'production'}>
        {supportsCustomProperties ? (
          <CustomProperties>
            <Canvas>{children}</Canvas>
          </CustomProperties>
        ) : (
          <>
            <CustomPropertiesFallback />
            <Canvas>{children}</Canvas>
          </>
        )}
      </MaybeWebFonts>
    </ThemeContext.Provider>
  );
}

// TODO: if we ever do server rendering, this will need to be based on UA
// string on the server to avoid server/ client mismatches.
function useSupportsCustomProperties() {
  return useMemo(
    () => typeof CSS !== 'undefined' && CSS.supports('color', 'var(--test)'),
    [],
  );
}
