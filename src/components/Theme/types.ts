import {
  Hsl,
  RgbColorString,
  HslColorString,
  HslColorTuple,
} from '../../utilities/hsluv';

export interface ThemeConfiguration {
  readonly global: ThemeGlobal;
  readonly durationScale: Partial<DurationScale>;
  readonly buyerJourney: ThemeBuyerJourney;
  readonly colors: Partial<RoleColors>;
  readonly typographyScale: Partial<TypographyScale>;
  readonly typographyPrimary: ThemeTypographyFont;
  readonly typographySecondary: ThemeTypographyFont;
  readonly headingLevel1: ThemeHeading;
  readonly headingLevel2: ThemeHeading;
  readonly headingLevel3: ThemeHeading;
  readonly link: ThemeLink;
  readonly controls: ThemeControls;
  readonly label: ThemeLabel;
  readonly textFields: ThemeTextFields;
  readonly stepper: ThemeStepper;
  readonly select: ThemeSelect;
  readonly checkbox: ThemeCheckbox;
  readonly radio: ThemeRadio;
  readonly optionList: ThemeOptionList;
  readonly reviewBlock: ThemeReviewBlock;
  readonly lineItems: ThemeLineItems;
  readonly stockProblemsLineItems: ThemeLineItems;
  readonly throttleLineItems: ThemeLineItems;
  readonly moneyLines: ThemeMoneyLines;
  readonly moneySummary: ThemeMoneySummary;
  readonly primaryButton: ThemeButton;
  readonly secondaryButton: ThemeButton;
  readonly formLayout: ThemeFormLayout;
  readonly tag: ThemeTag;
  readonly tooltip: ThemeTooltip;
  readonly popover: ThemePopover;
  readonly banner: ThemeBanner;
  readonly thumbnail: ThemeThumbnail;
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

export interface ThemeOptions {
  readonly legacy?: boolean;
}

export type ThemeTypographyLineSize = 'base' | 'small' | 'large';
export type ThemeTypographyKerning = 'base' | 'loose' | 'xloose';
export type ThemeSimpleBorderRadius = 'none' | 'base';
export type ThemeBorderRadius =
  | ThemeSimpleBorderRadius
  | 'fullyRounded'
  | 'tight';
export type ThemeBorderColor = 'base' | 'emphasized';
export type ThemeSimpleBorder = 'none' | 'full';
export type ThemeBorder = ThemeSimpleBorder | 'blockEnd';
export type ThemeBorderStyle = 'base' | 'dotted';
export type ThemeBorderWidth = 'base' | 'thick';

export type ThemeSpacing =
  | 'none'
  | 'extraTight'
  | 'tight'
  | 'base'
  | 'loose'
  | 'extraLoose';
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
  decoration?: ThemeTypographyDecoration;
}

export interface DurationScale {
  base?: number | string;
  ratio?: number | string;
}

export interface DurationScaleOverrides {
  base?: number | string;
  ratio?: number | string;
}

export type ThemeDuration =
  | 'none'
  | 'fast'
  | 'base'
  | 'slow'
  | 'slower'
  | 'slowest';

export interface ThemeMotion {
  durationScale?: DurationScale;
}

export interface ThemeGlobal {
  borderRadius?: ThemeSimpleBorderRadius;
  typographyLetterCase?: ThemeTypographyLetterCase;
  typographyLineSizeDefault?: ThemeTypographyLineSize;
  typographyLineSizeSmall?: ThemeTypographyLineSize;
  typographyKerning?: ThemeTypographyKerning;
}

export type ThemeBuyerJourneyNumberStyle =
  | 'none'
  | 'decimal'
  | 'decimalLeadingZero';
export type ThemeBuyerJourneyAlignment = 'start' | 'center' | 'end';
export type ThemeBuyerJourneyPostion = 'start' | 'inline';
export interface ThemeBuyerJourney {
  alignment?: ThemeBuyerJourneyAlignment;
  position?: ThemeBuyerJourneyPostion;
  spacing?: ThemeSpacing;
  chevronIconSeparator?: boolean;
  numberStyle?: ThemeBuyerJourneyNumberStyle;
  typographyStyle?: ThemeTypographyStyle;
}

export type ThemeLabelPosition = 'inside' | 'outside' | 'inline';

export type ThemeMoneyLineInlineAlignment =
  | 'toEdge'
  | 'toAxis'
  | 'start'
  | 'end';

