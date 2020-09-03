import {
  Hsl,
  RgbColorString,
  HslColorString,
  HslColorTuple,
} from '../../utilities/hsluv';

export interface ThemeConfiguration {
  readonly global: ThemeGlobal;
  readonly buyerJourney: ThemeBuyerJourney;
  readonly colors: Partial<RoleColors>;
  readonly typographyScale: Partial<TypographyScale>;
  readonly typographyPrimary: TypographyStack;
  readonly typographySecondary: TypographyStack;
  readonly headingLevel1: ThemeHeading;
  readonly headingLevel2: ThemeHeading;
  readonly headingLevel3: ThemeHeading;
  readonly controls: ThemeControls;
  readonly label: ThemeLabel;
  readonly textFields: ThemeTextFields;
  readonly select: ThemeSelect;
  readonly checkbox: ThemeCheckbox;
  readonly radio: ThemeRadio;
  readonly optionList: ThemeOptionList;
  readonly reviewBlock: ThemeReviewBlock;
  readonly actions: ThemeActions;
  readonly lineItems: ThemeLineItems;
  readonly moneyLines: ThemeMoneyLines;
  readonly moneySummary: ThemeMoneySummary;
  readonly primaryButton: ThemeButton;
  readonly secondaryButton: ThemeButton;
  readonly formLayout: ThemeFormLayout;
  readonly tag: ThemeTag;
  readonly tooltip: ThemeTooltip;
  readonly banner: ThemeBanner;
  readonly typographyStyle1: ThemeTypographyStyleCustomizations;
  readonly typographyStyle2: ThemeTypographyStyleCustomizations;
  readonly typographyStyle3: ThemeTypographyStyleCustomizations;
  readonly typographyStyle4: ThemeTypographyStyleCustomizations;
  readonly typographyStyle5: ThemeTypographyStyleCustomizations;
  readonly typographyStyle6: ThemeTypographyStyleCustomizations;
  readonly typographyStyle7: ThemeTypographyStyleCustomizations;
  readonly typographyStyle8: ThemeTypographyStyleCustomizations;
  readonly typographyStyle9: ThemeTypographyStyleCustomizations;
}

export type ThemeTypographyLineSize = 'base' | 'large';
export type ThemeTypographyKerning = 'base' | 'loose' | 'xloose';
export type ThemeSimpleBorderRadius = 'none' | 'base';
export type ThemeBorderRadius =
  | ThemeSimpleBorderRadius
  | 'fullyRounded'
  | 'tight';
export type ThemeBorderColor = 'base' | 'emphasized';
export type ThemeSimpleBorder = 'none' | 'full';
export type ThemeBorder = ThemeSimpleBorder | 'blockEnd';
export type ThemeResourceListBorder =
  | ThemeBorder
  | 'betweenItems'
  | 'aroundItems';
export type ThemeBorderStyle = 'base' | 'dotted';

export type ThemeSpacing =
  | 'none'
  | 'tight4x'
  | 'tight3x'
  | 'tight2x'
  | 'tight1x'
  | 'tight'
  | 'base'
  | 'loose'
  | 'loose1x'
  | 'loose2x'
  | 'loose3x'
  | 'loose4x';
export type ThemeSimpleSpacing = 'tight' | 'base';
export type ThemeResourceItemSpacing = 'none' | 'tight' | 'base' | 'loose';
export type ThemeErrorIndentation = 'none' | 'toText';

export interface ThemeLabel {
  typographyStyle?: ThemeTypographyStyle;
}
export interface ThemeTypographyStyleCustomizations {
  size?: ThemeTypographySize;
  letterCase?: ThemeTypographyLetterCase;
  fonts?: ThemeTypographyFonts;
  weight?: ThemeTypographyWeight;
  lineSize?: ThemeTypographyLineSize;
  kerning?: ThemeTypographyKerning;
}

export interface ThemeGlobal {
  borderRadius?: ThemeSimpleBorderRadius;
  typographyLetterCase?: ThemeTypographyLetterCase;
  typographyLineSize?: ThemeTypographyLineSize;
  typographyKerning?: ThemeTypographyKerning;
}

export type ThemeBuyerJourneyGap = 'base' | 'loose';
export type ThemeBuyerJourneyNumberStyle =
  | 'none'
  | 'decimal'
  | 'decimalLeadingZero';
