/* eslint id-length: off */

import {createContext} from 'react';

import {
  parseHsl,
  toRgb,
  Hsl,
  HslColorString,
  HslColorTuple,
} from '../../utilities/hsluv';

import {
  ThemeConfiguration,
  ThemeOptions,
  CustomPropertyMap,
  RoleColors,
  RoleColorOverrides,
  ColorGroupOverrides,
  ThemeConstructor,
  TypographyScale,
  TypographyScaleOverrides,
  DurationScale,
  DurationScaleOverrides,
  ThemeTypographyFonts,
  ThemeTypographyWeight,
  ColorGroup,
} from './types';
import {modularScale} from './utilities/modularScale';

interface EventMap {
  change: (configuration: ThemeConfiguration) => void;
  preview: (customProperties: Partial<CustomPropertyMap>) => void;
}

export const ThemeContext = createContext<UiTheme | undefined>(undefined);

export function createTheme(
  {
    global = {},
    durationScale = {},
    buyerJourney = {},
    typographyScale = {},
    typographyPrimary = {},
    typographySecondary = {},
    headingLevel1 = {},
    headingLevel2 = {},
    headingLevel3 = {},
    link = {},
    controls = {},
    label = {},
    textFields = {},
    stepper = {},
    select = {},
    checkbox = {},
    radio = {},
    optionList = {},
    reviewBlock = {},
    lineItems = {},
    stockProblemsLineItems = {},
    throttleLineItems = {},
    moneyLines = {},
    moneySummary = {},
    primaryButton = {},
    secondaryButton = {},
    formLayout = {},
    tag = {},
    tooltip = {},
    popover = {},
    banner = {},
    thumbnail = {},
    typographyStyle1 = {},
    typographyStyle2 = {},
    typographyStyle3 = {},
    typographyStyle4 = {},
    typographyStyle5 = {},
    typographyStyle6 = {},
    typographyStyle7 = {},
    typographyStyle8 = {},
    typographyStyle9 = {},
    colors,
  }: Partial<ThemeConstructor> = {},
  {legacy}: Partial<ThemeOptions> = {},
): UiTheme {
  return new UiTheme(
    {
      global,
      durationScale,
      buyerJourney,
      typographyScale,
      typographyPrimary,
      typographySecondary,
      headingLevel1,
      headingLevel2,
      headingLevel3,
      link,
      controls,
      label,
      textFields,
      stepper,
      select,
      checkbox,
      radio,
      optionList,
      reviewBlock,
      lineItems,
      stockProblemsLineItems,
      throttleLineItems,
      moneyLines,
      moneySummary,
      primaryButton,
      secondaryButton,
      formLayout,
      tag,
      tooltip,
      popover,
      banner,
      thumbnail,
      typographyStyle1,
      typographyStyle2,
      typographyStyle3,
      typographyStyle4,
      typographyStyle5,
      typographyStyle6,
      typographyStyle7,
      typographyStyle8,
      typographyStyle9,
      colors,
    },
    {
      legacy,
    },
  );
}

export class UiTheme {
  configuration: ThemeConfiguration;
  options: ThemeOptions;
  customProperties: Partial<CustomPropertyMap>;

  private readonly listeners: {[K in keyof EventMap]: Set<EventMap[K]>} = {
    change: new Set(),
    preview: new Set(),
  };

  constructor(
    configuration: ThemeConstructor,
    options: ThemeOptions = {legacy: false},
  ) {
    this.configuration = {
      ...configuration,
      colors: colorsFromOverrides(configuration.colors ?? {}),
      typographyScale: configuration.typographyScale ?? {},
      durationScale: configuration.durationScale ?? {},
    };
    this.customProperties = customPropertiesFromThemeConfiguration(
      this.configuration,
      options,
    );
    this.options = options;
  }

  preview(
    overrides: Partial<RoleColorOverrides>,
    typographyScale: Partial<TypographyScaleOverrides>,
    durationScale: Partial<DurationScaleOverrides>,
  ) {
    for (const key of Object.keys(
      this.configuration.colors,
    ) as (keyof RoleColors)[]) {
      this.configuration.colors[key] = overrideColorGroup(
        this.configuration.colors[key],
        overrides[key],
      );
    }

    const colorsCustomProperties = customPropertiesFromRoleColors(
      this.configuration.colors,
      this.options.legacy ?? false,
    );

    const typographyScaleCustomProperties = customPropertiesFromScaleMap<
      TypographyScaleOverrides
    >(typographyScale, TYPOGRAPHY_SCALE_MAP);

    const durationScaleCustomProperties = customPropertiesFromScaleMap<
      DurationScaleOverrides
    >(durationScale, DURATION_SCALE_MAP);

    for (const listener of this.listeners.preview) {
      listener({
        ...colorsCustomProperties,
        ...typographyScaleCustomProperties,
        ...durationScaleCustomProperties,
      });
    }
  }

  set<Key extends keyof ThemeConfiguration>(
    key: Key,
    value: ThemeConfiguration[Key],
  ) {
    this.configuration = {...this.configuration, [key]: value};

    for (const listener of this.listeners.change) {
      listener(this.configuration);
    }

    const customProperties = customPropertiesFromThemeConfiguration(
      this.configuration,
      this.options,
    );

    for (const listener of this.listeners.preview) {
      listener(customProperties);
    }
  }

  on<Event extends keyof EventMap>(event: Event, listener: EventMap[Event]) {
    this.listeners[event].add(listener as any);

    return () => {
      this.listeners[event].delete(listener as any);
    };
  }
}

