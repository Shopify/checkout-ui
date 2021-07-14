import React, {memo, useMemo, useState, useEffect} from 'react';

import {UiTheme} from '../../context';
import {useTheme} from '../../hooks';
import * as legacyStyles from '../../../../utilities/legacy';
import {ThemeDefault} from '../../../../utilities/style';

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
    [`.${legacyStyles.button}::before, .${legacyStyles.button}::after`]: {
      display: 'none',
    },
    [`.${legacyStyles.buttonPrimary}`]: {
      color:
        customProperties.colorPrimaryActionText ??
        ThemeDefault.ColorPrimaryActionText,
      background:
        customProperties.colorPrimaryAction ?? ThemeDefault.ColorPrimaryAction,
      padding:
        customProperties.primaryButtonBlockPadding ??
        ThemeDefault.ButtonPadding,
      'border-radius':
        customProperties.primaryButtonBorderRadius ??
        ThemeDefault.ButtonBorderRadius,
    },
    [`.${legacyStyles.buttonSecondary}`]: {
      color:
        customProperties.colorSecondaryAction ??
        ThemeDefault.ColorSecondaryAction,
      background: 'transparent',
      'border-color':
        customProperties.colorSecondaryAction ??
        ThemeDefault.ColorSecondaryAction,
      padding:
        customProperties.secondaryButtonBlockPadding ??
        ThemeDefault.ButtonPadding,
      'border-radius':
        customProperties.primaryButtonBorderRadius ??
        ThemeDefault.ButtonBorderRadius,
    },
    [`.${legacyStyles.buttonPrimary}.${legacyStyles.buttonCritical}`]: {
      color:
        customProperties.colorCriticalText ?? ThemeDefault.ColorCriticalText,
      background:
        customProperties.colorCriticalAccent ??
        ThemeDefault.ColorCriticalAccent,
    },
    [`.${legacyStyles.buttonSecondary}.${legacyStyles.buttonCritical}`]: {
      color:
        customProperties.colorCriticalAccent ??
        ThemeDefault.ColorCriticalAccent,
      background: 'transparent',
      'border-color':
        customProperties.colorCriticalAccent ??
        ThemeDefault.ColorCriticalAccent,
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
    [`.${legacyStyles.colorSurfacePrimary} .${legacyStyles.utilityDefaultColorAccent}`]: {
      color: customProperties.colorSurfacePrimaryAccent,
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
    [`.${legacyStyles.colorSurfaceSecondary} .${legacyStyles.utilityDefaultColorAccent}`]: {
      color: customProperties.colorSurfaceSecondaryAccent,
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
    [`.${legacyStyles.colorSurfaceTertiary} .${legacyStyles.utilityDefaultColorAccent}`]: {
      color: customProperties.colorSurfaceTertiaryAccent,
    },
    [`.${legacyStyles.colorCriticalAccent}`]: {
      color:
        customProperties.colorCriticalAccent ??
        ThemeDefault.ColorCriticalAccent,
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
