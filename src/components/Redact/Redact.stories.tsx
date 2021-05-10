import React from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {themeWithKnobs} from '../../storybook-utilities';
import {TextContainer} from '../TextContainer';

import {Redact} from './Redact';

const meta = {
  component: Redact,
  title: 'checkout-web-ui/Redact',
  decorators: [withKnobs, themeWithKnobs()],
};

export default meta;

export const OneLine = () => <Redact />;

export const ThreeLines = () => (
  <TextContainer>
    <Redact lines={3} />
  </TextContainer>
);

export const CustomInlineSizes = () => (
  <TextContainer>
    <Redact lines={3} inlineSizes={[0.9, 0.5, 0.2]} />
  </TextContainer>
);

export const MultipleBlockSizes = () => (
  <TextContainer spacing="loose">
    <TextContainer>
      <Redact lines={3} blockSize="extraSmall" />
    </TextContainer>
    <TextContainer>
      <Redact lines={3} blockSize="small" />
    </TextContainer>
    <TextContainer>
      <Redact lines={3} blockSize="medium" />
    </TextContainer>
    <TextContainer>
      <Redact lines={3} blockSize="large" />
    </TextContainer>
    <TextContainer>
      <Redact lines={3} blockSize="extraLarge" />
    </TextContainer>
  </TextContainer>
);