export function colorSubdued(colorGroup?: ColorGroup) {
  return colorGroup?.background?.adjust({
    l: (l) => (l > 50 ? l - 1.7 : Math.max(l - 5.2, 0)),
  });
}

export function colorDisabled(colorGroup?: ColorGroup) {
  return colorGroup?.background?.adjust({
    l: (l) => (l > 50 ? Math.min(l - 2.5, 97.5) : Math.max(l + 2.5, 2.5)),
  });
}

export function colorText(colorGroup?: ColorGroup, legacy?: boolean) {
  return (
    colorGroup?.foreground ??
    colorGroup?.background?.adjust({
      s: (s) => (s > 50 ? Math.max(s - 55, 0) : s),
      l: (l) =>
        isLight(colorGroup?.background, legacy)
          ? Math.max(l - 62.6, 0)
          : Math.min(l + 82, 98.3),
    })
  );
}

export function colorTextEmphasized(colorGroup?: ColorGroup, legacy?: boolean) {
  return colorGroup?.foreground
    ? colorGroup.foreground?.adjust({
        l: (l) =>
          isLight(colorGroup.foreground, legacy)
            ? Math.min(l + 15, 100)
            : l - 10,
      })
    : colorGroup?.background?.adjust({
        s: (s) => (s > 50 ? s : Math.min(s + 15, 100)),
        l: (l) =>
          isLight(colorGroup.background, legacy) ? Math.max(l - 77.5, 0) : 98.3,
      });
}

export function colorTextSubdued(colorGroup?: ColorGroup, legacy?: boolean) {
  return colorGroup?.foreground
    ? colorGroup.foreground?.adjust({
        l: (l) =>
          isLight(colorGroup.foreground, legacy)
            ? Math.max(l - 18.8, 0)
            : l + 12.7,
      })
    : colorGroup?.background?.adjust({
        s: (s) => (s > 50 ? Math.max(s - 55, 0) : s),
        l: (l) =>
          isLight(colorGroup.background, legacy)
            ? Math.max(l - 49.9, 10)
            : Math.min(l + 63.2, 90),
      });
}

function colorActionHovered(colorGroup?: ColorGroup) {
  return colorGroup?.background?.adjust({
    l: (l) => l - 10,
  });
}

function colorActionBorder(colorGroup?: ColorGroup) {
  return colorGroup?.background?.adjust({
    l: (l) => l - 10,
  });
}

function colorActionDisabled(colorGroup?: ColorGroup) {
  return colorGroup?.background?.adjust({
    s: () => 0,
  });
}

/* Currently used for default / hover */
function colorActionText(colorGroup?: ColorGroup, legacy?: boolean) {
  return (
    colorGroup?.foreground ??
    colorGroup?.background?.adjust({
      l: () => (isLight(colorGroup.background, legacy) ? 4 : 100),
    })
  );
}

function colorsFromOverrides(overrideColors: Partial<RoleColorOverrides>) {
  return (Object.keys(overrideColors) as (keyof RoleColorOverrides)[]).reduce<
    Partial<RoleColors>
  >((colors, key) => {
    const colorOrGroup = overrideColors[key];

    if (colorOrGroup == null) return colors;

    const {background, foreground, accent} = colorOrGroup;

    return {
      ...colors,
      [key]: {
        background: background ? normalizeColor(background) : undefined,
        foreground: foreground ? normalizeColor(foreground) : undefined,
        accent: accent ? normalizeColor(accent) : undefined,
      },
    };
  }, {});
}

function overrideColorGroup(
  colorGroup?: ColorGroup,
  overrideGroup?: ColorGroupOverrides,
) {
  if (!colorGroup || !overrideGroup) {
    return colorGroup;
  }

  const getColor = (color?: HslColorString | HslColorTuple | Hsl) => {
    return color ? normalizeColor(color) : undefined;
  };

  const getOverridenColor = (colorKey: keyof ColorGroup) => {
    return overrideGroup.hasOwnProperty(colorKey)
      ? getColor(overrideGroup[colorKey])
      : colorGroup[colorKey];
  };

  return {
    background: getOverridenColor('background'),
    foreground: getOverridenColor('foreground'),
    accent: getOverridenColor('accent'),
  };
}

function colorBorder(colorGroup?: ColorGroup, legacy?: boolean) {
  return colorGroup?.background?.adjust({
    s: (s) => (s > 50 ? Math.max(s - 55, 0) : s),
    l: (l) => (isLight(colorGroup.background, legacy) ? l - 13.3 : l + 21.2),
  });
}

export function colorBorderEmphasized(
  colorGroup?: ColorGroup,
  legacy?: boolean,
) {
  return colorGroup?.background?.adjust({
    s: (s) => (s > 50 ? Math.max(s - 55, 0) : s),
    l: (l) => (isLight(colorGroup.background, legacy) ? l - 38.7 : l + 63.2),
  });
}

function isLight(color?: Hsl, legacy = false): boolean {
  if (typeof color === 'undefined') return false;

  if (legacy) {
    return color.getYiqPerceivedBrightness() >= 0.65;
  }

  return color.l > 50;
}

function normalizeColor(color: HslColorString | HslColorTuple | Hsl) {
  if (color instanceof Hsl) return color;
  if (typeof color === 'string') return parseHsl(color);
  return new Hsl(...color);
}

const TYPOGRAPHY_FONT_SIZE_BASE = 14;

