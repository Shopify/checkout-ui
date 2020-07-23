import React from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {themeWithKnobs} from '../../storybook-utilities';
import {Text} from '../Text';
import {BlockStack} from '../BlockStack';

import {Checkbox} from './Checkbox';

const meta = {
  component: Checkbox,
  title: 'Checkbox',
  decorators: [withKnobs, themeWithKnobs('checkbox')],
};

export default meta;

const defaultProps = {
  children: 'Save this information for next time',
};

export const defaultState = () => (
  <BlockStack>
    <Checkbox id="checkbox1" name="checkboxchoices">
      Save this information for next time
    </Checkbox>
    <div style={{width: '200px'}}>
      <Checkbox id="checkbox2" name="checkboxchoices">
        Multi-line label Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Facere, dolores aut harum accusantium nihil excepturi nemo iusto
        dolore impedit officia est consectetur sint neque voluptatibus? Amet ut
        excepturi culpa? Mollitia?
      </Checkbox>
    </div>
    <Checkbox id="checkbox3" name="checkboxchoices">
      <Text emphasized>Lorem ipsum dolor sit amet</Text>
      <Text>consectetur adipisicing elit</Text>
    </Checkbox>
  </BlockStack>
);

export const withAccessibilityLabel = () => (
  <Checkbox
    {...defaultProps}
    accessibilityLabel="This is a description for screen readers"
  />
);

export const withError = () => (
  <Checkbox {...defaultProps} error="This is an error" />
);

export const disabledAndChecked = () => (
  <BlockStack>
    <Checkbox {...defaultProps} disabled />
    <Checkbox {...defaultProps} checked disabled />
  </BlockStack>
);
