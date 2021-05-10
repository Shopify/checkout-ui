import React, {PropsWithChildren} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';
import {ImageProps} from '@shopify/argo-checkout';

import {View} from '../View';

import styles from './Image.css';

interface SourceProps {
  media?: string;
  srcSet: string;
}

type ViewportSize = Required<
  Required<ImageProps>['sources'][0]
>['viewportSize'];

export const MEDIA_MAP: Map<ViewportSize, string> = new Map([
  ['small', '(max-width: 600px)'],
  ['medium', '(max-width: 1200px)'],
  ['large', '(min-width: 1201px)'],
]);

export function Image({
  source,
  sources,
  description = '',
  fit,
  bordered,
  loading,
  aspectRatio,
  decorative,
}: ImageProps) {
  const initialValue: SourceProps[] = [];

  const sourcesMarkup =
    sources &&
    sources
      .reduce((sourcesProps, {source, viewportSize, resolution}) => {
        const media = viewportSize && MEDIA_MAP.get(viewportSize);
        const maybeSourceProps = sourcesProps.find(
          ({media: mediaValue}) => media === mediaValue,
        );
        const srcSet = [source, resolution && `${resolution}x`]
          .join(' ')
          .trim();

        if (maybeSourceProps) {
          maybeSourceProps.srcSet += `, ${srcSet}`;
          return sourcesProps;
        } else {
          return [...sourcesProps, {media, srcSet}];
        }
      }, initialValue)
      // eslint-disable-next-line react/jsx-key
      .map((props) => <source {...props} />);

  const className = classNames(
    styles.Image,
    bordered && styles.bordered,
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
