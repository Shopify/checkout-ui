import React from 'react';

import {MoneyLines} from './MoneyLines';

const meta = {
  component: MoneyLines,
  title: 'MoneyLines',
};

export default meta;

export const basic = () => (
  <MoneyLines title="Cost summary">MoneyLine</MoneyLines>
);
