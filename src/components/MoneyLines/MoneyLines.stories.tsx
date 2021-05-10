import React from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {themeWithKnobs} from '../../storybook-utilities';
import {MoneyLine} from '../MoneyLine';
import {MoneySummary} from '../MoneySummary';

import {MoneyLines} from './MoneyLines';

const meta = {
  component: MoneyLines,
  title: 'checkout-web-ui/MoneyLines',
  decorators: [withKnobs, themeWithKnobs('headingLevel1')],
};

export default meta;

export const basic = () => (
  <MoneyLines title="Cost summary">
    <MoneyLine label="Subtotal" value="$3,300.00" />
    <MoneyLine label="Shipping" value="Free" />
    <MoneyLine label="Taxes" value="$429.00" />
    <MoneyLine label="Discount" value="$10.00">
      10OFF
    </MoneyLine>
    <MoneySummary label="Total" value="$3,719.00" prefix="CAD" />
  </MoneyLines>
);