export type ThemeBuyerJourneyAlignment = 'start' | 'center' | 'end';
export type ThemeBuyerJourneyPostion = 'start' | 'inline';
export interface ThemeBuyerJourney {
  alignment?: ThemeBuyerJourneyAlignment;
  position?: ThemeBuyerJourneyPostion;
  gap?: ThemeBuyerJourneyGap;
  chevronIconSeparator?: boolean;
  numberStyle?: ThemeBuyerJourneyNumberStyle;
  typographyStyle?: ThemeTypographyStyle;
}

export type ThemeLabelPosition = 'inside' | 'outside';
export type ThemeGap = 'base' | 'tight' | 'none';

export type ThemeMoneyLineInlineAlignment =
  | 'toEdge'
  | 'toAxis'
  | 'start'
  | 'end';

export type ThemeBackground =
  | 'surfacePrimary'
  | 'surfaceSecondary'
  | 'surfaceTertiary'
  | 'transparent';

export interface ThemeControls {
  borderColor?: ThemeBorderColor;
  borderRadius?: ThemeSimpleBorderRadius;
}

export interface ThemeTextFields {
  background?: ThemeBackground;
  border?: ThemeBorder;
  borderRadius?: ThemeBorderRadius;
  borderColor?: ThemeBorderColor;
  focusBorder?: ThemeBorder;
  labelPosition?: ThemeLabelPosition;
  typographyStyle?: ThemeTypographyStyle;
  errorIndentation?: ThemeErrorIndentation;
  errorTypographyStyle?: ThemeTypographyStyle;
}

export type ThemeOptionListBorder = ThemeSimpleBorder | 'inner';

export interface ThemeOptionList {
  background?: ThemeBackground;
  borderRadius?: ThemeBorderRadius;
  border?: ThemeOptionListBorder;
  borderStyle?: ThemeBorderStyle;
  gap?: ThemeGap;
  blockPadding?: ThemeSpacing;
  inlinePadding?: ThemeSpacing;
  detailsBackground?: ThemeBackground;
  typographyStyle?: ThemeTypographyStyle;
}

export interface ThemeReviewBlock {
  background?: ThemeBackground;
  borderRadius?: ThemeBorderRadius;
  border?: ThemeSimpleBorder;
  gap?: ThemeGap;
}

export type ThemeSelectDisclosureIcon = 'caretDown' | 'chevronDown';

export interface ThemeSelect {
  background?: ThemeBackground;
  border?: ThemeBorder;
  borderColor?: ThemeBorderColor;
  borderRadius?: ThemeBorderRadius;
  focusBorder?: ThemeBorder;
  labelPosition?: ThemeLabelPosition;
  disclosureIcon?: ThemeSelectDisclosureIcon;
  disclosureIconSeparator?: boolean;
  typographyStyle?: ThemeTypographyStyle;
  errorIndentation?: ThemeErrorIndentation;
  errorTypographyStyle?: ThemeTypographyStyle;
}

export interface ThemeCheckbox {
  background?: ThemeBackground;
  border?: ThemeBorder;
  borderColor?: ThemeBorderColor;
  borderRadius?: ThemeSimpleBorderRadius;
  errorIndentation?: ThemeErrorIndentation;
  errorTypographyStyle?: ThemeTypographyStyle;
}

export interface ThemeRadio {
  background?: ThemeBackground;
  borderColor?: ThemeBorderColor;
}

export type ThemeThumbnailBadgePosition = 'none' | 'base';
export type ThemeThumbnailBadgeBackground = 'subdued' | 'primary';

export type ThemeLineItemQuantityPosition =
  | 'none'
  | 'thumbnailBadge'
  | 'inline';

export interface ThemeLineItems {
  gap?: ThemeGap;
  border?: ThemeResourceListBorder;
  borderStyle?: ThemeBorderStyle;
  borderColor?: ThemeBorderColor;
  background?: ThemeBackground;
  blockPadding?: ThemeResourceItemSpacing;
  inlinePadding?: ThemeResourceItemSpacing;
  quantityPosition?: ThemeLineItemQuantityPosition;
  thumbnailBadgeBackground?: ThemeThumbnailBadgeBackground;
  thumbnailBorder?: ThemeSimpleBorder;
  titleTypographyStyle?: ThemeTypographyStyle;
  subtitleTypographyStyle?: ThemeTypographyStyle;
  propertiesTypographyStyle?: ThemeTypographyStyle;
}

