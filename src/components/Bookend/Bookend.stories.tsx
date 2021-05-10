import React from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {TextField} from '../TextField';
import {Button} from '../Button';
import {themeWithKnobs} from '../../storybook-utilities';
import {Thumbnail} from '../Thumbnail';

import {Bookend} from './Bookend';

const meta = {
  component: Bookend,
  title: 'checkout-web-ui/Bookend',
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
    <Thumbnail description="Placeholder image" />
    <TextField label="Name" />
  </Bookend>
);

export const both = () => (
  <Bookend leading trailing>
    <Thumbnail description="Placeholder image" />
    <TextField label="Name" />
    <Button>Hello, world!</Button>
  </Bookend>
);