const COLOR_MAP: {
  [CustomProperty in keyof CustomPropertyMap]?: (
    roleColors: Partial<RoleColors>,
    legacy?: boolean,
  ) => Hsl | undefined;
} = {
  /* COLOR CANVAS */
  colorCanvas: ({canvas}) => canvas?.background,
  colorCanvasSubdued: ({canvas}) => colorSubdued(canvas),
  colorCanvasText: ({canvas}) => colorText(canvas),
  colorCanvasTextSubdued: ({canvas}) => colorTextSubdued(canvas),
  colorCanvasTextEmphasized: ({canvas}) => colorTextEmphasized(canvas),
  colorCanvasBorder: ({canvas}) => colorBorder(canvas),
  colorCanvasBorderEmphasized: ({canvas}) => colorBorderEmphasized(canvas),
  colorCanvasAccent: ({canvas}) => canvas?.accent,

  /* COLOR SURFACE PRIMARY */
  colorSurfacePrimary: ({surfacePrimary}) => surfacePrimary?.background,

  colorSurfacePrimaryDisabled: ({surfacePrimary}) =>
    colorDisabled(surfacePrimary),

  colorSurfacePrimarySubdued: ({surfacePrimary}) =>
    colorSubdued(surfacePrimary),

  colorSurfacePrimaryText: ({surfacePrimary}, legacy) =>
    colorText(surfacePrimary, legacy),

  colorSurfacePrimaryTextSubdued: ({surfacePrimary}, legacy) =>
    colorTextSubdued(surfacePrimary, legacy),

  colorSurfacePrimaryTextEmphasized: ({surfacePrimary}, legacy) =>
    colorTextEmphasized(surfacePrimary, legacy),

  colorSurfacePrimaryBorder: ({surfacePrimary}, legacy) =>
    colorBorder(surfacePrimary, legacy),

  colorSurfacePrimaryBorderEmphasized: ({surfacePrimary}, legacy) =>
    colorBorderEmphasized(surfacePrimary, legacy),

  colorSurfacePrimaryAccent: ({surfacePrimary}) => surfacePrimary?.accent,

  /* COLOR SURFACE SECONDARY */
  colorSurfaceSecondary: ({surfaceSecondary}) => surfaceSecondary?.background,

  colorSurfaceSecondaryDisabled: ({surfaceSecondary}) =>
    colorDisabled(surfaceSecondary),

  colorSurfaceSecondarySubdued: ({surfaceSecondary}) =>
    colorSubdued(surfaceSecondary),

  colorSurfaceSecondaryText: ({surfaceSecondary}, legacy) =>
    colorText(surfaceSecondary, legacy),

  colorSurfaceSecondaryTextSubdued: ({surfaceSecondary}, legacy) =>
    colorTextSubdued(surfaceSecondary, legacy),

  colorSurfaceSecondaryTextEmphasized: ({surfaceSecondary}, legacy) =>
    colorTextEmphasized(surfaceSecondary, legacy),

  colorSurfaceSecondaryBorder: ({surfaceSecondary}, legacy) =>
    colorBorder(surfaceSecondary, legacy),

  colorSurfaceSecondaryBorderEmphasized: ({surfaceSecondary}, legacy) =>
    colorBorderEmphasized(surfaceSecondary, legacy),

  colorSurfaceSecondaryAccent: ({surfaceSecondary}) => surfaceSecondary?.accent,

  /* COLOR SURFACE TERTIARY */
  colorSurfaceTertiary: ({surfaceTertiary}) => surfaceTertiary?.background,

  colorSurfaceTertiaryDisabled: ({surfaceTertiary}) =>
    colorDisabled(surfaceTertiary),

  colorSurfaceTertiarySubdued: ({surfaceTertiary}) =>
    colorSubdued(surfaceTertiary),

  colorSurfaceTertiaryText: ({surfaceTertiary}, legacy) =>
    colorText(surfaceTertiary, legacy),

  colorSurfaceTertiaryTextSubdued: ({surfaceTertiary}, legacy) =>
    colorTextSubdued(surfaceTertiary, legacy),

  colorSurfaceTertiaryTextEmphasized: ({surfaceTertiary}, legacy) =>
    colorTextEmphasized(surfaceTertiary, legacy),

  colorSurfaceTertiaryBorder: ({surfaceTertiary}, legacy) =>
    colorBorder(surfaceTertiary, legacy),

  colorSurfaceTertiaryBorderEmphasized: ({surfaceTertiary}, legacy) =>
    colorBorderEmphasized(surfaceTertiary, legacy),

  colorSurfaceTertiaryAccent: ({surfaceTertiary}) => surfaceTertiary?.accent,

  /* COLOR STYLES */
  color1: ({color1}) => color1?.background,
  color1Text: ({color1}) => color1?.foreground,
  color2: ({color2}) => color2?.background,
  color2Text: ({color2}) => color2?.foreground,

  /* COLOR PRIMARY ACTION */
  colorPrimaryAction: ({primaryAction}) => primaryAction?.background,
  colorPrimaryActionHovered: ({primaryAction}) =>
    colorActionHovered(primaryAction),
  colorPrimaryActionText: ({primaryAction}, legacy) =>
    colorActionText(primaryAction, legacy),
  colorPrimaryActionTextHovered: ({primaryAction}, legacy) =>
    colorActionText(primaryAction, legacy),
  colorPrimaryActionBorder: ({primaryAction}) =>
    colorActionBorder(primaryAction),
  colorPrimaryActionDisabled: ({primaryAction}) =>
    colorActionDisabled(primaryAction),

  /* COLOR SECONDARY ACTION */
  colorSecondaryAction: ({secondaryAction}) => secondaryAction?.background,
  colorSecondaryActionHovered: ({secondaryAction}) =>
    colorActionHovered(secondaryAction),
  colorSecondaryActionText: ({secondaryAction}, legacy) =>
    colorActionText(secondaryAction, legacy),
  colorSecondaryActionTextHovered: ({secondaryAction}, legacy) =>
    colorActionText(secondaryAction, legacy),
  colorSecondaryActionBorder: ({secondaryAction}) =>
    colorActionBorder(secondaryAction),
  colorSecondaryActionDisabled: ({secondaryAction}) =>
    colorActionDisabled(secondaryAction),

  /* COLOR TERTIARY ACTION */
  colorTertiaryAction: ({tertiaryAction}) => tertiaryAction?.background,
  colorTertiaryActionText: ({tertiaryAction}) =>
    colorActionText(tertiaryAction),
  colorTertiaryActionTextSubdued: ({tertiaryAction}, legacy) =>
    tertiaryAction?.foreground
      ? tertiaryAction?.foreground?.adjust({
          l: (l) => Math.min(l + 20, 100),
        })
      : tertiaryAction?.background?.adjust({
          s: (s) => (s > 50 ? Math.max(s - 55, 0) : s),
          l: (l) =>
            isLight(tertiaryAction?.background, legacy)
              ? Math.max(l - 49.9, 10)
              : Math.min(l + 63.2, 90),
        }),

  /* COLOR INTERACTIVE */
  colorInteractive: ({interactive}) => interactive?.background,
  colorInteractiveHovered: ({interactive}) =>
    interactive?.background?.adjust({
      l: (l) => l + 5,
    }),
  colorInteractivePressed: ({interactive}) =>
    interactive?.background?.adjust({
      l: (l) => l + 5,
    }),
  colorInteractiveText: ({interactive}) => interactive?.foreground,
  colorInteractiveTextHovered: ({interactive}) =>
    interactive?.foreground?.adjust({
      l: (l) => l + 10,
    }),
  colorInteractiveTextPressed: ({interactive}) =>
    interactive?.foreground?.adjust({
      l: (l) => l + 10,
    }),

  /* COLOR INFO */
  colorInfo: ({info}) => info?.background,
  colorInfoDisabled: ({info}) => colorDisabled(info),
  colorInfoSubdued: ({info}) => colorSubdued(info),
  colorInfoText: ({info}, legacy) => colorText(info, legacy),
  colorInfoTextSubdued: ({info}, legacy) => colorTextSubdued(info, legacy),
  colorInfoTextEmphasized: ({info}, legacy) =>
    colorTextEmphasized(info, legacy),
  colorInfoBorder: ({info}, legacy) => colorBorder(info, legacy),
  colorInfoBorderEmphasized: ({info}, legacy) =>
    colorBorderEmphasized(info, legacy),
  colorInfoAccent: ({info}) => info?.accent,

  /* COLOR SUCCESS */
  colorSuccess: ({success}) => success?.background,
  colorSuccessDisabled: ({success}) => colorDisabled(success),
  colorSuccessSubdued: ({success}) => colorSubdued(success),
  colorSuccessText: ({success}, legacy) => colorText(success, legacy),
  colorSuccessTextSubdued: ({success}, legacy) =>
    colorTextSubdued(success, legacy),
  colorSuccessTextEmphasized: ({success}, legacy) =>
    colorTextEmphasized(success, legacy),
  colorSuccessBorder: ({success}, legacy) => colorBorder(success, legacy),
  colorSuccessBorderEmphasized: ({success}, legacy) =>
    colorBorderEmphasized(success, legacy),
  colorSuccessAccent: ({success}) => success?.accent,

  /* COLOR WARNING */
  colorWarning: ({warning}) => warning?.background,
  colorWarningDisabled: ({warning}) => colorDisabled(warning),
  colorWarningSubdued: ({warning}) => colorSubdued(warning),
  colorWarningText: ({warning}, legacy) => colorText(warning, legacy),
  colorWarningTextSubdued: ({warning}, legacy) =>
    colorTextSubdued(warning, legacy),
  colorWarningTextEmphasized: ({warning}, legacy) =>
    colorTextEmphasized(warning, legacy),
  colorWarningBorder: ({warning}, legacy) => colorBorder(warning, legacy),
  colorWarningBorderEmphasized: ({warning}, legacy) =>
    colorBorderEmphasized(warning, legacy),
  colorWarningAccent: ({warning}) => warning?.accent,

  /* COLOR CRITICAL */
  colorCritical: ({critical}) => critical?.background,
  colorCriticalDisabled: ({critical}) => colorDisabled(critical),
  colorCriticalSubdued: ({critical}) => colorSubdued(critical),
  colorCriticalText: ({critical}, legacy) => colorText(critical, legacy),
  colorCriticalTextSubdued: ({critical}, legacy) =>
    colorTextSubdued(critical, legacy),
  colorCriticalTextEmphasized: ({critical}, legacy) =>
    colorTextEmphasized(critical, legacy),
  colorCriticalBorder: ({critical}, legacy) => colorBorder(critical, legacy),
  colorCriticalBorderEmphasized: ({critical}, legacy) =>
    colorBorderEmphasized(critical, legacy),
  colorCriticalAccent: ({critical}) => critical?.accent,
};