export interface ThemeMoneyLines {
  gap?: ThemeGap;
  background?: ThemeBackground;
  blockPadding?: ThemeSpacing;
  inlinePadding?: ThemeSpacing;
  inlineAlignment?: ThemeMoneyLineInlineAlignment;
  labelTypographyStyle?: ThemeTypographyStyle;
  valueTypographyStyle?: ThemeTypographyStyle;
}

export interface ThemeMoneySummary {
  background?: ThemeBackground;
  blockPadding?: ThemeSpacing;
  inlinePadding?: ThemeSpacing;
  separator?: boolean;
  currencyCode?: boolean;
  labelTypographyStyle?: ThemeTypographyStyle;
  currencyTypographyStyle?: ThemeTypographyStyle;
  valueTypographyStyle?: ThemeTypographyStyle;
}

export type ThemeActionsDisplay = 'inline' | 'block';

export interface ThemeActions {
  display?: ThemeActionsDisplay;
}

export type ThemeLoadingStyle = 'spinner' | 'progressBar';

export interface ThemeButton {
  blockPadding?: ThemeSpacing;
  inlinePadding?: ThemeSpacing;
  typographyStyle?: ThemeTypographyStyle;
  loadingStyle?: ThemeLoadingStyle;
}

export interface ThemeFormLayout {
  spacing?: ThemeSimpleSpacing;
}

export interface ThemeTag {
  borderRadius?: ThemeBorderRadius;
}

export type ThemeOpacity = 'translucent' | 'opaque';
export type ThemeSurfaceBackground =
  | 'surfacePrimary'
  | 'surfaceSecondary'
  | 'surfaceTertiary';

export type ThemeTextAlignment = 'start' | 'center';

export interface ThemeTooltip {
  background?: ThemeSurfaceBackground;
  borderRadius?: ThemeBorderRadius;
  opacity?: ThemeOpacity;
  textAlignment?: ThemeTextAlignment;
}

export interface ThemeBanner {
  border?: ThemeSimpleBorder;
  borderRadius?: ThemeBorderRadius;
}

export interface ColorPair {
  background?: Hsl;
  foreground?: Hsl;
}

export interface RoleColors {
  canvas: ColorPair;
  surfacePrimary: ColorPair;
  surfaceSecondary: ColorPair;
  surfaceTertiary: ColorPair;
  surfaceQuaternary: ColorPair;

  /* For primary elements (<Button>) */
  primary: ColorPair;
  /* For secondary elements (<Button>) */
  secondary: ColorPair;
  /* For tertiary elements (<Tag>) */
  tertiary: ColorPair;
  /* For interative elements (<Link>, accent for <TextField>, <Radio> etc.) */
  interactive: ColorPair;
  /* For successful action taken by a user, a positive message (<Banner type="success">) */
  success: ColorPair;
  /* For destructive interactive elements, errors, and critical events that require immediate user action (<Banner type="critical">) */
  critical: ColorPair;
}

export interface TypographyScale {
  base?: string | number;
  ratio?: string | number;
}

export type CSSFontWeight =
  | string
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

export interface TypographyStack {
  fonts?: string;
  weightBase?: CSSFontWeight;
  weightBold?: CSSFontWeight;
}

export interface Typography {
  size?: TypographyScale;
  primary?: TypographyStack;
  secondary?: TypographyStack;
}

export type ThemeTypographySize =
  | 'xsmall'
  | 'small'
  | 'base'
  | 'medium'
  | 'large'
  | 'xlarge'
  | 'xxlarge';

export type ThemeTypographyLetterCase = 'none' | 'title' | 'upper' | 'lower';
export type ThemeTypographyFonts = 'primary' | 'secondary';
export type ThemeTypographyWeight = 'base' | 'bold';
export type ThemeTypographyStyle =
  | 'style1'
  | 'style2'
  | 'style3'
  | 'style4'
  | 'style5'
  | 'style6'
  | 'style7'
  | 'style8'
  | 'style9';

