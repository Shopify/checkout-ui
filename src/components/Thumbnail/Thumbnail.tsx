import React from 'react';
import {classNames, variationName} from '@shopify/css-utilities';

import styles from './Thumbnail.css';

export interface Props {
  description: string;
  source: string;
  border?: 'none' | 'full';
  badge?: string | number;
  badgeBackground?: 'primary' | 'subdued';
}

export function Thumbnail({
  description,
  border = 'full',
  source,
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
      <img className={styles.Image} src={source} alt={description} />
    </div>
  );
}