const TYPOGRAPHY_SCALE_MAP: {
  [CustomProperty in keyof CustomPropertyMap]?: (
    scale: Partial<TypographyScale>,
  ) => string | undefined;
} = {
  typographySizeExtraSmall: ({base, ratio}) =>
    base ? modularScale(-1, base, ratio) : undefined,
  typographySizeSmall: ({base, ratio}) =>
    base ? modularScale(-0.5, base, ratio) : undefined,
  typographySizeDefault: ({base, ratio}) =>
    base ? modularScale(0, base, ratio) : undefined,
  typographySizeMedium: ({base, ratio}) =>
    base ? modularScale(0.5, base, ratio) : undefined,
  typographySizeLarge: ({base, ratio}) =>
    base ? modularScale(1, base, ratio) : undefined,
  typographySizeExtraLarge: ({base, ratio}) =>
    base ? modularScale(2, base, ratio) : undefined,
  typographySizeExtraExtraLarge: ({base, ratio}) =>
    base ? modularScale(3, base, ratio) : undefined,
};

const TYPOGRAPHY_SIZE_MAP = {
  extraSmall: 'var(--x-typography-size-extra-small)',
  small: 'var(--x-typography-size-small)',
  base: 'var(--x-typography-size-default)',
  medium: 'var(--x-typography-size-medium)',
  large: 'var(--x-typography-size-large)',
  extraLarge: 'var(--x-typography-size-extra-large)',
  extraExtraLarge: 'var(--x-typography-size-extra-extra-large)',
};

