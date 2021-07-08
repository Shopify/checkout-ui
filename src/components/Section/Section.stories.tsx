import React from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {BlockStack} from '../BlockStack';
import {Heading} from '../Heading';
import {View} from '../View';
import {themeWithKnobs} from '../../storybook-utilities';

import {Section} from './Section';

const meta = {
  component: Section,
  title: 'checkout-web-ui/Section',
  decorators: [withKnobs, themeWithKnobs()],
};

export default meta;

export const basic = () => (
  <Section>
    <BlockStack>
      <Heading>Contact information</Heading>
      <View>Section content</View>
    </BlockStack>
  </Section>
);

export const nested = () => (
  <Section border="base" padding="base">
    <BlockStack>
      <Heading>Section</Heading>
      <View>Section content</View>
      <Section border="base" padding="base">
        <BlockStack>
          <Heading>Nested Section</Heading>
          <View>Nested Section content</View>
        </BlockStack>
      </Section>
      <Section accessibilityLabel="Label" border="base" padding="base">
        <View>With accessibilityLabel</View>
      </Section>
    </BlockStack>
  </Section>
);
