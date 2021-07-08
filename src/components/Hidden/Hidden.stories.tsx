import React from 'react';

import {Divider} from '../Divider';
import {TextContainer} from '../TextContainer';
import {TextBlock} from '../TextBlock';
import {Text} from '../Text';

import {Hidden} from './Hidden';

const meta = {
  component: Hidden,
  title: 'checkout-web-ui/Hidden',
};

export default meta;

export const above = () => (
  <TextContainer>
    <TextBlock>
      The next sentence is <Text emphasized>hidden above the small</Text>{' '}
      breakpoint.
    </TextBlock>
    <Hidden above="small">
      <TextBlock>
        Select the address that matches your card or payment method.
      </TextBlock>
    </Hidden>
  </TextContainer>
);

export const below = () => (
  <TextContainer>
    <TextBlock>
      The next sentence is <Text emphasized>hidden below the large</Text>{' '}
      breakpoint.
    </TextBlock>
    <Hidden below="large">
      <TextBlock>
        Select the address that matches your card or payment method.
      </TextBlock>
    </Hidden>
  </TextContainer>
);

export const aboveBelowCombined = () => (
  <TextContainer>
    <TextBlock>
      The next sentence is{' '}
      <Text emphasized>hidden between small and large</Text> breakpoints.
    </TextBlock>
    <Hidden above="small" below="large">
      <TextBlock>
        Select the address that matches your card or payment method.
      </TextBlock>
    </Hidden>
    <Divider />
    <TextBlock>
      The next sentence is{' '}
      <Text emphasized>hidden below medium and above medium</Text> breakpoints.
    </TextBlock>
    <Hidden above="medium" below="medium">
      <TextBlock>
        Select the address that matches your card or payment method.
      </TextBlock>
    </Hidden>
  </TextContainer>
);

export const inlineContext = () => (
  <TextContainer>
    <TextBlock>
      In the next sentence, the customer’s name is{' '}
      <Text emphasized>hidden below small</Text> breakpoint.
    </TextBlock>
    <TextBlock>
      Hi<Hidden below="medium"> Jean-Frederic</Hidden>,
    </TextBlock>
  </TextContainer>
);
