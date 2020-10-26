import React from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {themeWithKnobs} from '../../storybook-utilities';
import {BlockStack} from '../BlockStack';
import {Text} from '../Text';

import {Banner} from './Banner';

const meta = {
  component: Banner,
  title: 'Banner',
  decorators: [withKnobs, themeWithKnobs('banner', 'headingLevel3')],
};

export default meta;

export const allBanners = () => (
  <BlockStack>
    <Banner title="This is an informative message" />
    <Banner status="success" title="This is a success message" />
    <Banner status="warning" title="This is a warning message" />
    <Banner status="critical" title="This is an error message" />
  </BlockStack>
);

export const withContent = () => (
  <BlockStack>
    <Banner title="This is an informative message">
      <Text>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores
        commodi, vitae explicabo, laudantium consequatur eaque dignissimos
        dolorem optio minus porro nesciunt magni reprehenderit accusamus quasi
        sit architecto sequi nihil.
      </Text>
    </Banner>
  </BlockStack>
);

export const withoutIcon = () => (
  <Banner title="Your order was updated on March 19, 2020" iconHidden />
);

export const collapsible = () => (
  <Banner title="Your order was updated on March 19, 2020" collapsible>
    <Text>Here are some details.</Text>
  </Banner>
);

export const autofocus = () => (
  <Banner autofocus title="Your order was updated on March 19, 2020">
    <Text>Here are some details.</Text>
  </Banner>
);
