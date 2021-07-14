import React, {PropsWithChildren} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';
import {Breakpoint, LayoutProps} from '@shopify/checkout-ui-extensions';

import {useResponsive} from '../../utilities/responsive';
import {pixelOrPercent} from '../../utilities/units';
import {createIdCreator} from '../../utilities/id';

import styles from './Layout.css';

type Size = 'auto' | 'fill' | number;

const MEDIAQUERY_MAP: Map<Breakpoint, string> = new Map([
  ['small', '@media all and (min-width: 750px)'],
  ['medium', '@media all and (min-width: 1000px)'],
  ['large', '@media all and (min-width: 1200px)'],
]);

const createId = createIdCreator('Layout');

export function Layout({
  inlineAlignment = 'center',
  blockAlignment = 'leading',
  maxInlineSize,
  sizes,
  spacing,
  children,
}: PropsWithChildren<LayoutProps>) {
  const uniqueClassName = createId();
  const CSSSelector = `.${uniqueClassName} > .${styles.LayoutInner}`;

  const responsiveClassNames = useResponsive({spacing});

  const layoutClassName = classNames(
    styles.Layout,
    uniqueClassName,
    blockAlignment && styles[variationName('blockAlignment', blockAlignment)],
    inlineAlignment &&
      styles[variationName('inlineAlignment', inlineAlignment)],
  );

  const layoutInnerClassName = classNames(
    styles.LayoutInner,
    inlineAlignment &&
      styles[variationName('LayoutInner-inlineAlignment', inlineAlignment)],
    blockAlignment &&
      styles[variationName('LayoutInner-blockAlignment', blockAlignment)],
    responsiveClassNames &&
      responsiveClassNames.map(
        (className) => styles[`LayoutInner-${className}`],
      ),
  );

  const layoutStyles = [
    sizes && generateSizesStyle(CSSSelector, sizes),
    maxInlineSize && generateMaxInlineSizeStyles(CSSSelector, maxInlineSize),
  ].join(' ');

  return (
    <div className={layoutClassName}>
      {Boolean(layoutStyles.trim()) && <style>{layoutStyles}</style>}
      <div className={layoutInnerClassName}>
        {React.Children.map(children, (child) => (
          <div
            className={classNames(
              styles.LayoutInnerSpacing,
              responsiveClassNames &&
                responsiveClassNames.map(
                  (className) => styles[`LayoutInnerSpacing-${className}`],
                ),
            )}
          >
            <div>{child}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function generateSizesStyles(selector: string, sizes: Size[]) {
  return sizes.reduce((acc, basicSize, index) => {
    const mustFill = basicSize === 'fill';

    const sizeStyles =
      typeof basicSize === 'number'
        ? `flex: 0 0 ${pixelOrPercent(basicSize)};`
        : 'flex: 0 1 auto;';

    const inlineStyles = `
        ${selector} > :nth-child(${index + 1}) {
          ${mustFill ? 'flex: 1 0px;' : `${sizeStyles}`}
        }
      `;

    return [acc, inlineStyles].join(' ');
  }, '');
}

function generateSizesStyle(selector: string, sizes: LayoutProps['sizes']) {
  if (Array.isArray(sizes) || typeof sizes !== 'object') {
    const sizesStyles = sizes && generateSizesStyles(selector, sizes);

    const wrappingStyles = sizes?.includes(1)
      ? `${selector} { flex-wrap: wrap; }`
      : `${selector} { flex-wrap: nowrap; }`;

    return [sizesStyles, wrappingStyles].join(' ');
  }

  return Object.entries(sizes).reduce((acc, [breakpoint, sizes]) => {
    const sizesStyles = sizes && generateSizesStyles(selector, sizes);

    const wrappingStyles = sizes?.includes(1)
      ? `${selector} { flex-wrap: wrap; }`
      : `${selector} { flex-wrap: nowrap; }`;

    const mediaStyles = [sizesStyles, wrappingStyles];

    const inlineStyles =
      breakpoint === 'base'
        ? mediaStyles
        : [
            MEDIAQUERY_MAP.get(breakpoint as Breakpoint),
            '{',
            ...mediaStyles,
            '}',
          ];

    return [acc, ...inlineStyles].join(' ');
  }, '');
}

function generateMaxInlineSizeStyles(
  selector: string,
  maxInlineSize: LayoutProps['maxInlineSize'],
) {
  if (typeof maxInlineSize !== 'object') {
    return maxInlineSize
      ? `${selector} { max-width: ${pixelOrPercent(maxInlineSize)}; }`
      : '';
  }

  return Object.entries(maxInlineSize).reduce(
    (acc, [breakpoint, maxInlineSize]) => {
      const maxInlineSizeStyles = maxInlineSize
        ? `${selector} { max-width: ${pixelOrPercent(maxInlineSize)}; }`
        : '';

      const inlineStyles =
        breakpoint === 'base'
          ? [maxInlineSizeStyles]
          : [
              MEDIAQUERY_MAP.get(breakpoint as Breakpoint),
              '{',
              maxInlineSizeStyles,
              '}',
            ];

      return [acc, ...inlineStyles].join(' ');
    },
    '',
  );
}
