import React from 'react';
import {DecoratorFunction} from '@storybook/addons';
import {select, boolean, color, text, number} from '@storybook/addon-knobs';
import {rgbToHsluv, ColorTuple} from 'hsluv';

import {Theme, createTheme, ThemeConfiguration} from '..';

type Keys = (keyof ThemeConfiguration)[];

interface Props {
  pick?: Keys;
  children: any;
}

enum Group {
  TextField = 'Text field',
  Select = 'Select',
  Breadcrumb = 'Breadcrumb',
  Actions = 'Actions',
  HeadingLevel1 = 'Heading level 1',
  HeadingLevel2 = 'Heading level 2',
  HeadingLevel3 = 'Heading level 3',
  Checkbox = 'Checkbox',
  PrimaryButton = 'Primary button',
  SecondaryButton = 'Secondary button',
  FormLayout = 'Form layout',
  Tag = 'Tag',
  Tooltip = 'Tooltip',
  Banner = 'Banner',
  OptionList = 'Option list',
  Style = 'Style',
  Color = 'Color',
  Typography = 'Typography',
}

enum Label {
  Border = 'Border',
  BorderRadius = 'Border radius',
  LabelPosition = 'Label position',
  Style = 'Style',
  ErrorIndentation = 'Error indentation',
  BlockPadding = 'Block padding',
  InlinePadding = 'Inline padding',
  LoadingStyle = 'Loading style',
}

enum Action {
  Display = 'Display',
}

enum Breadcrumb {
  Gap = 'Gap',
  ChevronIconSeparator = 'Chevron icon separator',
  NumberStyle = 'Number style',
}

const SIMPLE_BORDER_RADIUS_OPTIONS = optionify(['none', 'base']);
const BORDER_RADIUS_OPTIONS = optionify([
  'none',
  'tight',
  'base',
  'fullyRounded',
]);
const SIMPLE_BORDER_OPTIONS = optionify(['full', 'none']);
const BORDER_OPTIONS = optionify(['full', 'blockEnd', 'none']);
const LABEL_POSITION_OPTIONS = optionify(['inside', 'outside']);
const ACTIONS_DISPLAY_OPTIONS = optionify(['inline', 'block']);
const BREADCRUMB_GAP_OPTIONS = optionify(['base', 'loose']);
const NUMBER_STYLE_OPTIONS = optionify([
  'none',
  'decimal',
  'decimalLeadingZero',
]);
const STYLE_OPTIONS = optionify(['style1']);
const SIZE_OPTIONS = optionify([
  'base',
  'xsmall',
  'small',
  'medium',
  'large',
  'xlarge',
  'xxlarge',
]);
const LETTER_CASE_OPTIONS = optionify(['none', 'title', 'upper', 'lower']);
const FONT_OPTIONS = optionify(['primary', 'secondary']);
const WEIGHT_OPTIONS = optionify(['base', 'bold']);
const LINE_SIZE_OPTIONS = optionify(['base', 'large']);
const KERNING_OPTIONS = optionify(['base', 'loose', 'xloose']);
const SPACING_OPTIONS = optionify([
  'none',
  'tight4x',
  'tight3x',
  'tight2x',
  'tight1x',
  'tight',
  'base',
  'loose',
  'loose1x',
  'loose2x',
  'loose3x',
  'loose4x',
]);
const SIMPLE_SPACING_OPTIONS = optionify(['tight', 'base']);
const LOADING_STYLE_OPTIONS = optionify(['spinner', 'progressBar']);
const ERROR_INDENTATION_OPTIONS = optionify(['none', 'toText']);
const OPACITY_OPTIONS = optionify(['translucent', 'opaque']);
const TEXT_ALIGNMENT_OPTIONS = optionify(['start', 'center']);
const OPTION_LIST_BORDER_OPTIONS = optionify(['full', 'none', 'inner']);
const BORDER_STYLE_OPTIONS = optionify(['base', 'dotted']);
const UNDEFINED = '';
const FONT_WEIGHT_OPTIONS = optionify([
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
]);

export function themeWithKnobs(...picks: Keys): DecoratorFunction {
  return (storyFn) => <ThemeWithKnobs pick={picks}>{storyFn()}</ThemeWithKnobs>;
}

