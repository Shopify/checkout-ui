import React, {PropsWithChildren} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';
import {LayoutProps} from '@shopify/argo-checkout';

import {pixelOrPercent} from '../../utilities/units';
import {createIdCreator} from '../../utilities/id';

import styles from './Layout.css';

type Media = Required<LayoutProps>['media'][0];
type ViewportSize = Media['viewportSize'];
type Size = Required<Media>['sizes'][0];

interface MediaWithDefault extends Omit<Media, 'viewportSize'> {
  viewportSize: ViewportSize | 'default';
}

const MEDIAQUERY_MAP: Map<ViewportSize, string> = new Map([
  ['small', '@media all and (max-width: 749px)'],
  ['medium', '@media all and (min-width: 750px) and (max-width: 1199px)'],
  ['large', '@media all and (min-width: 1200px)'],
]);

const createId = createIdCreator('Layout');

export function Layout({
  inlineAlignment,
  blockAlignment,
  maxInlineSize,
  sizes,
  media,
  children,
}: PropsWithChildren<LayoutProps>) {
  const uniqueClassName = createId();
  const CSSSelector = `.${uniqueClassName} > .${styles.LayoutInner}`;

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
  );

  const defaults: MediaWithDefault = {
    viewportSize: 'default',
    sizes,
    maxInlineSize,
  };

  const layoutStyles = media
    ? generateMediaStyles(CSSSelector, [defaults, ...media])
    : generateMediaStyles(CSSSelector, [defaults]);

  return (
    <>
      <style>{layoutStyles}</style>
      <div className={layoutClassName}>
        <div className={layoutInnerClassName}>{children}</div>
      </div>
    </>
  );
}

function generateSizesStyles(selector: string, sizes: Size[]) {
  return sizes.reduce((acc, basicSize, index) => {
    const canGrow = basicSize === 'fill';
    const canShrink = typeof basicSize !== 'number';

    const size =
      typeof basicSize === 'number' ? pixelOrPercent(basicSize) : 'auto';

    const inlineStyles = `
        ${selector} > :nth-child(${index + 1}) {
          flex: ${canGrow ? '1' : '0'} ${canShrink ? '1' : '0'} ${size};
          max-width: ${size};
        }
      `;

    return [acc, inlineStyles].join(' ');
  }, '');
}

function generateMediaStyles(selector: string, media: MediaWithDefault[]) {
  return media.reduce((acc, {viewportSize, maxInlineSize, sizes}) => {
    const sizesStyles = sizes && generateSizesStyles(selector, sizes);

    const wrappingStyles = sizes?.includes(1)
      ? `${selector} { flex-wrap: wrap; }`
      : '';

    const maxInlineSizeStyles = maxInlineSize
      ? `${selector} { max-width: ${pixelOrPercent(maxInlineSize)}; }`
      : '';

    const mediaStyles = [sizesStyles, wrappingStyles, maxInlineSizeStyles];

    const inlineStyles =
      viewportSize === 'default' ||
      typeof MEDIAQUERY_MAP.get(viewportSize) === 'undefined'
        ? mediaStyles
        : [MEDIAQUERY_MAP.get(viewportSize), '{', ...mediaStyles, '}'];

    return [acc, ...inlineStyles].join(' ');
  }, '');
}
