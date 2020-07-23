import React from 'react';

import {MoneyLine} from './MoneyLine';

const meta = {
  component: MoneyLine,
  title: 'MoneyLine',
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
