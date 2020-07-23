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
  CustomPropertyMap,
  RoleColors,
  RoleColorOverrides,
  ThemeConstructor,
  TypographyScale,
  TypographyScaleOverrides,
  ThemeTypographyFonts,
  ThemeTypographyWeight,
  ColorPair,
} from './types';
import {modularScale} from './utilities/modularScale';

interface EventMap {
  change: (configuration: ThemeConfiguration) => void;
  preview: (customProperties: Partial<CustomPropertyMap>) => void;
}

export const ThemeContext = createContext<UiTheme | undefined>(undefined);

export function createTheme({
  global = {},
  buyerJourney = {},
  typographyPrimary = {},
  typographySecondary = {},
  headingLevel1 = {},
  headingLevel2 = {},
  headingLevel3 = {},
  controls = {},
  label = {},
  textFields = {},
  select = {},
  checkbox = {},
  radio = {},
  optionList = {},
  reviewBlock = {},
  actions = {},
  lineItems = {},
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
}: Partial<ThemeConstructor> = {}): UiTheme {
  return new UiTheme({
    global,
    buyerJourney,
    typographyPrimary,
    typographySecondary,
    headingLevel1,
    headingLevel2,
    headingLevel3,
    controls,
    label,
    textFields,
    select,
    checkbox,
    radio,
    optionList,
    reviewBlock,
    actions,
    lineItems,
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
  });
}

export class UiTheme {
  configuration: ThemeConfiguration;
  customProperties: Partial<CustomPropertyMap>;

  private readonly listeners: {[K in keyof EventMap]: Set<EventMap[K]>} = {
    change: new Set(),
    preview: new Set(),
  };

  constructor(configuration: ThemeConstructor) {
    this.configuration = {
      ...configuration,
      colors: colorsFromOverrides(configuration.colors ?? {}),
      typographyScale: configuration.typographyScale ?? {},
    };
    this.customProperties = customPropertiesFromThemeConfiguration(
      this.configuration,
    );
  }