const TYPOGRAPHY_CASE_MAP = {
  none: 'none',
  title: 'capitalize',
  upper: 'uppercase',
  lower: 'lowercase',
};

const TYPOGRAPHY_FONTS_MAP = {
  primary: 'var(--x-typography-primary-fonts)',
  secondary: 'var(--x-typography-secondary-fonts)',
};

const TYPOGRAPHY_KERNING_MAP = {
  base: 'normal',
  loose: '0.125em',
  xloose: '0.16em',
};

const TYPOGRAPHY_DECORATION_MAP = {
  none: 'none',
  underline: 'underline',
};

const TYPOGRAPHY_LINE_SIZE_MAP = {
  base: '1.5',
  large: '1.5',
  small: '1.3',
};

const TYPOGRAPHY_PRIMARY_WEIGHT_MAP = {
  base: 'var(--x-typography-primary-weight-base)',
  bold: 'var(--x-typography-primary-weight-bold)',
};

const TYPOGRAPHY_SECONDARY_WEIGHT_MAP = {
  base: 'var(--x-typography-secondary-weight-base)',
  bold: 'var(--x-typography-secondary-weight-bold)',
};

const SPACING_RATIO = 1.225;

const SPACING_MAP: {
  [CustomProperty in keyof CustomPropertyMap]?: (
    scale: Partial<TypographyScale>,
  ) => string | undefined;
} = {
  spacingTight4x: ({base}) =>
    base ? modularScale(-5, base, SPACING_RATIO) : undefined,
  spacingTight3x: ({base}) =>
    base ? modularScale(-4, base, SPACING_RATIO) : undefined,
  spacingTight2x: ({base}) =>
    base ? modularScale(-3, base, SPACING_RATIO) : undefined,
  spacingTight1x: ({base}) =>
    base ? modularScale(-2, base, SPACING_RATIO) : undefined,
  spacingTight: ({base}) =>
    base ? modularScale(-1, base, SPACING_RATIO) : undefined,
  spacingBase: ({base}) =>
    base ? modularScale(0, base, SPACING_RATIO) : undefined,
  spacingLoose: ({base}) =>
    base ? modularScale(1, base, SPACING_RATIO) : undefined,
  spacingLoose1x: ({base}) =>
    base ? modularScale(2, base, SPACING_RATIO) : undefined,
  spacingLoose2x: ({base}) =>
    base ? modularScale(3, base, SPACING_RATIO) : undefined,
  spacingLoose3x: ({base}) =>
    base ? modularScale(4, base, SPACING_RATIO) : undefined,
  spacingLoose4x: ({base}) =>
    base ? modularScale(5, base, SPACING_RATIO) : undefined,
};

const SIMPLE_BORDER_RADIUS_MAP = {
  none: 'var(--x-border-radius-none)',
  base: 'var(--x-border-radius-base)',
};

const BORDER_RADIUS_MAP = {
  ...SIMPLE_BORDER_RADIUS_MAP,
  tight: 'var(--x-border-radius-tight)',
  fullyRounded: 'var(--x-border-radius-fully-rounded)',
};

const BORDER_MAP = {
  full: 'var(--x-border-full)',
  blockEnd: 'var(--x-border-block-end)',
  none: 'var(--x-border-none)',
};

const SPACING_VAR_MAP = {
  none: '0',
  extraTight: 'var(--x-spacing-tight4x)',
  tight: 'var(--x-spacing-tight1x)',
  base: 'var(--x-spacing-base)',
  loose: 'var(--x-spacing-loose1x)',
  extraLoose: 'var(--x-spacing-loose4x)',
};

const DURATION_VAR_MAP = {
  none: '0',
  fast: 'var(--x-duration-fast)',
  base: 'var(--x-duration-base)',
  slow: 'var(--x-duration-slow)',
  slower: 'var(--x-duration-slower)',
  slowest: 'var(--x-duration-slowest)',
};

const DURATION_SCALE_MAP: {
  [CustomProperty in keyof CustomPropertyMap]?: (
    scale: Partial<DurationScale>,
  ) => string | undefined;
} = {
  durationFast: ({base, ratio}) =>
    base ? modularScale(-1, base, ratio, 'ms') : undefined,
  durationBase: ({base, ratio}) =>
    base ? modularScale(0, base, ratio, 'ms') : undefined,
  durationSlow: ({base, ratio}) =>
    base ? modularScale(1, base, ratio, 'ms') : undefined,
  durationSlower: ({base, ratio}) =>
    base ? modularScale(2, base, ratio, 'ms') : undefined,
  durationSlowest: ({base, ratio}) =>
    base ? modularScale(3, base, ratio, 'ms') : undefined,
};

/**
 * This scaling factor represents the ratio of the desired size of the radio/checkbox to the base font-size of the document.
 */