export type ThemeGiftCardStyle = 'masked' | 'hidden';

export type ThemeBackground =
  | 'surfacePrimary'
  | 'surfaceSecondary'
  | 'surfaceTertiary'
  | 'transparent';

export type ThemeButtonStyle = 'fill' | 'inverse' | 'plain';

export interface ThemeControls {
  background?: ThemeBackground;
  borderColor?: ThemeBorderColor;
  borderRadius?: ThemeSimpleBorderRadius;
  transitionDuration?: ThemeDuration;
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

export interface ThemeStepper {
  separator?: boolean;
}

export type ThemeResourceListBorder = ThemeSimpleBorder | 'inner' | 'outer';
export type ThemeOptionListBorder = ThemeSimpleBorder | 'inner';

export interface ThemeOptionList {
  background?: ThemeBackground;
  borderRadius?: ThemeBorderRadius;
  border?: ThemeOptionListBorder;
  borderStyle?: ThemeBorderStyle;
  spacing?: ThemeSpacing;
  blockPadding?: ThemeSpacing;
  inlinePadding?: ThemeSpacing;
  detailsBackground?: ThemeBackground;
  typographyStyle?: ThemeTypographyStyle;
}

export type ThemeDivider = 'toContainerEdge' | 'contentSize';
export type ThemeResourceItemDivider = 'none' | ThemeDivider;

export interface ThemeReviewBlock {
  background?: ThemeBackground;
  borderRadius?: ThemeBorderRadius;
  border?: ThemeSimpleBorder;
  spacing?: ThemeSpacing;
  inlinePadding?: ThemeSpacing;
  blockPadding?: ThemeSpacing;
  divider?: ThemeDivider;
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

export type ThemeRadioCheckedStyle = 'disc' | 'ring';
export type ThemeRadioCheckedColor = 'interactive' | 'primary';
export type ThemeRadioSize = 'base' | 'large';

export interface ThemeRadio {
  background?: ThemeBackground;
  borderColor?: ThemeBorderColor;
  checkedStyle?: ThemeRadioCheckedStyle;
  checkedColor?: ThemeRadioCheckedColor;
  size?: ThemeRadioSize;
}

export type ThemeThumbnailBadgePosition = 'none' | 'base';
export type ThemeThumbnailBadgeBackground = 'subdued' | 'primary';

export type ThemeLineItemQuantityPosition =
  | 'none'
  | 'thumbnailBadge'
  | 'inline'
  | 'inlinePrimary';

export interface ThemeLineItems {
  spacing?: ThemeSpacing;
  border?: ThemeResourceListBorder;
  borderStyle?: ThemeBorderStyle;
  borderColor?: ThemeBorderColor;
  background?: ThemeBackground;
  blockPadding?: ThemeSpacing;
  inlinePadding?: ThemeSpacing;
  itemDivider?: ThemeResourceItemDivider;
  itemSpacing?: ThemeSpacing;
  quantityPosition?: ThemeLineItemQuantityPosition;
  titleTypographyStyle?: ThemeTypographyStyle;
  optionsTypographyStyle?: ThemeTypographyStyle;
  optionsAppearance?: ThemeAppearance;
  optionsFormat?: ThemeOptionsFormat;
  propertiesTypographyStyle?: ThemeTypographyStyle;
  propertiesAppearance?: ThemeAppearance;
}

export interface ThemeMoneyLines {
  background?: ThemeBackground;
  blockPadding?: ThemeSpacing;
  divided?: boolean;
  dividerSpacing?: ThemeSpacing;
  giftCardStyle?: ThemeGiftCardStyle;
  inlinePadding?: ThemeSpacing;
  inlineAlignment?: ThemeMoneyLineInlineAlignment;
  spacing?: ThemeSpacing;
  labelTypographyStyle?: ThemeTypographyStyle;
  valueTypographyStyle?: ThemeTypographyStyle;
}

export interface ThemeMoneySummary {
  background?: ThemeBackground;
  blockPadding?: ThemeSpacing;
  inlinePadding?: ThemeSpacing;
  currencyCode?: boolean;
  labelTypographyStyle?: ThemeTypographyStyle;
  currencyTypographyStyle?: ThemeTypographyStyle;
  valueTypographyStyle?: ThemeTypographyStyle;
}

export type ThemeLoadingStyle = 'spinner' | 'progressBar';

export interface ThemeButton {
  style?: ThemeButtonStyle;
  border?: ThemeBorder;
  borderRadius?: ThemeBorderRadius;
  blockPadding?: ThemeSpacing;
  inlinePadding?: ThemeSpacing;
  typographyStyle?: ThemeTypographyStyle;
  loadingStyle?: ThemeLoadingStyle;
}

export interface ThemeFormLayout {
  spacing?: ThemeSpacing;
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

export type ThemePopoverConnector = 'arrow' | 'none';

export type ThemeDepth = 'none' | 'far';
// 'closest' | 'closer' | 'close' | 'farther' | 'farthest'

export interface ThemePopover {
  connector?: ThemePopoverConnector;
  depth?: ThemeDepth;
  opacity?: ThemeOpacity;
  textAlignment?: ThemeTextAlignment;
}

export interface ThemeBanner {
  border?: ThemeSimpleBorder;
  borderRadius?: ThemeBorderRadius;
}

export interface ThemeThumbnail {
  aspectRatio?: number;
  badgeBackground?: ThemeThumbnailBadgeBackground;
  border?: ThemeSimpleBorder;
}

export interface ColorGroup {
  background?: Hsl;
  foreground?: Hsl;
  accent?: Hsl;
}

export interface RoleColors {
  canvas: ColorGroup;
  surfacePrimary: ColorGroup;
  surfaceSecondary: ColorGroup;
  surfaceTertiary: ColorGroup;
  primaryAction: ColorGroup;
  secondaryAction: ColorGroup;
  tertiaryAction: ColorGroup;
  interactive: ColorGroup;
  info: ColorGroup;
  success: ColorGroup;
  warning: ColorGroup;
  critical: ColorGroup;
  color1: ColorGroup;
  color2: ColorGroup;
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

export type ThemeAppearance = 'subdued' | 'emphasized' | 'base';

export type ThemeOptionsFormat = 'inline' | 'descriptionList';

export interface ThemeTypographyFont {
  fonts?: string;
  weightBase?: CSSFontWeight;
  sourceBase?: string;
  weightBold?: CSSFontWeight;
  sourceBold?: string;
}

export type ThemeTypographySize =
  | 'extraSmall'
  | 'small'
  | 'base'
  | 'medium'
  | 'large'
  | 'extraLarge'
  | 'extraExtraLarge';

export type ThemeTypographyLetterCase = 'none' | 'title' | 'upper' | 'lower';
export type ThemeTypographyFonts = 'primary' | 'secondary';
export type ThemeTypographyWeight = 'base' | 'bold';
export type ThemeTypographyDecoration = 'none' | 'underline';
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

export type ThemeColorStyle = 'color1' | 'color2';

export interface ThemeLink {
  transitionDuration?: ThemeDuration;
  colorHovered?: ThemeColorStyle;
  typographyStyle?: ThemeTypographyStyle;
}

export type RoleColorOverrides = {
  [Color in keyof RoleColors]: ColorGroupOverrides;
};

export interface ColorGroupOverrides {
  foreground?: Hsl | HslColorString | HslColorTuple;
  background?: Hsl | HslColorString | HslColorTuple;
  accent?: Hsl | HslColorString | HslColorTuple;
}

export interface TypographyScaleOverrides {
  base?: number | string;
  ratio?: number | string;
}

export type ThemeConstructor = Omit<
  ThemeConfiguration,
  'colors' | 'typographyScale' | 'durationScale'
> & {
  colors?: RoleColorOverrides;
  typographyScale?: TypographyScaleOverrides;
  durationScale?: DurationScaleOverrides;
};

export interface CustomPropertyMap {
  colorCanvas: RgbColorString;
  colorCanvasSubdued: RgbColorString;
  colorCanvasBorder: RgbColorString;
  colorCanvasBorderEmphasized: RgbColorString;
  colorCanvasText: RgbColorString;
  colorCanvasTextSubdued: RgbColorString;
  colorCanvasTextEmphasized: RgbColorString;
  colorCanvasAccent: RgbColorString;

