import React, {memo, useRef, useMemo, useEffect, ReactNode} from 'react';

import {useTheme} from '../../hooks';
import {CustomPropertyMap} from '../../types';

export const CustomProperties = memo(function CustomProperties({
  children,
}: {
  children: ReactNode;
}) {
  const theme = useTheme();
  const divRef = useRef<HTMLDivElement | null>(null);

  const customPropertiesStyle = useMemo(
    () => customPropertiesToStyleProp(theme.customProperties),
    [theme],
  );

  useEffect(() => {
    return theme.on('preview', (customProperties) => {
      const {current: root} = divRef;

      if (root == null) return;

      const normalized = customPropertiesToStyleProp(customProperties);
      for (const property of Object.keys(normalized)) {
        root.style.setProperty(property, normalized[property]);
      }
    });
  }, [theme]);

  return (
    <div style={customPropertiesStyle} ref={divRef}>
      {children}
    </div>
  );
});

function customPropertiesToStyleProp(
  properties: Partial<CustomPropertyMap>,
): {[key: string]: string} {
  const normalized: {[key: string]: string} = {};

  for (const key of Object.keys(properties) as (keyof typeof properties)[]) {
    normalized[
      `--x-${key.replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase()}`
    ] = properties[key]!;
  }

  return normalized;
}
