import React from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {themeWithKnobs} from '../../storybook-utilities';
import {MoneyLines} from '../MoneyLines';

import {MoneyLine} from './MoneyLine';

const meta = {
  component: MoneyLine,
  title: 'checkout-web-ui/MoneyLine',
  decorators: [
    (story: () => JSX.Element) => (
      <MoneyLines title="Cost summary">{story()}</MoneyLines>
    ),
    withKnobs,
    themeWithKnobs('headingLevel1'),
  ],
};

export default meta;

export const withChildren = () => (
  <MoneyLine label="Discount" value="$10">
    SPRINGSALE10
  </MoneyLine>
);

export const withSubduedLabel = () => (
  <MoneyLine label="Shipping" value="Calculated at next step" subdued />
);
