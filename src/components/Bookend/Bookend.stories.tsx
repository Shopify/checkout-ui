import React from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {TextField} from '../TextField';
import {Button} from '../Button';
import {themeWithKnobs} from '../../storybook-utilities';
import {Thumbnail} from '../Thumbnail';

import {Bookend} from './Bookend';

const meta = {
  component: Bookend,
  title: 'Bookend',
  decorators: [withKnobs, themeWithKnobs('textFields')],
};

export default meta;

export const trailing = () => (
  <Bookend trailing>
    <TextField label="Name" />
    <Button>Hello, world!</Button>
  </Bookend>
);

export const leading = () => (
  <Bookend leading>
    <Thumbnail
      description="Placeholder image"
      source="//cdn.shopify.com/s/assets/checkout/product-blank-98d4187c2152136e9fb0587a99dfcce6f6873f3a9f21ea9135ed7f495296090f.png"
    />
    <TextField label="Name" />
  </Bookend>
);

export const both = () => (
  <Bookend leading trailing>
    <Thumbnail
      description="Placeholder image"
      source="//cdn.shopify.com/s/assets/checkout/product-blank-98d4187c2152136e9fb0587a99dfcce6f6873f3a9f21ea9135ed7f495296090f.png"
    />
    <TextField label="Name" />
    <Button>Hello, world!</Button>
  </Bookend>
);
