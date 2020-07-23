import React from 'react';
import {DecoratorFunction} from '@storybook/addons';
import {select, boolean} from '@storybook/addon-knobs';

import {Theme, createTheme, ThemeConfiguration} from '..';

type Keys = (keyof ThemeConfiguration)[];

interface Props {
  pick?: Keys;
  children: any;
}

enum Group {
  TextFields = 'Text fields',
  Selects = 'Selects',
  Breadcrumbs = 'Breadcrumbs',
  Actions = 'Actions',
  HeadingsLevel1 = 'Headings level 1',
  HeadingsLevel2 = 'Headings level 2',
  HeadingsLevel3 = 'Headings level 3',
  Checkbox = 'Checkbox',
}

enum Label {
  Border = 'Border',
  LabelPosition = 'Label position',
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
const BORDER_OPTIONS = optionify(['full', 'blockEnd', 'none']);
const LABEL_POSITION_OPTIONS = optionify(['inside', 'outside']);
const ACTIONS_DISPLAY_OPTIONS = optionify(['inline', 'block']);
const BREADCRUMB_GAP_OPTIONS = optionify(['base', 'loose']);
const NUMBER_STYLE_OPTIONS = optionify([
  'none',
  'decimal',
  'decimalLeadingZero',
]);
const STYLE_OPTIONS = optionify([
  'style1',
  'style2',
  'style3',
  'style4',
  'style5',
  'style6',
  'style7',
  'style8',
  'style9',
]);
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

export function themeWithKnobs(...picks: Keys): DecoratorFunction {
  return (storyFn) => <ThemeWithKnobs pick={picks}>{storyFn()}</ThemeWithKnobs>;
}

function ThemeWithKnobs({pick = [], children}: Props) {
  let textFieldsBorder;
  let selectBorder;
  let textFieldsLabelPosition;
  let selectLabelPosition;
  let actionsDisplay;
  let breadcrumbGap;
  let chevronIconSeparator = true;
  let numberStyle;
  let breadcrumbStyle;
  let headingLevel1Style;
  let headingLevel2Style;
  let headingLevel3Style;
  let checkboxBorderRadius;

  if (pick.includes('textFields')) {
    textFieldsBorder = select(
      Label.Border,
      BORDER_OPTIONS,
      textFieldsBorder,
      Group.TextFields,
    );
    textFieldsLabelPosition = select(
      Label.LabelPosition,
      LABEL_POSITION_OPTIONS,
      textFieldsLabelPosition,
      Group.TextFields,
    );
  }

  if (pick.includes('select')) {
    selectBorder = select(
      Label.Border,
      BORDER_OPTIONS,
      selectBorder,
      Group.Selects,
    );
    selectLabelPosition = select(
      Label.LabelPosition,
      LABEL_POSITION_OPTIONS,
      selectLabelPosition,
      Group.Selects,
    );
  }

  if (pick.includes('actions')) {
    actionsDisplay = select(
      Action.Display,
      ACTIONS_DISPLAY_OPTIONS,
      actionsDisplay,
      Group.Actions,
    );
  }

  if (pick.includes('buyerJourney')) {
    breadcrumbGap = select(
      Breadcrumb.Gap,
      BREADCRUMB_GAP_OPTIONS,
      breadcrumbGap,
      Group.Breadcrumbs,
    );
    chevronIconSeparator = boolean(
      Breadcrumb.ChevronIconSeparator,
      chevronIconSeparator,
      Group.Breadcrumbs,
    );
    numberStyle = select(
      Breadcrumb.NumberStyle,
      NUMBER_STYLE_OPTIONS,
      numberStyle,
      Group.Breadcrumbs,
    );
    breadcrumbStyle = select(
      'Style',
      STYLE_OPTIONS,
      breadcrumbStyle,
      Group.Breadcrumbs,
    );
  }

  if (pick.includes('checkbox')) {
    checkboxBorderRadius = select(
      'Border radius',
      SIMPLE_BORDER_RADIUS_OPTIONS,
      checkboxBorderRadius,
      Group.Checkbox,
    );
  }

  if (pick.includes('headingLevel1')) {
    headingLevel1Style = select(
      'Style',
      STYLE_OPTIONS,
      headingLevel1Style,
      Group.HeadingsLevel1,
    );
  }

  if (pick.includes('headingLevel2')) {
    headingLevel2Style = select(
      'Style',
      STYLE_OPTIONS,
      headingLevel2Style,
      Group.HeadingsLevel2,
    );
  }

  if (pick.includes('headingLevel3')) {
    headingLevel3Style = select(
      'Style',
      STYLE_OPTIONS,
      headingLevel3Style,
      Group.HeadingsLevel3,
    );
  }

  const typographyStyles = [...Array(9)].reduce((acc, _, index) => {
    const oneBasedIndex = index + 1;
    return {
      ...acc,
      [`typographyStyle${oneBasedIndex}`]: {
        size: select(
          `Style ${oneBasedIndex} size`,
          SIZE_OPTIONS,
          undefined,
          'Styles',
        ),
        letterCase: select(
          `Style ${oneBasedIndex} letter case`,
          LETTER_CASE_OPTIONS,
          undefined,
          'Styles',
        ),
        fonts: select(
          `Style ${oneBasedIndex} fonts`,
          FONT_OPTIONS,
          undefined,
          'Styles',
        ),
        weight: select(
          `Style ${oneBasedIndex} weight`,
          WEIGHT_OPTIONS,
          undefined,
          'Styles',
        ),
        lineSize: select(
          `Style ${oneBasedIndex} line size`,
          LINE_SIZE_OPTIONS,
          undefined,
          'Styles',
        ),
        kerning: select(
          `Style ${oneBasedIndex} kerning`,
          KERNING_OPTIONS,
          undefined,
          'Styles',
        ),
      },
    };
  }, {});

  const theme = createTheme({
    textFields: {
      border: textFieldsBorder,
      labelPosition: textFieldsLabelPosition,
    },
    select: {border: selectBorder, labelPosition: selectLabelPosition},
    actions: {display: actionsDisplay},
    buyerJourney: {
      gap: breadcrumbGap,
      chevronIconSeparator,
      numberStyle,
      typographyStyle: breadcrumbStyle,
    },
    headingLevel1: {typographyStyle: headingLevel1Style},
    headingLevel2: {typographyStyle: headingLevel2Style},
    headingLevel3: {typographyStyle: headingLevel3Style},
    ...typographyStyles,
    checkbox: {borderRadius: checkboxBorderRadius},
  });
  return <Theme theme={theme}>{children}</Theme>;
}

function optionify(array: string[]) {
  return array.reduce((acc, value) => ({...acc, [value]: value}), {
    ' ': undefined,
  });
}
