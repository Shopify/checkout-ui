import React from 'react';
import {classNames, variationName} from '@shopify/css-utilities';
import {ImageProps} from '@shopify/checkout-ui-extensions';

import {useThemeConfiguration} from '../Theme';
import {Icon} from '../Icon';

import styles from './Thumbnail.css';

type Size = 'small' | 'base';
type Source = Exclude<
  Required<Required<ImageProps>['sources']>['base'],
  string | any[]
>;

export interface Props {
  badge?: string | number;
  description: string;
  source?: string;
  sources?: Source[];
  size?: Size;
}

export function Thumbnail({
  badge,
  description,
  source,
  sources,
  size = 'base',
}: Props) {
  const {
    thumbnail: {aspectRatio, border = 'full', badgeBackground = 'subdued'},
  } = useThemeConfiguration();

  return (
    <div
      className={classNames(
        styles.Thumbnail,
        styles[variationName('size', size)],
        border && styles[variationName('border', border)],
        aspectRatio && aspectRatio < 1 && styles.aspectRatioLandscape,
        aspectRatio && aspectRatio > 1 && styles.aspectRatioPortrait,
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
      {source ? (
        <img
          className={styles.Image}
          srcSet={toSrcSet(sources)}
          src={source}
          alt={description}
        />
      ) : (
        <span className={classNames(styles.Placeholder)}>
          <span className={styles.Icon}>
            <Icon source="camera" />
          </span>
        </span>
      )}
    </div>
  );
}

function toSrcSet(sources?: Source[]) {
  if (!sources) {
    return '';
  }

  return sources
    .map(({source, resolution}) => {
      if (resolution) {
        return `${source} ${resolution}x`;
      }

      return source;
    })
    .join(', ');
}