  colorSurfacePrimary: RgbColorString;
  colorSurfacePrimaryDisabled: RgbColorString;
  colorSurfacePrimarySubdued: RgbColorString;
  colorSurfacePrimaryText: RgbColorString;
  colorSurfacePrimaryTextSubdued: RgbColorString;
  colorSurfacePrimaryTextEmphasized: RgbColorString;
  colorSurfacePrimaryBorder: RgbColorString;
  colorSurfacePrimaryBorderEmphasized: RgbColorString;
  colorSurfacePrimaryAccent: RgbColorString;

  colorSurfaceSecondary: RgbColorString;
  colorSurfaceSecondaryDisabled: RgbColorString;
  colorSurfaceSecondarySubdued: RgbColorString;
  colorSurfaceSecondaryText: RgbColorString;
  colorSurfaceSecondaryTextSubdued: RgbColorString;
  colorSurfaceSecondaryTextEmphasized: RgbColorString;
  colorSurfaceSecondaryBorder: RgbColorString;
  colorSurfaceSecondaryBorderEmphasized: RgbColorString;
  colorSurfaceSecondaryAccent: RgbColorString;

  colorSurfaceTertiary: RgbColorString;
  colorSurfaceTertiaryDisabled: RgbColorString;
  colorSurfaceTertiarySubdued: RgbColorString;
  colorSurfaceTertiaryText: RgbColorString;
  colorSurfaceTertiaryTextSubdued: RgbColorString;
  colorSurfaceTertiaryTextEmphasized: RgbColorString;
  colorSurfaceTertiaryBorder: RgbColorString;
  colorSurfaceTertiaryBorderEmphasized: RgbColorString;
  colorSurfaceTertiaryAccent: RgbColorString;

