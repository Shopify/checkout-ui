import React from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {themeWithKnobs} from '../../storybook-utilities';
import {Text} from '../Text';
import {BlockStack} from '../BlockStack';

import {Radio} from './Radio';

const meta = {
  component: Radio,
  title: 'Radio',
  decorators: [withKnobs, themeWithKnobs('radio')],
};

export default meta;

const defaultProps = {
  name: 'Radio',
  children: 'Save this information for next time',
};

export const defaultState = () => (
  <div style={{width: '250px'}}>
    <BlockStack>
      <Radio id="radio1" name="radiochoices">
        Save this information for next time
      </Radio>
      <Radio id="radio2" name="radiochoices">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, dolores
        aut harum accusantium nihil excepturi nemo iusto dolore impedit officia
        est consectetur sint neque voluptatibus? Amet ut excepturi culpa?
        Mollitia?
      </Radio>
      <Radio id="radio3" name="radiochoices">
        <Text emphasized>Lorem ipsum dolor sit amet</Text>
        <Text>consectetur adipisicing elit</Text>
      </Radio>
    </BlockStack>
  </div>
);

export const withAccessibilityLabel = () => (
  <Radio
    {...defaultProps}
    accessibilityLabel="This is a description for screen readers"
  />
);

export const disabledAndChecked = () => (
  <BlockStack>
    <Radio {...defaultProps} disabled />
    <Radio {...defaultProps} checked disabled />
  </BlockStack>
);
