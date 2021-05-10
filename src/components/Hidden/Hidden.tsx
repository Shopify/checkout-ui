import React, {PropsWithChildren} from 'react';
import {classNames} from '@shopify/css-utilities';

import {useInlineFormatting} from '../../utilities/inlineFormatting';

import styles from './Hidden.css';

type ViewportSize = 'small' | 'medium' | 'large';
type AboveViewportSize = Exclude<ViewportSize, 'large'>;
type BelowViewportSize = Exclude<ViewportSize, 'small'>;

const VIEWPORT_SIZES: ViewportSize[] = ['small', 'medium', 'large'];

export type Props =
  | {
      /**
       * Hides the content above this viewport size
       */
      above: AboveViewportSize;
      /**
       * Hides the content below this viewport size
       */
      below?: BelowViewportSize;
    }
  | {
      /**
       * Hides the content above this viewport size
       */
      above?: AboveViewportSize;
      /**
       * Hides the content below this viewport size
       */
      below: BelowViewportSize;
    };

/**
 * Hidden is used to hide content from users based on their viewport size.
 */
export function Hidden({above, below, children}: PropsWithChildren<Props>) {
  const inline = useInlineFormatting();

  const Component = inline ? 'span' : 'div';

  const {
    hiddenOnSmall,
    hiddenOnMedium,
    hiddenOnLarge,
  } = getResponsiveValuesFromRange(above, below);

  const className = classNames(
    styles.Hidden,
    hiddenOnSmall && styles.hiddenOnSmall,
    hiddenOnMedium && styles.hiddenOnMedium,
    hiddenOnLarge && styles.hiddenOnLarge,
  );

  return <Component className={className}>{children}</Component>;
}

function getResponsiveValuesFromRange(
  above?: AboveViewportSize,
  below?: BelowViewportSize,
) {
  if (above === below) {
    return {
      hiddenOnSmall: true,
      hiddenOnMedium: false,
      hiddenOnLarge: true,
    };
  }

  const start = above ? VIEWPORT_SIZES.indexOf(above) + 1 : 0;
  const end = below
    ? VIEWPORT_SIZES.indexOf(below) - 1
    : VIEWPORT_SIZES.length - 1;

  const range = VIEWPORT_SIZES.slice(start, end + 1);

  const hiddenOnSmall = range.indexOf('small') >= 0;
  const hiddenOnMedium = range.indexOf('medium') >= 0;
  const hiddenOnLarge = range.indexOf('large') >= 0;

  return {hiddenOnSmall, hiddenOnMedium, hiddenOnLarge};
}
