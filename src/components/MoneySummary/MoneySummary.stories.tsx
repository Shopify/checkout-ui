import React from 'react';

import {MoneySummary} from './MoneySummary';

const meta = {
  component: MoneySummary,
  title: 'MoneySummary',
};

export default meta;

export const basic = () => (
  <MoneySummary label="Total" value="$10" prefix="CAD" />
);
