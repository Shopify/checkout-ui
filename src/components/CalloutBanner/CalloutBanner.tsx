import React, {PropsWithChildren} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';
import {CalloutBannerProps} from '@shopify/argo-checkout';

import {Heading} from '../Heading';
import {HeadingGroup} from '../HeadingGroup';
import {TextContainer} from '../TextContainer';
import {View} from '../View';

import styles from './CalloutBanner.css';

export function CalloutBanner({
  title,
  children,
  border = 'block',
  background = 'secondary',
  alignment = 'center',
  spacing = 'tight',
}: PropsWithChildren<CalloutBannerProps>) {
  const titleMarkup = title && <Heading level={3}>{title}</Heading>;

  return (
    <div
      className={classNames(
        styles.CalloutBanner,
        border && styles[variationName('border', border)],
        background && styles[variationName('background', background)],
      )}
      role="status"
      aria-atomic="true"
      aria-live="polite"
    >
      <TextContainer
        alignment={alignment === 'leading' ? undefined : alignment}
        spacing={spacing}
      >
        <HeadingGroup>
          {titleMarkup}
          <View>{children}</View>
        </HeadingGroup>
      </TextContainer>
    </div>
  );
}