  preview(
    colors: Partial<RoleColorOverrides>,
    typographyScale: Partial<TypographyScaleOverrides>,
  ) {
    const colorsCustomProperties = customPropertiesFromRoleColors(
      colorsFromOverrides(colors),
    );

    const typographyScaleCustomProperties = customPropertiesFromTypographyScale(
      typographyScale,
    );

    for (const listener of this.listeners.preview) {
      listener({
        ...colorsCustomProperties,
        ...typographyScaleCustomProperties,
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

export function colorTextEmphasized(colorPair?: ColorPair) {
  return colorPair?.foreground
    ? colorPair?.foreground?.adjust({
        l: (l) => (l > 50 ? Math.min(l + 15, 100) : l - 10),
      })
    : colorPair?.background?.adjust({
        s: (s) => (s > 50 ? s : Math.min(s + 15, 100)),
        l: (l) => (l > 50 ? Math.max(l - 77.5, 0) : 98.3),
      });
}

export function colorTextSubdued(colorPair?: ColorPair) {
  return colorPair?.foreground
    ? colorPair?.foreground?.adjust({
        l: (l) => (l > 50 ? Math.max(l - 35, 0) : l - 15),
      })
    : colorPair?.background?.adjust({
        s: (s) => (s > 50 ? Math.max(s - 55, 0) : s),
        l: (l) => (l > 50 ? Math.max(l - 49.9, 10) : Math.min(l + 63.2, 90)),
      });
}

function colorHovered(colorPair?: ColorPair) {
  return colorPair?.background?.adjust({
    l: (l) => l - 10,
  });
}

function colorPressed(colorPair?: ColorPair) {
  return colorPair?.background?.adjust({
    l: (l) => l - 10,
  });
}

function colorText(colorPair?: ColorPair) {
  return (
    colorPair?.foreground ??
    colorPair?.background?.adjust({
      l: (l) => (l > 50 ? 4 : 96),
    })
  );
}

function colorTextHovered(colorPair?: ColorPair) {
  return colorPair?.background?.adjust({
    l: (l) => l - 10,
  });
}

function colorTextPressed(colorPair?: ColorPair) {
  return colorPair?.background?.adjust({
    l: (l) => l - 10,
  });
}

function colorsFromOverrides(overrideColors: Partial<RoleColorOverrides>) {
  return (Object.keys(overrideColors) as (keyof RoleColorOverrides)[]).reduce<
    Partial<RoleColors>
  >((colors, key) => {
    const colorOrPair = overrideColors[key];

    if (colorOrPair == null) return colors;

    const {background, foreground} = colorOrPair;

    return {
      ...colors,
      [key]: {
        background: background ? normalizeColor(background) : undefined,
        foreground: foreground ? normalizeColor(foreground) : undefined,
      },
    };
  }, {});
}

export function colorBorderEmphasized(colorPair?: ColorPair) {
  return colorPair?.background?.adjust({
    s: (s) => (s > 50 ? s : Math.min(s + 15, 100)),
    l: (l) => (l > 50 ? Math.max(l - 77.5, 0) : 98.3),
  });
}

function normalizeColor(color: HslColorString | HslColorTuple | Hsl) {
  if (color instanceof Hsl) return color;
  if (typeof color === 'string') return parseHsl(color);
  return new Hsl(...color);
}

const COLOR_MAP: {
  [CustomProperty in keyof CustomPropertyMap]?: (
    roleColors: Partial<RoleColors>,
  ) => Hsl | undefined;
} = {
  /* COLOR CANVAS */
  colorCanvas: ({canvas}) => canvas?.background,

  colorCanvasText: ({canvas}) =>
    canvas?.foreground ??
    canvas?.background?.adjust({
      s: (s) => (s > 50 ? Math.max(s - 55, 0) : s),
      l: (l) => (l > 50 ? Math.max(l - 62.6, 0) : Math.min(l + 82, 98.3)),
    }),

  colorCanvasTextSubdued: ({canvas}) => colorTextSubdued(canvas),
  colorCanvasTextEmphasized: ({canvas}) => colorTextEmphasized(canvas),

  colorCanvasBorder: ({canvas}) =>
    canvas?.background?.adjust({
      s: (s) => (s > 50 ? Math.max(s - 15, 0) : s),
      l: (l) => (l > 50 ? Math.max(l - 8.8, 0) : Math.min(l + 11.3, 90)),
    }),

  colorCanvasBorderEmphasized: ({canvas}) => colorBorderEmphasized(canvas),

  /* COLOR SURFACE 1 */
  colorSurfacePrimary: ({surfacePrimary}) => surfacePrimary?.background,

  colorSurfacePrimaryDisabled: ({surfacePrimary}) =>
    surfacePrimary?.background?.adjust({
      l: (l) => (l > 50 ? Math.min(l - 2.5, 97.5) : Math.max(l + 2.5, 2.5)),
    }),

  colorSurfacePrimaryText: ({surfacePrimary}) =>
    surfacePrimary?.foreground ??
    surfacePrimary?.background?.adjust({
      s: (s) => (s > 50 ? Math.max(s - 55, 0) : s),
      l: (l) => (l > 50 ? Math.max(l - 62.6, 0) : Math.min(l + 82, 98.3)),
    }),

  colorSurfacePrimaryTextSubdued: ({surfacePrimary}) =>
    colorTextSubdued(surfacePrimary),

  colorSurfacePrimaryTextEmphasized: ({surfacePrimary}) =>
    colorTextEmphasized(surfacePrimary),

  colorSurfacePrimaryBorder: ({surfacePrimary}) =>
    surfacePrimary?.background?.adjust({
      s: (s) => (s > 50 ? Math.max(s - 15, 0) : s),
      l: (l) => (l > 50 ? Math.max(l - 8.8, 0) : Math.min(l + 11.3, 90)),
    }),

  colorSurfacePrimaryBorderEmphasized: ({surfacePrimary}) =>
    colorBorderEmphasized(surfacePrimary),

  /* COLOR SURFACE 2 */
  colorSurfaceSecondary: ({surfaceSecondary}) => surfaceSecondary?.background,

  colorSurfaceSecondaryDisabled: ({surfaceSecondary}) =>
    surfaceSecondary?.background?.adjust({
      l: (l) => (l > 50 ? Math.min(l - 2.5, 97.5) : Math.max(l + 2.5, 2.5)),
    }),

  colorSurfaceSecondaryText: ({surfaceSecondary}) =>
    surfaceSecondary?.foreground ??
    surfaceSecondary?.background?.adjust({
      s: (s) => (s > 50 ? Math.max(s - 55, 0) : s),
      l: (l) => (l > 50 ? Math.max(l - 62.6, 0) : Math.min(l + 82, 98.3)),
    }),

  colorSurfaceSecondaryTextSubdued: ({surfaceSecondary}) =>
    colorTextSubdued(surfaceSecondary),

  colorSurfaceSecondaryTextEmphasized: ({surfaceSecondary}) =>
    colorTextEmphasized(surfaceSecondary),

  colorSurfaceSecondaryBorder: ({surfaceSecondary}) =>
    surfaceSecondary?.background?.adjust({
      s: (s) => (s > 50 ? Math.max(s - 15, 0) : s),
      l: (l) => (l > 50 ? Math.max(l - 8.8, 0) : Math.min(l + 11.3, 90)),
    }),

  colorSurfaceSecondaryBorderEmphasized: ({surfaceSecondary}) =>
    colorBorderEmphasized(surfaceSecondary),

  /* COLOR SURFACE 3 */
  colorSurfaceTertiary: ({surfaceTertiary}) => surfaceTertiary?.background,

  colorSurfaceTertiaryDisabled: ({surfaceTertiary}) =>
    surfaceTertiary?.background?.adjust({
      l: (l) => (l > 50 ? Math.min(l - 2.5, 97.5) : Math.max(l + 2.5, 2.5)),
    }),

  colorSurfaceTertiarySubdued: ({surfaceTertiary}) =>
    surfaceTertiary?.background?.adjust({
      l: (l) => (l > 50 ? l - 1.7 : Math.max(l - 5.2, 0)),
    }),

  colorSurfaceTertiaryText: ({surfaceTertiary}) =>
    surfaceTertiary?.foreground ??
    surfaceTertiary?.background?.adjust({
      s: (s) => (s > 50 ? Math.max(s - 55, 0) : s),
      l: (l) => (l > 50 ? Math.max(l - 62.6, 0) : Math.min(l + 82, 98.3)),
    }),

  colorSurfaceTertiaryTextSubdued: ({surfaceTertiary}) =>
    colorTextSubdued(surfaceTertiary),

  colorSurfaceTertiaryTextEmphasized: ({surfaceTertiary}) =>
    colorTextEmphasized(surfaceTertiary),

  colorSurfaceTertiaryBorder: ({surfaceTertiary}) =>
    surfaceTertiary?.background?.adjust({
      s: (s) => (s > 50 ? Math.max(s - 15, 0) : s),
      l: (l) => (l > 50 ? Math.max(l - 8.8, 0) : Math.min(l + 11.3, 90)),
    }),

  colorSurfaceTertiaryBorderEmphasized: ({surfaceTertiary}) =>
    colorBorderEmphasized(surfaceTertiary),

  /* COLOR PRIMARY */
  colorPrimary: ({primary}) => primary?.background,
  colorPrimaryHovered: ({primary}) => colorHovered(primary),
  colorPrimaryPressed: ({primary}) => colorPressed(primary),
  colorPrimaryText: ({primary}) => colorText(primary),
  colorPrimaryTextHovered: ({primary}) => colorTextHovered(primary),
  colorPrimaryTextPressed: ({primary}) => colorTextPressed(primary),

  /* COLOR SECONDARY */
  colorSecondary: ({secondary}) => secondary?.background,
  colorSecondaryHovered: ({secondary}) => colorHovered(secondary),
  colorSecondaryPressed: ({secondary}) => colorPressed(secondary),
  colorSecondaryText: ({secondary}) => colorText(secondary),
  colorSecondaryTextHovered: ({secondary}) => colorTextHovered(secondary),
  colorSecondaryTextPressed: ({secondary}) => colorTextPressed(secondary),

  /* COLOR INTERACTIVE */
  colorInteractive: ({interactive}) => interactive?.background,

  colorInteractiveHovered: ({interactive}) => interactive?.background,

  colorInteractivePressed: ({interactive}) => interactive?.background,

  colorInteractiveText: ({interactive}) => interactive?.foreground,

  colorInteractiveTextHovered: ({interactive}) =>
    interactive?.foreground?.adjust({
      l: (l) => l + 10,
    }),

  colorInteractiveTextPressed: ({interactive}) =>
    interactive?.foreground?.adjust({
      l: (l) => l + 10,
    }),
};

const TYPOGRAPHY_SCALE_MAP: {
  [CustomProperty in keyof CustomPropertyMap]?: (
    scale: Partial<TypographyScale>,
  ) => string | undefined;
} = {
  typographySizeXSmall: ({base, ratio}) =>
    base ? modularScale(-1, base, ratio) : undefined,
  typographySizeSmall: ({base, ratio}) =>
    base ? modularScale(-0.5, base, ratio) : undefined,
  typographySizeDefault: ({base, ratio}) =>
    base ? modularScale(0, base, ratio) : undefined,
  typographySizeMedium: ({base, ratio}) =>
    base ? modularScale(0.5, base, ratio) : undefined,
  typographySizeLarge: ({base, ratio}) =>
    base ? modularScale(1, base, ratio) : undefined,
  typographySizeXLarge: ({base, ratio}) =>
    base ? modularScale(2, base, ratio) : undefined,
  typographySizeXXLarge: ({base, ratio}) =>
    base ? modularScale(3, base, ratio) : undefined,
};

const TYPOGRAPHY_SIZE_MAP = {
  xsmall: 'var(--x-typography-size-xsmall)',
  small: 'var(--x-typography-size-small)',
  base: 'var(--x-typography-size-default)',
  medium: 'var(--x-typography-size-medium)',
  large: 'var(--x-typography-size-large)',
  xlarge: 'var(--x-typography-size-xlarge)',
  xxlarge: 'var(--x-typography-size-xxlarge)',
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

const TYPOGRAPHY_LINE_SIZE_MAP = {
  base: '1.3',
  large: '1.5',
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
  spacingTight4X: ({base}) =>
    base ? modularScale(-5, base, SPACING_RATIO) : undefined,
  spacingTight3X: ({base}) =>
    base ? modularScale(-4, base, SPACING_RATIO) : undefined,
  spacingTight2X: ({base}) =>
    base ? modularScale(-3, base, SPACING_RATIO) : undefined,
  spacingTight1X: ({base}) =>
    base ? modularScale(-2, base, SPACING_RATIO) : undefined,
  spacingTight: ({base}) =>
    base ? modularScale(-1, base, SPACING_RATIO) : undefined,
  spacingBase: ({base}) =>
    base ? modularScale(0, base, SPACING_RATIO) : undefined,
  spacingLoose: ({base}) =>
    base ? modularScale(1, base, SPACING_RATIO) : undefined,
  spacingLoose1X: ({base}) =>
    base ? modularScale(2, base, SPACING_RATIO) : undefined,
  spacingLoose2X: ({base}) =>
    base ? modularScale(3, base, SPACING_RATIO) : undefined,
  spacingLoose3X: ({base}) =>
    base ? modularScale(4, base, SPACING_RATIO) : undefined,
  spacingLoose4X: ({base}) =>
    base ? modularScale(5, base, SPACING_RATIO) : undefined,
};

const SIMPLE_BORDER_RADIUS_MAP = {
  none: 'var(--x-border-radius-none)',
  base: 'var(--x-border-radius-base)',
};

const BORDER_RADIUS_MAP = {
  ...SIMPLE_BORDER_RADIUS_MAP,
  fullyRounded: 'var(--x-border-radius-fully-rounded)',
};

const BORDER_MAP = {
  full: 'var(--x-border-full)',
  blockEnd: 'var(--x-border-block-end)',
  none: 'var(--x-border-none)',
};

const OPTION_LIST_GAP_MAP = {
  base: 'var(--x-spacing-base)',
  tight: 'var(--x-spacing-tight4x)',
  none: '0',
};

const REVIEW_BLOCK_GAP_MAP = {
  base: 'var(--x-spacing-base)',
  tight: 'var(--x-spacing-tight4x)',
  none: '0',
};

const BUYER_JOURNEY_GAP_MAP = {
  base: 'var(--x-spacing-tight1x)',
  loose: 'var(--x-spacing-loose2x)',
};

function customPropertiesFromThemeConfiguration({
  global,
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
  reviewBlock,
  typographyStyle1,
  typographyStyle2,
  typographyStyle3,
  typographyStyle4,
  typographyStyle5,
  typographyStyle6,
  typographyStyle7,
  typographyStyle8,
  typographyStyle9,
}: ThemeConfiguration): Partial<CustomPropertyMap> {
  const globalTypographyLetterCase = maybeInMap(TYPOGRAPHY_CASE_MAP)(
    global.typographyLetterCase,
  );
  const globalTypographyLineSize = maybeInMap(TYPOGRAPHY_LINE_SIZE_MAP)(
    global.typographyLineSize,
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
  const [textFieldBorder, selectBorder, checkboxBorder, optionListBorder] = [
    textFields.border,
    select.border,
    checkbox.border,
    optionList.border,
  ].map(maybeInMap(BORDER_MAP));
  const typographyPrimaryFonts = typographyPrimary.fonts ?? undefined;
  const typographyPrimaryWeightBase = typographyPrimary.weightBase ?? undefined;
  const typographyPrimaryWeightBold = typographyPrimary.weightBold ?? undefined;
  const typographySecondaryFonts = typographySecondary.fonts ?? undefined;
  const typographySecondaryWeightBase =
    typographySecondary.weightBase ?? undefined;
  const typographySecondaryWeightBold =
    typographySecondary.weightBold ?? undefined;
  const optionListBlockGap = maybeInMap(OPTION_LIST_GAP_MAP)(optionList.gap);
  const buyerJourneyInlineGap = maybeInMap(BUYER_JOURNEY_GAP_MAP)(
    buyerJourney.gap,
  );
  const reviewBlockBlockGap = maybeInMap(REVIEW_BLOCK_GAP_MAP)(reviewBlock.gap);
  const reviewBlockBorder = maybeInMap(BORDER_MAP)(reviewBlock.border);
  const [
    style1TypographySize,
    style1TypographyCase,
    style1TypographyFonts,
    style1TypographyWeight,
    style1TypographyLineSize,
    style1TypographyKerning,
    style2TypographySize,
    style2TypographyCase,
    style2TypographyFonts,
    style2TypographyWeight,
    style2TypographyLineSize,
    style2TypographyKerning,
    style3TypographySize,
    style3TypographyCase,
    style3TypographyFonts,
    style3TypographyWeight,
    style3TypographyLineSize,
    style3TypographyKerning,
    style4TypographySize,
    style4TypographyCase,
    style4TypographyFonts,
    style4TypographyWeight,
    style4TypographyLineSize,
    style4TypographyKerning,
    style5TypographySize,
    style5TypographyCase,
    style5TypographyFonts,
    style5TypographyWeight,
    style5TypographyLineSize,
    style5TypographyKerning,
    style6TypographySize,
    style6TypographyCase,
    style6TypographyFonts,
    style6TypographyWeight,
    style6TypographyLineSize,
    style6TypographyKerning,
    style7TypographySize,
    style7TypographyCase,
    style7TypographyFonts,
    style7TypographyWeight,
    style7TypographyLineSize,
    style7TypographyKerning,
    style8TypographySize,
    style8TypographyCase,
    style8TypographyFonts,
    style8TypographyWeight,
    style8TypographyLineSize,
    style8TypographyKerning,
    style9TypographySize,
    style9TypographyCase,
    style9TypographyFonts,
    style9TypographyWeight,
    style9TypographyLineSize,
    style9TypographyKerning,
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
    ])
    .reduce((accumulator, array) => [...accumulator, ...array], []);

  const customProperties: Partial<CustomPropertyMap> = {
    ...customPropertiesFromRoleColors(colorsFromOverrides(colors)),
    ...customPropertiesFromTypographyScale(typographyScale),
    ...customPropertiesFromSpacing(typographyScale),
    typographyPrimaryFonts,
    typographyPrimaryWeightBase,
    typographyPrimaryWeightBold,
    typographySecondaryFonts,
    typographySecondaryWeightBase,
    typographySecondaryWeightBold,
    globalTypographyLetterCase,
    globalTypographyLineSize,
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
    optionListBlockGap,
    optionListBorder,
    reviewBlockBorderRadius,
    reviewBlockBlockGap,
    reviewBlockBorder,
    buyerJourneyInlineGap,
    style1TypographySize,
    style1TypographyCase,
    style1TypographyFonts,
    style1TypographyWeight,
    style1TypographyLineSize,
    style1TypographyKerning,
    style2TypographySize,
    style2TypographyCase,
    style2TypographyFonts,
    style2TypographyWeight,
    style2TypographyLineSize,
    style2TypographyKerning,
    style3TypographySize,
    style3TypographyCase,
    style3TypographyFonts,
    style3TypographyWeight,
    style3TypographyLineSize,
    style3TypographyKerning,
    style4TypographySize,
    style4TypographyCase,
    style4TypographyFonts,
    style4TypographyWeight,
    style4TypographyLineSize,
    style4TypographyKerning,
    style5TypographySize,
    style5TypographyCase,
    style5TypographyFonts,
    style5TypographyWeight,
    style5TypographyLineSize,
    style5TypographyKerning,
    style6TypographySize,
    style6TypographyCase,
    style6TypographyFonts,
    style6TypographyWeight,
    style6TypographyLineSize,
    style6TypographyKerning,
    style7TypographySize,
    style7TypographyCase,
    style7TypographyFonts,
    style7TypographyWeight,
    style7TypographyLineSize,
    style7TypographyKerning,
    style8TypographySize,
    style8TypographyCase,
    style8TypographyFonts,
    style8TypographyWeight,
    style8TypographyLineSize,
    style8TypographyKerning,
    style9TypographySize,
    style9TypographyCase,
    style9TypographyFonts,
    style9TypographyWeight,
    style9TypographyLineSize,
    style9TypographyKerning,
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

function customPropertiesFromRoleColors(colors: Partial<RoleColors>) {
  const customProperties: Partial<CustomPropertyMap> = {};

  for (const property of Object.keys(COLOR_MAP) as (keyof typeof COLOR_MAP)[]) {
    const color = COLOR_MAP[property]?.(colors);
    if (color != null) customProperties[property] = toRgb(color);
  }

  return customProperties;
}

function customPropertiesFromTypographyScale(scale: Partial<TypographyScale>) {
  const customProperties: Partial<CustomPropertyMap> = {};

  for (const property of Object.keys(
    TYPOGRAPHY_SCALE_MAP,
  ) as (keyof typeof TYPOGRAPHY_SCALE_MAP)[]) {
    const fontSize = TYPOGRAPHY_SCALE_MAP[property]?.(scale);
    if (fontSize != null) customProperties[property] = fontSize;
  }

  return customProperties;
}

function customPropertiesFromSpacing(scale: Partial<TypographyScale>) {
  const customProperties: Partial<CustomPropertyMap> = {};

  for (const property of Object.keys(
    SPACING_MAP,
  ) as (keyof typeof SPACING_MAP)[]) {
    const spacing = SPACING_MAP[property]?.(scale);
    if (spacing != null) customProperties[property] = spacing;
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