export interface ThemeHeading {
  typographyStyle?: ThemeTypographyStyle;
}

export type RoleColorOverrides = {
  [Color in keyof RoleColors]: {
    foreground?: Hsl | HslColorString | HslColorTuple;
    background?: Hsl | HslColorString | HslColorTuple;
  };
};

export interface TypographyScaleOverrides {
  base?: number | string;
  ratio?: number | string;
}

export type ThemeConstructor = Omit<
  ThemeConfiguration,
  'colors' | 'typographyScale'
> & {
  colors?: RoleColorOverrides;
  typographyScale?: TypographyScaleOverrides;
};

export interface CustomPropertyMap {
  colorCanvas: RgbColorString;
  colorCanvasBorder: RgbColorString;
  colorCanvasBorderEmphasized: RgbColorString;
  colorCanvasText: RgbColorString;
  colorCanvasTextSubdued: RgbColorString;
  colorCanvasTextEmphasized: RgbColorString;

  colorSurfacePrimary: RgbColorString;
  colorSurfacePrimaryDisabled: RgbColorString;
  colorSurfacePrimarySubdued: RgbColorString;
  colorSurfacePrimaryText: RgbColorString;
  colorSurfacePrimaryTextSubdued: RgbColorString;
  colorSurfacePrimaryTextEmphasized: RgbColorString;
  colorSurfacePrimaryBorder: RgbColorString;
  colorSurfacePrimaryBorderEmphasized: RgbColorString;

  colorSurfaceSecondary: RgbColorString;
  colorSurfaceSecondaryDisabled: RgbColorString;
  colorSurfaceSecondarySubdued: RgbColorString;
  colorSurfaceSecondaryText: RgbColorString;
  colorSurfaceSecondaryTextSubdued: RgbColorString;
  colorSurfaceSecondaryTextEmphasized: RgbColorString;
  colorSurfaceSecondaryBorder: RgbColorString;
  colorSurfaceSecondaryBorderEmphasized: RgbColorString;

  colorSurfaceTertiary: RgbColorString;
  colorSurfaceTertiaryDisabled: RgbColorString;
  colorSurfaceTertiarySubdued: RgbColorString;
  colorSurfaceTertiaryText: RgbColorString;
  colorSurfaceTertiaryTextSubdued: RgbColorString;
  colorSurfaceTertiaryTextEmphasized: RgbColorString;
  colorSurfaceTertiaryBorder: RgbColorString;
  colorSurfaceTertiaryBorderEmphasized: RgbColorString;

  colorSurfaceQuaternary: RgbColorString;
  colorSurfaceQuaternaryDisabled: RgbColorString;
  colorSurfaceQuaternarySubdued: RgbColorString;
  colorSurfaceQuaternaryText: RgbColorString;
  colorSurfaceQuaternaryTextSubdued: RgbColorString;
  colorSurfaceQuaternaryTextEmphasized: RgbColorString;
  colorSurfaceQuaternaryBorder: RgbColorString;
  colorSurfaceQuaternaryBorderEmphasized: RgbColorString;

  colorPrimary: RgbColorString;
  colorPrimaryHovered: RgbColorString;
  colorPrimaryPressed: RgbColorString;
  colorPrimaryText: RgbColorString;
  colorPrimaryTextHovered: RgbColorString;
  colorPrimaryTextPressed: RgbColorString;

  colorSecondary: RgbColorString;
  colorSecondaryHovered: RgbColorString;
  colorSecondaryPressed: RgbColorString;
  colorSecondaryText: RgbColorString;
  colorSecondaryTextHovered: RgbColorString;
  colorSecondaryTextPressed: RgbColorString;

  colorTertiary: RgbColorString;
  colorTertiaryText: RgbColorString;
  colorTertiaryTextSubdued: RgbColorString;

  colorInteractive: RgbColorString;
  colorInteractiveHovered: RgbColorString;
  colorInteractivePressed: RgbColorString;
  colorInteractiveText: RgbColorString;
  colorInteractiveTextHovered: RgbColorString;
  colorInteractiveTextPressed: RgbColorString;

  colorCritical: RgbColorString;
  colorCriticalText: RgbColorString;
  colorCriticalBorder: RgbColorString;
  colorCriticalBorderEmphasized: RgbColorString;