const RADIO_SCALE_BASE = 18 / TYPOGRAPHY_FONT_SIZE_BASE;
const RADIO_LARGE_SCALE = 22 / TYPOGRAPHY_FONT_SIZE_BASE;

const CHECKBOX_SCALE = 18 / TYPOGRAPHY_FONT_SIZE_BASE;

/**
 * This scaling factor represents the ratio of the desired size of the icons to the base font-size of the document.
 */
const ICON_SMALL_SCALE = 10 / TYPOGRAPHY_FONT_SIZE_BASE;
const ICON_LARGE_SCALE = 18 / TYPOGRAPHY_FONT_SIZE_BASE;

function customPropertiesFromThemeConfiguration(
  {
    global,
    durationScale,
    buyerJourney,
    colors,
    typographyScale,
    typographyPrimary,
    typographySecondary,
    controls,
    textFields,
    select,
    optionList,
    checkbox,
    moneyLines,
    moneySummary,
    reviewBlock,
    primaryButton,
    secondaryButton,
    tag,
    banner,
    thumbnail,
    link,
    typographyStyle1,
    typographyStyle2,
    typographyStyle3,
    typographyStyle4,
    typographyStyle5,
    typographyStyle6,
    typographyStyle7,
    typographyStyle8,
    typographyStyle9,
  }: ThemeConfiguration,
  {legacy}: ThemeOptions,
): Partial<CustomPropertyMap> {
  const globalTypographyLetterCase = maybeInMap(TYPOGRAPHY_CASE_MAP)(
    global.typographyLetterCase,
  );
  const globalTypographyLineSizeDefault = maybeInMap(TYPOGRAPHY_LINE_SIZE_MAP)(
    global.typographyLineSizeDefault,
  );
  const globalTypographyLineSizeSmall = maybeInMap(TYPOGRAPHY_LINE_SIZE_MAP)(
    global.typographyLineSizeSmall,
  );
  const globalTypographyKerning = maybeInMap(TYPOGRAPHY_KERNING_MAP)(
    global.typographyKerning,
  );
  const globalBorderRadius = maybeInMap(BORDER_RADIUS_MAP)(global.borderRadius);

  const controlBorderRadius = maybeInMap(SIMPLE_BORDER_RADIUS_MAP)(
    controls.borderRadius,
  );
  const textFieldBorderRadius = maybeInMap(BORDER_RADIUS_MAP)(
    textFields.borderRadius,
  );
  const selectBorderRadius = maybeInMap(BORDER_RADIUS_MAP)(select.borderRadius);
  const optionListBorderRadius = maybeInMap(BORDER_RADIUS_MAP)(
    optionList.borderRadius,
  );
  const checkboxBorderRadius = maybeInMap(BORDER_RADIUS_MAP)(
    checkbox.borderRadius,
  );
  const reviewBlockBorderRadius = maybeInMap(BORDER_RADIUS_MAP)(
    reviewBlock.borderRadius,
  );
  const [textFieldBorder, selectBorder, checkboxBorder] = [
    textFields.border,
    select.border,
    checkbox.border,
  ].map(maybeInMap(BORDER_MAP));
  const typographyPrimaryFonts = typographyPrimary.fonts ?? undefined;
  const typographyPrimaryWeightBase = typographyPrimary.weightBase ?? undefined;
  const typographyPrimaryWeightBold = typographyPrimary.weightBold ?? undefined;

  const typographySecondaryFonts = typographySecondary.fonts ?? undefined;
  const typographySecondaryWeightBase =
    typographySecondary.weightBase ?? undefined;
  const typographySecondaryWeightBold =
    typographySecondary.weightBold ?? undefined;

  const optionListBlockSpacing = maybeInMap(SPACING_VAR_MAP)(
    optionList.spacing,
  );
  const moneyLinesBlockSpacing = maybeInMap(SPACING_VAR_MAP)(
    moneyLines.spacing,
  );
  const moneyLinesDividerBlockSpacing = maybeInMap(SPACING_VAR_MAP)(
    moneyLines.dividerSpacing,
  );
  const buyerJourneyInlineSpacing = maybeInMap(SPACING_VAR_MAP)(
    buyerJourney.spacing,
  );
  const reviewBlockBlockSpacing = maybeInMap(SPACING_VAR_MAP)(
    reviewBlock.spacing,
  );
  const reviewBlockBorder = maybeInMap(BORDER_MAP)(reviewBlock.border);
  const reviewBlockBlockPadding = maybeInMap(SPACING_VAR_MAP)(
    reviewBlock.blockPadding,
  );
  const reviewBlockInlinePadding = maybeInMap(SPACING_VAR_MAP)(
    reviewBlock.inlinePadding,
  );

  const [
    style1TypographySize,
    style1TypographyCase,
    style1TypographyFonts,
    style1TypographyWeight,
    style1TypographyLineSize,
    style1TypographyKerning,
    style1TypographyDecoration,
    style2TypographySize,
    style2TypographyCase,
    style2TypographyFonts,
    style2TypographyWeight,
    style2TypographyLineSize,
    style2TypographyKerning,
    style2TypographyDecoration,
    style3TypographySize,
    style3TypographyCase,
    style3TypographyFonts,
    style3TypographyWeight,
    style3TypographyLineSize,
    style3TypographyKerning,
    style3TypographyDecoration,
    style4TypographySize,
    style4TypographyCase,
    style4TypographyFonts,
    style4TypographyWeight,
    style4TypographyLineSize,
    style4TypographyKerning,
    style4TypographyDecoration,
    style5TypographySize,
    style5TypographyCase,
    style5TypographyFonts,
    style5TypographyWeight,
    style5TypographyLineSize,
    style5TypographyKerning,
    style5TypographyDecoration,
    style6TypographySize,
    style6TypographyCase,
    style6TypographyFonts,
    style6TypographyWeight,
    style6TypographyLineSize,
    style6TypographyKerning,
    style6TypographyDecoration,
    style7TypographySize,
    style7TypographyCase,
    style7TypographyFonts,
    style7TypographyWeight,
    style7TypographyLineSize,
    style7TypographyKerning,
    style7TypographyDecoration,
    style8TypographySize,
    style8TypographyCase,
    style8TypographyFonts,
    style8TypographyWeight,
    style8TypographyLineSize,
    style8TypographyKerning,
    style8TypographyDecoration,
    style9TypographySize,
    style9TypographyCase,
    style9TypographyFonts,
    style9TypographyWeight,
    style9TypographyLineSize,
    style9TypographyKerning,
    style9TypographyDecoration,
  ] = [
    typographyStyle1,
    typographyStyle2,
    typographyStyle3,
    typographyStyle4,
    typographyStyle5,
    typographyStyle6,
    typographyStyle7,
    typographyStyle8,
    typographyStyle9,
  ]
    .map((style) => [
      maybeInMap(TYPOGRAPHY_SIZE_MAP)(style.size),
      maybeInMap(TYPOGRAPHY_CASE_MAP)(style.letterCase),
      maybeInMap(TYPOGRAPHY_FONTS_MAP)(style.fonts),
      style.weight
        ? typographyWeightMapping(
            style.fonts ? style.fonts : 'secondary',
            style.weight,
          )
        : undefined,
      maybeInMap(TYPOGRAPHY_LINE_SIZE_MAP)(style.lineSize),
      maybeInMap(TYPOGRAPHY_KERNING_MAP)(style.kerning),
      maybeInMap(TYPOGRAPHY_DECORATION_MAP)(style.decoration),
    ])
    .reduce((accumulator, array) => [...accumulator, ...array], []);

  const primaryButtonBlockPadding = maybeInMap(SPACING_VAR_MAP)(
    primaryButton.blockPadding,
  );
  const primaryButtonInlinePadding = maybeInMap(SPACING_VAR_MAP)(
    primaryButton.inlinePadding,
  );
  const primaryButtonBorderRadius = maybeInMap(BORDER_RADIUS_MAP)(
    primaryButton.borderRadius,
  );

  const secondaryButtonBlockPadding = maybeInMap(SPACING_VAR_MAP)(
    secondaryButton.blockPadding,
  );
  const secondaryButtonInlinePadding = maybeInMap(SPACING_VAR_MAP)(
    secondaryButton.inlinePadding,
  );
  const secondaryButtonBorderRadius = maybeInMap(BORDER_RADIUS_MAP)(
    secondaryButton.borderRadius,
  );

  const moneyLinesBlockPadding = maybeInMap(SPACING_VAR_MAP)(
    moneyLines.blockPadding,
  );
  const moneyLinesInlinePadding = maybeInMap(SPACING_VAR_MAP)(
    moneyLines.inlinePadding,
  );

  const moneySummaryBlockPadding = maybeInMap(SPACING_VAR_MAP)(
    moneySummary.blockPadding,
  );
  const moneySummaryInlinePadding = maybeInMap(SPACING_VAR_MAP)(
    moneySummary.inlinePadding,
  );

  const optionListBlockPadding = maybeInMap(SPACING_VAR_MAP)(
    optionList.blockPadding,
  );
  const optionListInlinePadding = maybeInMap(SPACING_VAR_MAP)(
    optionList.inlinePadding,
  );

  const tagBorderRadius = maybeInMap(BORDER_RADIUS_MAP)(tag.borderRadius);

  /** To avoid an oval-y shape caused by subpixel rendering, we need JS to floor the size of our radio buttons. */
  const radioSizeBase = typographyScale.base
    ? `${Math.floor(
        parseFloat(typographyScale.base.toString()) * RADIO_SCALE_BASE,
      )}px`
    : undefined;
  const radioSizeLarge = typographyScale.base
    ? `${Math.floor(
        parseFloat(typographyScale.base.toString()) * RADIO_LARGE_SCALE,
      )}px`
    : undefined;

  /** To avoid an rectangular shape caused by subpixel rendering, we need JS to floor the size of our checkboxes. */
  const checkboxSize = typographyScale.base
    ? `${Math.floor(
        parseFloat(typographyScale.base.toString()) * CHECKBOX_SCALE,
      )}px`
    : undefined;

  const bannerBorder = maybeInMap(BORDER_MAP)(banner.border);
  const bannerBorderRadius = maybeInMap(BORDER_RADIUS_MAP)(banner.borderRadius);

  /** To avoid an oval-y/rectangular shape caused by subpixel rendering, we need JS to floor the size of our icons. */
  const iconSizeSmall = typographyScale.base
    ? `${Math.floor(
        parseFloat(typographyScale.base.toString()) * ICON_SMALL_SCALE,
      )}px`
    : undefined;
  const iconSizeDefault = typographyScale.base
    ? `${typographyScale?.base?.toString()}px`
    : undefined;
  const iconSizeLarge = typographyScale.base
    ? `${Math.floor(
        parseFloat(typographyScale.base.toString()) * ICON_LARGE_SCALE,
      )}px`
    : undefined;

  const thumbnailAspectRatio = thumbnail.aspectRatio
    ? `${thumbnail.aspectRatio}`
    : undefined;

  const linkTransitionDuration = maybeInMap(DURATION_VAR_MAP)(
    link.transitionDuration,
  );

  const customProperties: Partial<CustomPropertyMap> = {
    ...customPropertiesFromRoleColors(colorsFromOverrides(colors), legacy),
    ...customPropertiesFromScaleMap<TypographyScale>(
      typographyScale,
      TYPOGRAPHY_SCALE_MAP,
    ),
    ...customPropertiesFromScaleMap<TypographyScale>(
      typographyScale,
      SPACING_MAP,
    ),
    ...customPropertiesFromScaleMap<DurationScale>(
      durationScale,
      DURATION_SCALE_MAP,
    ),
    typographyPrimaryFonts,
    typographyPrimaryWeightBase,
    typographyPrimaryWeightBold,
    typographySecondaryFonts,
    typographySecondaryWeightBase,
    typographySecondaryWeightBold,
    globalTypographyLetterCase,
    globalTypographyLineSizeDefault,
    globalTypographyLineSizeSmall,
    globalTypographyKerning,
    globalBorderRadius,
    controlBorderRadius,
    checkboxBorder,
    checkboxBorderRadius,
    textFieldBorder,
    textFieldBorderRadius,
    selectBorderRadius,
    selectBorder,
    optionListBorderRadius,
    optionListBlockSpacing,
    reviewBlockBorderRadius,
    reviewBlockBlockSpacing,
    reviewBlockBorder,
    reviewBlockBlockPadding,
    reviewBlockInlinePadding,
    moneyLinesBlockSpacing,
    moneyLinesDividerBlockSpacing,
    buyerJourneyInlineSpacing,
    style1TypographySize,
    style1TypographyCase,
    style1TypographyFonts,
    style1TypographyWeight,
    style1TypographyLineSize,
    style1TypographyKerning,
    style1TypographyDecoration,
    style2TypographySize,
    style2TypographyCase,
    style2TypographyFonts,
    style2TypographyWeight,
    style2TypographyLineSize,
    style2TypographyKerning,
    style2TypographyDecoration,
    style3TypographySize,
    style3TypographyCase,
    style3TypographyFonts,
    style3TypographyWeight,
    style3TypographyLineSize,
    style3TypographyKerning,
    style3TypographyDecoration,
    style4TypographySize,
    style4TypographyCase,
    style4TypographyFonts,
    style4TypographyWeight,
    style4TypographyLineSize,
    style4TypographyKerning,
    style4TypographyDecoration,
    style5TypographySize,
    style5TypographyCase,
    style5TypographyFonts,
    style5TypographyWeight,
    style5TypographyLineSize,
    style5TypographyKerning,
    style5TypographyDecoration,
    style6TypographySize,
    style6TypographyCase,
    style6TypographyFonts,
    style6TypographyWeight,
    style6TypographyLineSize,
    style6TypographyKerning,
    style6TypographyDecoration,
    style7TypographySize,
    style7TypographyCase,
    style7TypographyFonts,
    style7TypographyWeight,
    style7TypographyLineSize,
    style7TypographyKerning,
    style7TypographyDecoration,
    style8TypographySize,
    style8TypographyCase,
    style8TypographyFonts,
    style8TypographyWeight,
    style8TypographyLineSize,
    style8TypographyKerning,
    style8TypographyDecoration,
    style9TypographySize,
    style9TypographyCase,
    style9TypographyFonts,
    style9TypographyWeight,
    style9TypographyLineSize,
    style9TypographyKerning,
    style9TypographyDecoration,
    primaryButtonBlockPadding,
    primaryButtonInlinePadding,
    primaryButtonBorderRadius,
    secondaryButtonBlockPadding,
    secondaryButtonInlinePadding,
    secondaryButtonBorderRadius,
    moneyLinesBlockPadding,
    moneyLinesInlinePadding,
    moneySummaryBlockPadding,
    moneySummaryInlinePadding,
    optionListBlockPadding,
    optionListInlinePadding,
    tagBorderRadius,
    radioSizeBase,
    radioSizeLarge,
    thumbnailAspectRatio,
    linkTransitionDuration,
    checkboxSize,
    bannerBorder,
    bannerBorderRadius,
    iconSizeSmall,
    iconSizeDefault,
    iconSizeLarge,
  };

  for (const key of Object.keys(
    customProperties,
  ) as (keyof typeof customProperties)[]) {
    if (customProperties[key] == null) {
      delete customProperties[key];
    }
  }

  return customProperties;
}

