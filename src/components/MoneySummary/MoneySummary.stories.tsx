import React from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {themeWithKnobs} from '../../storybook-utilities';

import {MoneySummary} from './MoneySummary';

const meta = {
  component: MoneySummary,
  title: 'MoneySummary',
  decorators: [withKnobs, themeWithKnobs('headingLevel1')],
};

export default meta;

export const basic = () => (
  <MoneySummary label="Total" value="$10" prefix="CAD" />
);
