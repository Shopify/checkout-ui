import React from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {themeWithKnobs} from '../../storybook-utilities';

import {MoneyLines} from './MoneyLines';

const meta = {
  component: MoneyLines,
  title: 'MoneyLines',
  decorators: [withKnobs, themeWithKnobs('headingLevel1')],
};

export default meta;

export const basic = () => (
  <MoneyLines title="Cost summary">MoneyLine</MoneyLines>
);