  typographySizeXSmall: string;
  typographySizeSmall: string;
  typographySizeDefault: string;
  typographySizeMedium: string;
  typographySizeLarge: string;
  typographySizeXLarge: string;
  typographySizeXXLarge: string;

  typographyPrimaryFonts: string;
  typographyPrimaryWeightBase: string;
  typographyPrimaryWeightBold: string;

  typographySecondaryFonts: string;
  typographySecondaryWeightBase: string;
  typographySecondaryWeightBold: string;

  spacingTight4x: string;
  spacingTight3x: string;
  spacingTight2x: string;
  spacingTight1x: string;
  spacingTight: string;
  spacingBase: string;
  spacingLoose: string;
  spacingLoose1x: string;
  spacingLoose2x: string;
  spacingLoose3x: string;
  spacingLoose4x: string;

  globalTypographyLetterCase?: string;
  globalTypographyLineSize?: string;
  globalTypographyKerning?: string;

  globalBorderRadius?: string;
  controlBorderRadius?: string;
  textFieldBorderRadius?: string;
  selectBorderRadius?: string;
  optionListBorderRadius?: string;
  checkboxBorderRadius?: string;
  reviewBlockBorderRadius?: string;

  textFieldBorder?: string;
  selectBorder?: string;
  checkboxBorder?: string;
  reviewBlockBorder?: string;

  optionListBlockGap?: string;
  reviewBlockBlockGap?: string;
  moneyLinesBlockGap?: string;
  moneyLinesSeparatorBlockGap?: string;

  buyerJourneyInlineGap?: string;

  style1TypographySize?: string;
  style1TypographyCase?: string;
  style1TypographyFonts?: string;
  style1TypographyWeight?: string;
  style1TypographyLineSize?: string;
  style1TypographyKerning?: string;

  style2TypographySize?: string;
  style2TypographyCase?: string;
  style2TypographyFonts?: string;
  style2TypographyWeight?: string;
  style2TypographyLineSize?: string;
  style2TypographyKerning?: string;

  style3TypographySize?: string;
  style3TypographyCase?: string;
  style3TypographyFonts?: string;
  style3TypographyWeight?: string;
  style3TypographyLineSize?: string;
  style3TypographyKerning?: string;

  style4TypographySize?: string;
  style4TypographyCase?: string;
  style4TypographyFonts?: string;
  style4TypographyWeight?: string;
  style4TypographyLineSize?: string;
  style4TypographyKerning?: string;

  style5TypographySize?: string;
  style5TypographyCase?: string;
  style5TypographyFonts?: string;
  style5TypographyWeight?: string;
  style5TypographyLineSize?: string;
  style5TypographyKerning?: string;

  style6TypographySize?: string;
  style6TypographyCase?: string;
  style6TypographyFonts?: string;
  style6TypographyWeight?: string;
  style6TypographyLineSize?: string;
  style6TypographyKerning?: string;

  style7TypographySize?: string;
  style7TypographyCase?: string;
  style7TypographyFonts?: string;
  style7TypographyWeight?: string;
  style7TypographyLineSize?: string;
  style7TypographyKerning?: string;

  style8TypographySize?: string;
  style8TypographyCase?: string;
  style8TypographyFonts?: string;
  style8TypographyWeight?: string;
  style8TypographyLineSize?: string;
  style8TypographyKerning?: string;

  style9TypographySize?: string;
  style9TypographyCase?: string;
  style9TypographyFonts?: string;
  style9TypographyWeight?: string;
  style9TypographyLineSize?: string;
  style9TypographyKerning?: string;

  primaryButtonBlockPadding?: string;
  primaryButtonInlinePadding?: string;
  secondaryButtonBlockPadding?: string;
  secondaryButtonInlinePadding?: string;

  moneyLinesBlockPadding?: string;
  moneyLinesInlinePadding?: string;

  moneySummaryBlockPadding?: string;
  moneySummaryInlinePadding?: string;

  optionListBlockPadding?: string;
  optionListInlinePadding?: string;

  tagBorderRadius?: string;

  radioSize?: string;
  checkboxSize?: string;

  bannerBorder?: string;
  bannerBorderRadius?: string;
}
