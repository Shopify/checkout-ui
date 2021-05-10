import React from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {themeWithKnobs} from '../../storybook-utilities';

import {Button as ButtonComponent, Props} from './Button';

const meta = {
  component: ButtonComponent,
  title: 'checkout-web-ui/Button',
  decorators: [withKnobs, themeWithKnobs('primaryButton', 'secondaryButton')],
  argTypes: {
    appearance: {
      control: {
        type: 'select',
        options: [undefined, 'inheritColor'],
      },
    },
  },
};

export default meta;

export const Button = (args: Props) => (
  <ButtonComponent {...args}>Button</ButtonComponent>
);

Button.args = {
  secondary: false,
  disabled: false,
  to: 'javascript:;',
  subdued: false,
  plain: false,
  loading: false,
  loadingLabel: 'Processing…',
  fill: false,
  tertiary: false,
  underline: false,
  appearance: undefined,
  accessibilityLabel: '',
};
