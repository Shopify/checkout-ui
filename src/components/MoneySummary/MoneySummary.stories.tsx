import React from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {themeWithKnobs} from '../../storybook-utilities';
import {MoneyLines} from '../MoneyLines';

import {MoneySummary} from './MoneySummary';

const meta = {
  component: MoneySummary,
  title: 'checkout-web-ui/MoneySummary',
  decorators: [
    (story: () => JSX.Element) => (
      <MoneyLines title="Cost summary">{story()}</MoneyLines>
    ),
    withKnobs,
    themeWithKnobs('headingLevel1'),
  ],
};

export default meta;

export const basic = () => (
  <MoneySummary label="Total" value="$10" prefix="CAD" />
);
