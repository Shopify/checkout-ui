import React from 'react';
import {classNames, variationName} from '@shopify/css-utilities';

import styles from './Thumbnail.css';
import {placeholder} from './images';

export interface Props {
  description: string;
  source?: string;
  /**
   * A list of source sizes for responsive images, used in [srcset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/srcset).
   * e.g., ["https://example.org/foo_100x100.jpg", "https://example.org/foo_200x200.jpg 2x"]
   */
  sources?: string[];
  border?: 'none' | 'full';
  badge?: string | number;
  badgeBackground?: 'primary' | 'subdued';
}

export function Thumbnail({
  description,
  border = 'full',
  source,
  sources,
  badge,
  badgeBackground = 'subdued',
}: Props) {
  return (
    <div
      className={classNames(
        styles.Thumbnail,
        border && styles[variationName('border', border)],
      )}
    >
      {badge != null && (
        <span
          className={classNames(
            styles.Badge,
            styles[variationName('Badge-background', badgeBackground)],
          )}
          aria-hidden
        >
          {badge}
        </span>
      )}
      <img
        className={styles.Image}
        srcSet={sources?.join(', ')}
        src={source ?? placeholder}
        alt={description}
      />
    </div>
  );
}
