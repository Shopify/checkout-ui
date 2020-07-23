import React, {ReactNode} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';

import {pixelOrPercent} from '../../utilities/units';
import {createIdCreator} from '../../utilities/id';

import styles from './Layout.css';

/**
 * Options available for section sizes.
 *
 * `auto` will fit to the size of its content.
 * `fill` will take the remaining space available.
 * `Number` less than or equal to 1 are treated as percentages and numbers greater than 1 are treated as pixels.
 *
 * Examples:
 * - `500` represents `500px`
 * - `0.5` represents `50%`
 * - `1` represents `100%`
 */
type Size = 'auto' | 'fill' | number;

type ViewportSize = 'small' | 'medium' | 'large';

interface Media {
  /*
   * Specifies the viewport size these instruction will apply to.
   */
  viewportSize: ViewportSize;
  /**
   * Maximum inline size of the layout for this viewport.
   * The size specified will constrain the space available for its sections and will
   * be centered in the viewport unless specified otherwise with `inlineAlignment`.
   *
   * Numbers less than or equal to 1 are treated as percentages and numbers greater than 1 are treated as pixels.
   *
   * Examples:
   * - `500` represents `500px`
   * - `0.5` represents `50%`
   * - `1` represents `100%`
   */
  maxInlineSize?: number;
  /**
   * Sizes for each section of the layout for this media.
   * If a `maxInlineSize` is specified, make sure you adapt your pixel values accordingly.
   */
  sizes?: Size[];
}

interface MediaWithDefault extends Omit<Media, 'viewportSize'> {
  viewportSize: ViewportSize | 'default';
}

const MEDIAQUERY_MAP: Map<ViewportSize, string> = new Map([
  ['small', '@media all and (max-width: 749px)'],
  ['medium', '@media all and (min-width: 750px) and (max-width: 1199px)'],
  ['large', '@media all and (min-width: 1200px)'],
]);

export interface Props {
  children?: ReactNode;
  /**
   * Specifies the inline alignment of the layout in its container.
   * By default, it will be centered.
   */
  inlineAlignment?: 'leading' | 'trailing';
  /**
   * Specifies the block alignment of the layout in its container.
   * By default, it will be leading.
   */
  blockAlignment?: 'center' | 'trailing';
  /**
   * Default maximum inline size of the layout within its viewport.
   * The size specified will constrain the space available for its sections and will
   * be centered in the viewport unless specified otherwise with `inlineAlignment`.
   *
   * Numbers less than or equal to 1 are treated as percentages and numbers greater than 1 are treated as pixels.
   *
   * Examples:
   * - `500` represents `500px`
   * - `0.5` represents `50%`
   * - `1` represents `100%`
   */
  maxInlineSize?: number;
  /**
   * Default sizes for each section of the layout
   */
  sizes?: Size[];
  /**
   * Sizes at different media
   */
  media?: Media[];
}

const createId = createIdCreator('Layout');

export function Layout({
  inlineAlignment,
  blockAlignment,
  maxInlineSize,
  sizes,
  media,
  children,
}: Props) {
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
