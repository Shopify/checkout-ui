import React from 'react';
import {withKnobs} from '@storybook/addon-knobs';
import {Story} from '@storybook/preact/types-6-0';

import {themeWithKnobs} from '../../storybook-utilities';
import {BlockStack} from '../BlockStack';
import {InlineStack} from '../InlineStack';

import {ChoiceList, Choice, ChoiceListProps} from './ChoiceList';

const meta = {
  component: ChoiceList,
  subcomponents: {Choice},
  title: 'checkout-web-ui/ChoiceList',
  decorators: [withKnobs, themeWithKnobs()],
  args: {
    name: 'Choice',
    value: 'first',
  },
};

export default meta;

const Template: Story<ChoiceListProps<any>> = (args) => (
  <ChoiceList {...args} />
);

export const SingleValue = Template.bind({});
SingleValue.args = {
  children: (
    <BlockStack>
      <Choice id="first">First choice</Choice>
      <Choice id="second">Second choice</Choice>
    </BlockStack>
  ),
};

export const MultipleValues = Template.bind({});
MultipleValues.args = {
  children: (
    <BlockStack>
      <Choice id="first">First choice</Choice>
      <Choice id="second">Second choice</Choice>
    </BlockStack>
  ),
  value: ['first'],
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: (
    <BlockStack>
      <Choice id="first" disabled>
        First choice
      </Choice>
      <Choice id="second">Second choice</Choice>
    </BlockStack>
  ),
};

export const WithAccessibilityLabel = Template.bind({});
WithAccessibilityLabel.args = {
  children: (
    <BlockStack>
      <Choice
        id="first"
        accessibilityLabel="This is a description for screen readers"
      >
        First choice
      </Choice>
      <Choice id="second">Second choice</Choice>
    </BlockStack>
  ),
};

export const Inline = Template.bind({});
Inline.args = {
  children: (
    <InlineStack>
      <Choice id="first">First choice</Choice>
      <Choice id="second">Second choice</Choice>
    </InlineStack>
  ),
};