function customPropertiesFromRoleColors(
  colors: Partial<RoleColors>,
  legacy?: boolean,
) {
  const customProperties: Partial<CustomPropertyMap> = {};

  for (const property of Object.keys(COLOR_MAP) as (keyof typeof COLOR_MAP)[]) {
    const color = COLOR_MAP[property]?.(colors, legacy);
    customProperties[property] = color && toRgb(color);
  }

  return customProperties;
}

function customPropertiesFromScaleMap<T>(
  scale: Partial<T>,
  map: {
    [CustomProperty in keyof CustomPropertyMap]?: (
      scale: Partial<T>,
    ) => string | undefined;
  },
) {
  const customProperties: Partial<CustomPropertyMap> = {};

  for (const property of Object.keys(map) as (keyof typeof map)[]) {
    const value = map[property]?.(scale);
    if (value != null) customProperties[property] = value;
  }

  return customProperties;
}

function typographyWeightMapping(
  fontStack: ThemeTypographyFonts,
  weight: ThemeTypographyWeight,
) {
  return fontStack === 'primary'
    ? TYPOGRAPHY_PRIMARY_WEIGHT_MAP[weight]
    : TYPOGRAPHY_SECONDARY_WEIGHT_MAP[weight];
}

function maybeInMap<T>(map: T) {
  return (value?: keyof T) => (value ? map[value] : undefined);
}
