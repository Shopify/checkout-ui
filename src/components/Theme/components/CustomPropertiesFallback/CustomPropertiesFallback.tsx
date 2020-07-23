import React, {memo, useMemo, useState, useEffect} from 'react';

import {UiTheme} from '../../context';
import {useTheme} from '../../hooks';
import * as legacyStyles from '../../../../utilities/legacy';

export const CustomPropertiesFallback = memo(
  function CustomPropertiesFallback() {
    const theme = useTheme();
    const [customProperties, setCustomProperties] = useState(
      theme.customProperties,
    );

    useEffect(() => {
      return theme.on('preview', (customProperties) => {
        setCustomProperties((existing) => ({...existing, ...customProperties}));
      });
    }, [theme]);

    const css = useMemo(() => toCss(customProperties), [customProperties]);

    return <style dangerouslySetInnerHTML={{__html: css}} />;
  },
);

function toCss(customProperties: UiTheme['customProperties']) {
  return cssFromObject({
    [`.${legacyStyles.button}`]: {
      color: customProperties.colorPrimaryText,
      background: customProperties.colorPrimary,
    },
    [`.${legacyStyles.button}:hover`]: {
      background: customProperties.colorPrimaryHovered,
    },
    [`.${legacyStyles.button}:active`]: {
      background: customProperties.colorPrimaryPressed,
    },
    [`.${legacyStyles.colorCanvas}`]: {
      color: customProperties.colorCanvasText,
      'border-color': customProperties.colorCanvasBorder,
      'background-color': customProperties.colorCanvas,
    },
    [`.${legacyStyles.colorCanvas} .${legacyStyles.utilityDefaultBorderColor}`]: {
      'border-color': customProperties.colorCanvasBorder,
    },
    [`.${legacyStyles.colorCanvas} .${legacyStyles.utilityDefaultTextColorSubdued}`]: {
      color: customProperties.colorCanvasTextSubdued,
    },
    [`.${legacyStyles.colorCanvas} .${legacyStyles.utilityDefaultTextColorEmphasized}`]: {
      color: customProperties.colorCanvasTextEmphasized,
    },
    [`.${legacyStyles.colorSurfacePrimary}`]: {
      color: customProperties.colorSurfacePrimaryText,
      'border-color': customProperties.colorSurfacePrimaryBorder,
      'background-color': customProperties.colorSurfacePrimary,
    },
    [`.${legacyStyles.colorSurfacePrimary} .${legacyStyles.utilityDefaultBorderColor}`]: {
      'border-color': customProperties.colorSurfacePrimaryBorder,
    },
    [`.${legacyStyles.colorSurfacePrimary} .${legacyStyles.utilityDefaultTextColorSubdued}`]: {
      color: customProperties.colorSurfacePrimaryTextSubdued,
    },
    [`.${legacyStyles.colorSurfacePrimary} .${legacyStyles.utilityDefaultTextColorEmphasized}`]: {
      color: customProperties.colorSurfacePrimaryTextEmphasized,
    },
    [`.${legacyStyles.colorSurfaceSecondary}`]: {
      color: customProperties.colorSurfaceSecondaryText,
      'border-color': customProperties.colorSurfaceSecondaryBorder,
      'background-color': customProperties.colorSurfaceSecondary,
    },
    [`.${legacyStyles.colorSurfaceSecondary} .${legacyStyles.utilityDefaultBorderColor}`]: {
      'border-color': customProperties.colorSurfaceSecondaryBorder,
    },
    [`.${legacyStyles.colorSurfaceSecondary} .${legacyStyles.utilityDefaultTextColorSubdued}`]: {
      color: customProperties.colorSurfaceSecondaryTextSubdued,
    },
    [`.${legacyStyles.colorSurfaceSecondary} .${legacyStyles.utilityDefaultTextColorEmphasized}`]: {
      color: customProperties.colorSurfaceSecondaryTextEmphasized,
    },
    [`.${legacyStyles.colorSurfaceTertiary}`]: {
      color: customProperties.colorSurfaceTertiaryText,
      'border-color': customProperties.colorSurfaceTertiaryBorder,
      'background-color': customProperties.colorSurfaceTertiary,
    },
    [`.${legacyStyles.colorSurfaceTertiary} .${legacyStyles.utilityDefaultBorderColor}`]: {
      'border-color': customProperties.colorSurfaceTertiaryBorder,
    },
    [`.${legacyStyles.colorSurfaceTertiary} .${legacyStyles.utilityDefaultTextColorSubdued}`]: {
      color: customProperties.colorSurfaceTertiaryTextSubdued,
    },
    [`.${legacyStyles.colorSurfaceTertiary} .${legacyStyles.utilityDefaultTextColorEmphasized}`]: {
      color: customProperties.colorSurfaceTertiaryTextEmphasized,
    },
  });
}

function cssFromObject(cssObject: {
  [key: string]: {[key: string]: string | undefined};
}) {
  const selectors = [];

  for (const selector of Object.keys(cssObject)) {
    const propertyValues: string[] = [];

    for (const property of Object.keys(cssObject[selector])) {
      const value = cssObject[selector][property];
      if (value) propertyValues.push(`${property}: ${value} !important;`);
    }

    if (propertyValues.length > 0)
      selectors.push(`${selector} {\n  ${propertyValues.join('\n  ')}\n}`);
  }

  return selectors.join('\n');
}
