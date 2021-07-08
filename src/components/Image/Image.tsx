import React, {PropsWithChildren} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';
import {Breakpoint, ImageProps} from '@shopify/checkout-ui-extensions';

import {View} from '../View';
import {BREAKPOINTS, createMediaQueries} from '../../utilities/breakpoint';

import styles from './Image.css';

export const MEDIA_MAP: Map<Breakpoint, string> = new Map(
  createMediaQueries({addMaxWidth: false}).map(({breakpoint, query}) => [
    breakpoint,
    query,
  ]),
);

export function Image({
  source,
  sources,
  description = '',
  fit,
  loading,
  aspectRatio,
  decorative,
}: ImageProps) {
  const sourcesMarkup =
    sources &&
    Object.entries(sources)
      .sort(([firstBreakpoint], [secondBreakpoint]) => {
        const firstWidth = BREAKPOINTS[firstBreakpoint as Breakpoint];
        const secondWidth = BREAKPOINTS[secondBreakpoint as Breakpoint];
        if (firstWidth != null && secondWidth != null) {
          return secondWidth - firstWidth;
        }
        return 0;
      })
      .map(([viewportSize, sizeSources]) => {
        if (typeof sizeSources === 'string') {
          return [viewportSize, [{source: sizeSources}]];
        }

        if (!Array.isArray(sizeSources) && sizeSources !== undefined) {
          return [viewportSize, [sizeSources]];
        }

        return [viewportSize, sizeSources];
      })
      .map(([viewportSize, sizeSources]) => {
        const media = MEDIA_MAP.get(viewportSize as Breakpoint);
        if (media !== undefined && Array.isArray(sizeSources)) {
          const srcSet = sizeSources
            .map(({source, resolution}) =>
              [source, resolution && `${resolution}x`].join(' ').trim(),
            )
            .join(', ');
          return <source key={media} media={media} srcSet={srcSet} />;
        }
      });

  const className = classNames(
    styles.Image,
    fit && styles[variationName('fit', fit)],
  );

  return (
    <MaybeHiddenForA11y condition={decorative === true}>
      <MaybeAspectRatio
        condition={aspectRatio != null}
        aspectRatio={aspectRatio}
      >
        <MaybePicture condition={sourcesMarkup != null}>
          {sourcesMarkup}
          <img
            src={source}
            alt={description}
            className={className}
            loading={loading}
          />
        </MaybePicture>
      </MaybeAspectRatio>
    </MaybeHiddenForA11y>
  );
}

interface MaybeProps {
  condition: boolean;
}

function MaybeHiddenForA11y({
  children,
  condition,
}: PropsWithChildren<MaybeProps>) {
  return condition ? (
    <View accessibilityVisibility="hidden">{children}</View>
  ) : (
    <>{children}</>
  );
}

interface MaybeAspectRatioProps extends MaybeProps {
  aspectRatio?: number;
}

function MaybeAspectRatio({
  children,
  condition,
  aspectRatio,
}: PropsWithChildren<MaybeAspectRatioProps>) {
  return condition ? (
    <div
      className={styles.aspectRatio}
      style={{paddingBottom: `calc(100% / ${aspectRatio})`}}
    >
      {children}
    </div>
  ) : (
    <>{children}</>
  );
}

function MaybePicture({children, condition}: PropsWithChildren<MaybeProps>) {
  return condition ? <picture>{children}</picture> : <>{children}</>;
}
