import React from 'react';
import {mount} from '@quilted/react-testing/dom';
import faker from 'faker';

import {MoneySummary, Props} from './MoneySummary';

const defaultProps: Props = {
  label: faker.random.word(),
  value: faker.finance.amount(),
  prefix: faker.finance.currencyCode(),
};

describe('<MoneySummary />', () => {
  it('renders a label', () => {
    const label = faker.random.word();
    const moneySummary = mount(
      <MoneySummary {...defaultProps} label={label} />,
    );

    expect(moneySummary).toContainReactText(label);
  });

  it('renders a prefix', () => {
    const prefix = faker.random.word();
    const moneySummary = mount(
      <MoneySummary {...defaultProps} prefix={prefix} />,
    );

    expect(moneySummary).toContainReactText(prefix);
  });

  it('renders a value', () => {
    const value = faker.random.word();
    const moneySummary = mount(
      <MoneySummary {...defaultProps} value={value} />,
    );

    expect(moneySummary).toContainReactText(value);
  });
});