  colorPrimaryAction: RgbColorString;
  colorPrimaryActionHovered: RgbColorString;
  colorPrimaryActionText: RgbColorString;
  colorPrimaryActionTextHovered: RgbColorString;
  colorPrimaryActionBorder: RgbColorString;
  colorPrimaryActionDisabled: RgbColorString;

  colorSecondaryAction: RgbColorString;
  colorSecondaryActionHovered: RgbColorString;
  colorSecondaryActionText: RgbColorString;
  colorSecondaryActionTextHovered: RgbColorString;
  colorSecondaryActionBorder: RgbColorString;
  colorSecondaryActionDisabled: RgbColorString;

  colorTertiaryAction: RgbColorString;
  colorTertiaryActionText: RgbColorString;
  colorTertiaryActionTextSubdued: RgbColorString;

  colorInteractive: RgbColorString;
  colorInteractiveHovered: RgbColorString;
  colorInteractivePressed: RgbColorString;
  colorInteractiveText: RgbColorString;
  colorInteractiveTextHovered: RgbColorString;
  colorInteractiveTextPressed: RgbColorString;

  color1: RgbColorString;
  color1Text: RgbColorString;
  color2: RgbColorString;
  color2Text: RgbColorString;

  colorInfo: RgbColorString;
  colorInfoDisabled: RgbColorString;
  colorInfoSubdued: RgbColorString;
  colorInfoText: RgbColorString;
  colorInfoTextSubdued: RgbColorString;
  colorInfoTextEmphasized: RgbColorString;
  colorInfoBorder: RgbColorString;
  colorInfoBorderEmphasized: RgbColorString;
  colorInfoAccent: RgbColorString;

  colorSuccess: RgbColorString;
  colorSuccessDisabled: RgbColorString;
  colorSuccessSubdued: RgbColorString;
  colorSuccessText: RgbColorString;
  colorSuccessTextSubdued: RgbColorString;
  colorSuccessTextEmphasized: RgbColorString;
  colorSuccessBorder: RgbColorString;
  colorSuccessBorderEmphasized: RgbColorString;
  colorSuccessAccent: RgbColorString;

  colorWarning: RgbColorString;
  colorWarningDisabled: RgbColorString;
  colorWarningSubdued: RgbColorString;
  colorWarningText: RgbColorString;
  colorWarningTextSubdued: RgbColorString;
  colorWarningTextEmphasized: RgbColorString;
  colorWarningBorder: RgbColorString;
  colorWarningBorderEmphasized: RgbColorString;
  colorWarningAccent: RgbColorString;

  colorCritical: RgbColorString;
  colorCriticalDisabled: RgbColorString;
  colorCriticalSubdued: RgbColorString;
  colorCriticalText: RgbColorString;
  colorCriticalTextSubdued: RgbColorString;
  colorCriticalTextEmphasized: RgbColorString;
  colorCriticalBorder: RgbColorString;
  colorCriticalBorderEmphasized: RgbColorString;
  colorCriticalAccent: RgbColorString;

