import {variationName} from '@shopify/css-utilities';
import {Breakpoint} from '@shopify/checkout-ui-extensions';

const classNamesMap = {
  padding: [
    'paddingInlineStart',
    'paddingInlineEnd',
    'paddingBlockStart',
    'paddingBlockEnd',
  ],
  paddingInline: ['paddingInlineStart', 'paddingInlineEnd'],
  paddingInlineStart: 'paddingInlineStart',
  paddingInlineEnd: 'paddingInlineEnd',
  paddingBlock: ['paddingBlockStart', 'paddingBlockEnd'],
  paddingBlockStart: 'paddingBlockStart',
  paddingBlockEnd: 'paddingBlockEnd',
  background: 'background',
  border: [
    'borderInlineStart',
    'borderInlineEnd',
    'borderBlockStart',
    'borderBlockEnd',
  ],
  borderInline: ['borderInlineStart', 'borderInlineEnd'],
  borderInlineStart: 'borderInlineStart',
  borderInlineEnd: 'borderInlineEnd',
  borderBlock: ['borderBlockStart', 'borderBlockEnd'],
  borderBlockStart: 'borderBlockStart',
  borderBlockEnd: 'borderBlockEnd',
  borderWidth: [
    'borderWidthInlineStart',
    'borderWidthInlineEnd',
    'borderWidthBlockStart',
    'borderWidthBlockEnd',
  ],
  borderWidthInline: ['borderWidthInlineStart', 'borderWidthInlineEnd'],
  borderWidthInlineStart: 'borderWidthInlineStart',
  borderWidthInlineEnd: 'borderWidthInlineEnd',
  borderWidthBlock: ['borderWidthBlockStart', 'borderWidthBlockEnd'],
  borderWidthBlockStart: 'borderWidthBlockStart',
  borderWidthBlockEnd: 'borderWidthBlockEnd',
  borderColor: [
    'borderColorInlineStart',
    'borderColorInlineEnd',
    'borderColorBlockStart',
    'borderColorBlockEnd',
  ],
  borderRadius: [
    'borderRadiusInlineStart',
    'borderRadiusInlineEnd',
    'borderRadiusBlockStart',
    'borderRadiusBlockEnd',
  ],
  borderRadiusInline: ['borderRadiusInlineStart', 'borderRadiusInlineEnd'],
  borderRadiusInlineStart: 'borderRadiusInlineStart',
  borderRadiusInlineEnd: 'borderRadiusInlineEnd',
  borderRadiusBlock: ['borderRadiusBlockStart', 'borderRadiusBlockEnd'],
  borderRadiusBlockStart: 'borderRadiusBlockStart',
  borderRadiusBlockEnd: 'borderRadiusBlockEnd',
  spacing: 'spacing',
  size: 'size',
  stack: 'stack',
};

type Props = {[prop in keyof typeof classNamesMap]?: any};

export function generateResponsiveClassnames(
  props: Props,
  breakpoint?: Breakpoint,
) {
  return Object.entries(props)
    .map(([prop, value]) => [prop, value == null ? value : `${value}`])
    .filter(([prop, value]) => classNamesMap[prop as keyof Props] && value)
    .reduce((classNames: string[], [prop, value]) => {
      const property = classNamesMap[prop as keyof Props];

      if (Array.isArray(property)) {
        return [
          ...classNames,
          ...property.map((property) =>
            breakpoint && breakpoint !== 'base'
              ? variationName(variationName(breakpoint, property), value)
              : variationName(property, value),
          ),
        ];
      }

      return [
        ...classNames,
        breakpoint && breakpoint !== 'base'
          ? variationName(variationName(breakpoint, property), value)
          : variationName(property, value),
      ];
    }, []);
}

export function convertLogicalProps(prop: string, value: any) {
  if (Array.isArray(value)) {
    if (value.length === 2) {
      const [block, inline] = value;

      return {
        [`${prop}Block`]: block,
        [`${prop}Inline`]: inline,
      };
    } else if (value.length === 4) {
      const [blockStart, inlineEnd, blockEnd, inlineStart] = value;

      return {
        [`${prop}BlockStart`]: blockStart,
        [`${prop}InlineEnd`]: inlineEnd,
        [`${prop}BlockEnd`]: blockEnd,
        [`${prop}InlineStart`]: inlineStart,
      };
    }
  }

  return {[prop]: value};
}

export function useResponsive(props: Props) {
  return Object.entries(props).reduce(
    (classNames: string[], [prop, values]) => {
      if (Array.isArray(values) || typeof values !== 'object') {
        return [
          ...classNames,
          ...generateResponsiveClassnames(convertLogicalProps(prop, values)),
        ];
      }

      return [
        ...classNames,
        ...Object.entries(values)
          .map(([breakpoint, value]) =>
            generateResponsiveClassnames(
              convertLogicalProps(prop, value),
              breakpoint as Breakpoint,
            ),
          )
          .reduce((classNames, className) => classNames.concat(className), []),
      ];
    },
    [],
  );
}
