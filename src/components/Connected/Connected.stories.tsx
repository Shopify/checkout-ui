import React from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {BlockStack} from '../BlockStack';
import {TextField} from '../TextField';
import {Button} from '../Button';
import {themeWithKnobs} from '../../storybook-utilities';

import {Connected} from './Connected';

const meta = {
  component: Connected,
  title: 'checkout-web-ui/Connected',
  decorators: [withKnobs, themeWithKnobs('textFields')],
};

export default meta;

export const trailing = () => (
  <BlockStack>
    <Connected trailing="auto">
      <TextField label="Name" />
      <Button>Hello, world!</Button>
    </Connected>
    <Connected trailing="auto">
      <TextField label="First name" />
      <TextField label="Last name" />
      <Button>Hello, world!</Button>
    </Connected>
  </BlockStack>
);

export const leading = () => (
  <Connected leading="auto">
    <Button>Hello, world!</Button>
    <TextField label="Name" />
  </Connected>
);

export const both = () => (
  <Connected leading="auto" trailing="auto">
    <TextField label="Name" />
    <Button>Hello, world!</Button>
  </Connected>
);

export const stack = () => (
  <Connected stack>
    <TextField label="Name" />
    <Button>Hello, world!</Button>
  </Connected>
);

export const responsive = () => (
  <Connected stack={{base: true, medium: false}} spacing="extraLoose">
    <TextField label="Name" />
    <Button>Hello, world!</Button>
  </Connected>
);