  typographySizeExtraSmall: string;
  typographySizeSmall: string;
  typographySizeDefault: string;
  typographySizeMedium: string;
  typographySizeLarge: string;
  typographySizeExtraLarge: string;
  typographySizeExtraExtraLarge: string;

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

  durationNone: string;
  durationFast: string;
  durationBase: string;
  durationSlow: string;
  durationSlower: string;
  durationSlowest: string;

  globalTypographyLetterCase?: string;
  globalTypographyLineSizeDefault?: string;
  globalTypographyLineSizeSmall?: string;
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

  optionListBlockSpacing?: string;
  reviewBlockBlockSpacing?: string;
  moneyLinesBlockSpacing?: string;
  moneyLinesDividerBlockSpacing?: string;

  buyerJourneyInlineSpacing?: string;

  style1TypographySize?: string;
  style1TypographyCase?: string;
  style1TypographyFonts?: string;
  style1TypographyWeight?: string;
  style1TypographyLineSize?: string;
  style1TypographyKerning?: string;
  style1TypographyDecoration?: string;

  style2TypographySize?: string;
  style2TypographyCase?: string;
  style2TypographyFonts?: string;
  style2TypographyWeight?: string;
  style2TypographyLineSize?: string;
  style2TypographyKerning?: string;
  style2TypographyDecoration?: string;

  style3TypographySize?: string;
  style3TypographyCase?: string;
  style3TypographyFonts?: string;
  style3TypographyWeight?: string;
  style3TypographyLineSize?: string;
  style3TypographyKerning?: string;
  style3TypographyDecoration?: string;

  style4TypographySize?: string;
  style4TypographyCase?: string;
  style4TypographyFonts?: string;
  style4TypographyWeight?: string;
  style4TypographyLineSize?: string;
  style4TypographyKerning?: string;
  style4TypographyDecoration?: string;

  style5TypographySize?: string;
  style5TypographyCase?: string;
  style5TypographyFonts?: string;
  style5TypographyWeight?: string;
  style5TypographyLineSize?: string;
  style5TypographyKerning?: string;
  style5TypographyDecoration?: string;

  style6TypographySize?: string;
  style6TypographyCase?: string;
  style6TypographyFonts?: string;
  style6TypographyWeight?: string;
  style6TypographyLineSize?: string;
  style6TypographyKerning?: string;
  style6TypographyDecoration?: string;

  style7TypographySize?: string;
  style7TypographyCase?: string;
  style7TypographyFonts?: string;
  style7TypographyWeight?: string;
  style7TypographyLineSize?: string;
  style7TypographyKerning?: string;
  style7TypographyDecoration?: string;

  style8TypographySize?: string;
  style8TypographyCase?: string;
  style8TypographyFonts?: string;
  style8TypographyWeight?: string;
  style8TypographyLineSize?: string;
  style8TypographyKerning?: string;
  style8TypographyDecoration?: string;

  style9TypographySize?: string;
  style9TypographyCase?: string;
  style9TypographyFonts?: string;
  style9TypographyWeight?: string;
  style9TypographyLineSize?: string;
  style9TypographyKerning?: string;
  style9TypographyDecoration?: string;

  primaryButtonBlockPadding?: string;
  primaryButtonInlinePadding?: string;
  primaryButtonBorderRadius?: string;
  secondaryButtonBlockPadding?: string;
  secondaryButtonInlinePadding?: string;
  secondaryButtonBorderRadius?: string;

  moneyLinesBlockPadding?: string;
  moneyLinesInlinePadding?: string;

  moneySummaryBlockPadding?: string;
  moneySummaryInlinePadding?: string;

  optionListBlockPadding?: string;
  optionListInlinePadding?: string;
  reviewBlockBlockPadding?: string;
  reviewBlockInlinePadding?: string;

  tagBorderRadius?: string;

  radioSizeBase?: string;
  radioSizeLarge?: string;
  checkboxSize?: string;

  bannerBorder?: string;
  bannerBorderRadius?: string;

  iconSizeDefault?: string;
  iconSizeSmall?: string;
  iconSizeLarge?: string;

  thumbnailAspectRatio?: string;

  linkTransitionDuration?: string;
}