function ThemeWithKnobs({pick = [], children}: Props) {
  const textFields = {
    border: undefined,
    labelPosition: undefined,
    errorIndentation: undefined,
  };
  const selects = {
    border: undefined,
    labelPosition: undefined,
    errorIndentation: undefined,
  };
  const actions = {display: undefined};
  const buyerJourney = {
    gap: undefined,
    chevronIconSeparator: true,
    numberStyle: undefined,
    typographyStyle: undefined,
  };
  const headingLevel1 = {typographyStyle: undefined};
  const headingLevel2 = {typographyStyle: undefined};
  const headingLevel3 = {typographyStyle: undefined};

  const checkbox = {
    borderRadius: undefined,
    errorIndentation: undefined,
  };
  const primaryButton = {
    blockPadding: undefined,
    inlinePadding: undefined,
    typographyStyle: undefined,
    loadingStyle: undefined,
  };
  const secondaryButton = {
    blockPadding: undefined,
    inlinePadding: undefined,
    typographyStyle: undefined,
    loadingStyle: undefined,
  };
  const formLayout = {
    spacing: undefined,
  };
  const tag = {
    borderRadius: undefined,
  };
  const tooltip = {
    borderRadius: undefined,
    opacity: undefined,
    textAlignment: undefined,
  };
  const banner = {
    border: undefined,
    borderRadius: undefined,
  };

  const optionList = {
    border: undefined,
    borderRadius: undefined,
    borderStyle: undefined,
    gap: undefined,
    blockPadding: undefined,
    inlinePadding: undefined,
    typographyStyle: undefined,
  };

  if (pick.includes('textFields')) {
    textFields.border = select(
      Label.Border,
      BORDER_OPTIONS,
      textFields.border,
      Group.TextField,
    );
    textFields.labelPosition = select(
      Label.LabelPosition,
      LABEL_POSITION_OPTIONS,
      textFields.labelPosition,
      Group.TextField,
    );
    textFields.errorIndentation = select(
      Label.ErrorIndentation,
      ERROR_INDENTATION_OPTIONS,
      textFields.errorIndentation,
      Group.TextField,
    );
  }

  if (pick.includes('select')) {
    selects.border = select(
      Label.Border,
      BORDER_OPTIONS,
      selects.border,
      Group.Select,
    );
    selects.labelPosition = select(
      Label.LabelPosition,
      LABEL_POSITION_OPTIONS,
      selects.labelPosition,
      Group.Select,
    );
    selects.errorIndentation = select(
      Label.ErrorIndentation,
      ERROR_INDENTATION_OPTIONS,
      selects.errorIndentation,
      Group.Select,
    );
  }

  if (pick.includes('actions')) {
    actions.display = select(
      Action.Display,
      ACTIONS_DISPLAY_OPTIONS,
      actions.display,
      Group.Actions,
    );
  }

  if (pick.includes('buyerJourney')) {
    buyerJourney.gap = select(
      Breadcrumb.Gap,
      BREADCRUMB_GAP_OPTIONS,
      buyerJourney.gap,
      Group.Breadcrumb,
    );
    buyerJourney.chevronIconSeparator = boolean(
      Breadcrumb.ChevronIconSeparator,
      buyerJourney.chevronIconSeparator,
      Group.Breadcrumb,
    );
    buyerJourney.numberStyle = select(
      Breadcrumb.NumberStyle,
      NUMBER_STYLE_OPTIONS,
      buyerJourney.numberStyle,
      Group.Breadcrumb,
    );
    buyerJourney.typographyStyle = select(
      Label.Style,
      STYLE_OPTIONS,
      buyerJourney.typographyStyle,
      Group.Breadcrumb,
    );
  }

  if (pick.includes('checkbox')) {
    checkbox.borderRadius = select(
      Label.BorderRadius,
      SIMPLE_BORDER_RADIUS_OPTIONS,
      checkbox.borderRadius,
      Group.Checkbox,
    );
    checkbox.errorIndentation = select(
      Label.ErrorIndentation,
      ERROR_INDENTATION_OPTIONS,
      checkbox.errorIndentation,
      Group.Checkbox,
    );
  }

  if (pick.includes('banner')) {
    banner.border = select(
      Label.Border,
      SIMPLE_BORDER_OPTIONS,
      banner.border,
      Group.Banner,
    );
    banner.borderRadius = select(
      Label.BorderRadius,
      BORDER_RADIUS_OPTIONS,
      banner.borderRadius,
      Group.Banner,
    );
  }

  if (pick.includes('optionList')) {
    optionList.borderRadius = select(
      Label.BorderRadius,
      BORDER_RADIUS_OPTIONS,
      optionList.borderRadius,
      Group.OptionList,
    );
    optionList.border = select(
      Label.Border,
      OPTION_LIST_BORDER_OPTIONS,
      optionList.border,
      Group.OptionList,
    );
    optionList.borderStyle = select(
      'Border style',
      BORDER_STYLE_OPTIONS,
      optionList.borderStyle,
      Group.OptionList,
    );
    optionList.gap = select(
      'Gap',
      optionify(['none', 'tight', 'base']),
      optionList.gap,
      Group.OptionList,
    );
    optionList.blockPadding = select(
      Label.BlockPadding,
      SPACING_OPTIONS,
      optionList.blockPadding,
      Group.OptionList,
    );
    optionList.inlinePadding = select(
      Label.InlinePadding,
      SPACING_OPTIONS,
      optionList.inlinePadding,
      Group.OptionList,
    );
    optionList.typographyStyle = select(
      Label.Style,
      STYLE_OPTIONS,
      optionList.typographyStyle,
      Group.OptionList,
    );
  }

  if (pick.includes('headingLevel1')) {
    headingLevel1.typographyStyle = select(
      Label.Style,
      STYLE_OPTIONS,
      headingLevel1.typographyStyle,
      Group.HeadingLevel1,
    );
  }

  if (pick.includes('headingLevel2')) {
    headingLevel2.typographyStyle = select(
      Label.Style,
      STYLE_OPTIONS,
      headingLevel2.typographyStyle,
      Group.HeadingLevel2,
    );
  }

  if (pick.includes('headingLevel3')) {
    headingLevel3.typographyStyle = select(
      Label.Style,
      STYLE_OPTIONS,
      headingLevel3.typographyStyle,
      Group.HeadingLevel3,
    );
  }

  if (pick.includes('primaryButton')) {
    primaryButton.typographyStyle = select(
      Label.Style,
      STYLE_OPTIONS,
      primaryButton.typographyStyle,
      Group.PrimaryButton,
    );
    primaryButton.blockPadding = select(
      Label.BlockPadding,
      SPACING_OPTIONS,
      primaryButton.blockPadding,
      Group.PrimaryButton,
    );
    primaryButton.inlinePadding = select(
      Label.InlinePadding,
      SPACING_OPTIONS,
      primaryButton.inlinePadding,
      Group.PrimaryButton,
    );
    primaryButton.loadingStyle = select(
      Label.LoadingStyle,
      LOADING_STYLE_OPTIONS,
      primaryButton.loadingStyle,
      Group.PrimaryButton,
    );
  }

  if (pick.includes('secondaryButton')) {
    secondaryButton.typographyStyle = select(
      Label.Style,
      STYLE_OPTIONS,
      secondaryButton.typographyStyle,
      Group.SecondaryButton,
    );
    secondaryButton.blockPadding = select(
      Label.BlockPadding,
      SPACING_OPTIONS,
      secondaryButton.blockPadding,
      Group.SecondaryButton,
    );
    secondaryButton.inlinePadding = select(
      Label.InlinePadding,
      SPACING_OPTIONS,
      secondaryButton.inlinePadding,
      Group.SecondaryButton,
    );
    secondaryButton.loadingStyle = select(
      Label.LoadingStyle,
      LOADING_STYLE_OPTIONS,
      secondaryButton.loadingStyle,
      Group.SecondaryButton,
    );
  }

  if (pick.includes('formLayout')) {
    formLayout.spacing = select(
      'Spacing',
      SIMPLE_SPACING_OPTIONS,
      formLayout.spacing,
      Group.FormLayout,
    );
  }

  if (pick.includes('tag')) {
    tag.borderRadius = select(
      Label.BorderRadius,
      BORDER_RADIUS_OPTIONS,
      tag.borderRadius,
      Group.Tag,
    );
  }

  if (pick.includes('tooltip')) {
    tooltip.borderRadius = select(
      Label.BorderRadius,
      BORDER_RADIUS_OPTIONS,
      tooltip.borderRadius,
      Group.Tooltip,
    );
    tooltip.opacity = select(
      'Opacity',
      OPACITY_OPTIONS,
      tooltip.opacity,
      Group.Tooltip,
    );
    tooltip.textAlignment = select(
      'Text alignment',
      TEXT_ALIGNMENT_OPTIONS,
      tooltip.textAlignment,
      Group.Tooltip,
    );
  }

  const theme = createTheme({
    textFields,
    select: selects,
    actions,
    buyerJourney,
    headingLevel1,
    headingLevel2,
    headingLevel3,
    checkbox,
    primaryButton,
    secondaryButton,
    formLayout,
    tag,
    tooltip,
    banner,
    optionList,
    typographyStyle1: {
      size: select(`Size`, SIZE_OPTIONS, undefined, Group.Style),
      letterCase: select(
        `Letter case`,
        LETTER_CASE_OPTIONS,
        undefined,
        Group.Style,
      ),
      fonts: select(`Font`, FONT_OPTIONS, undefined, Group.Style),
      weight: select(`Weight`, WEIGHT_OPTIONS, undefined, Group.Style),
      lineSize: select(`Line size`, LINE_SIZE_OPTIONS, undefined, Group.Style),
      kerning: select(`Kerning`, KERNING_OPTIONS, undefined, Group.Style),
    },
    typographyScale: {
      base: number('Base size', 14, {}, Group.Typography),
      ratio: number('Scale ratio', 1.285, {step: 0.001}, Group.Typography),
    },
    typographyPrimary: {
      fonts: text(
        'Primary font stack',
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif",
        Group.Typography,
      ),
      weightBase: select(
        'Primary font - base weight',
        FONT_WEIGHT_OPTIONS,
        undefined,
        Group.Typography,
      ),
      weightBold: select(
        'Primary font - bold weight',
        FONT_WEIGHT_OPTIONS,
        undefined,
        Group.Typography,
      ),
    },
    typographySecondary: {
      fonts: text(
        'Secondary font stack',
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif",
        Group.Typography,
      ),
      weightBase: select(
        'Secondary font - base weight',
        FONT_WEIGHT_OPTIONS,
        undefined,
        Group.Typography,
      ),
      weightBold: select(
        'Secondary font - bold weight',
        FONT_WEIGHT_OPTIONS,
        undefined,
        Group.Typography,
      ),
    },
    colors: {
      canvas: hsluvColorPair('Canvas'),
      surfacePrimary: hsluvColorPair('Surface primary'),
      surfaceSecondary: hsluvColorPair('Surface secondary'),
      surfaceTertiary: hsluvColorPair('Surface tertiary'),
      surfaceQuaternary: hsluvColorPair('Surface quaternary'),
      primary: hsluvColorPair('Primary'),
      secondary: hsluvColorPair('Secondary'),
      tertiary: hsluvColorPair('Tertiary'),
      interactive: hsluvColorPair('Interactive'),
      success: hsluvColorPair('Success'),
      critical: hsluvColorPair('Critical'),
    },
  });
  return <Theme theme={theme}>{children}</Theme>;
}

function optionify(array: string[]) {
  return array.reduce((acc, value) => ({...acc, [value]: value}), {
    ' ': undefined,
  });
}

function toHsluv(str: string) {
  if (str === UNDEFINED) return undefined;

  const rgb = str
    .slice(5, -1)
    .split(',')
    .slice(0, 3)
    .map(Number)
    .map((num) => num / 255);

  return rgbToHsluv(rgb as ColorTuple);
}

function hsluvColor(name: string) {
  return toHsluv(color(name, UNDEFINED, Group.Color));
}

function hsluvColorPair(name: string) {
  return {
    background: hsluvColor(`${name} background`),
    foreground: hsluvColor(`${name} foreground`),
  };
}
