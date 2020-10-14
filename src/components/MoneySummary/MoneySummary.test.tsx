import React from 'react';
import faker from 'faker';

import {mountWithContext} from '../../test-utilities';

import {MoneySummary, Props} from './MoneySummary';

const defaultProps: Props = {
  label: faker.random.word(),
  value: faker.finance.amount(),
  prefix: faker.finance.currencyCode(),
};

describe('<MoneySummary />', () => {
  it('renders a label', () => {
    const label = faker.random.word();
    const moneySummary = mountWithContext(
      <MoneySummary {...defaultProps} label={label} />,
    );

    expect(moneySummary).toContainReactText(label);
  });

  it('renders a prefix', () => {
    const prefix = faker.random.word();
    const moneySummary = mountWithContext(
      <MoneySummary {...defaultProps} prefix={prefix} />,
    );

    expect(moneySummary).toContainReactText(prefix);
  });

  it('renders a value', () => {
    const value = faker.random.word();
    const moneySummary = mountWithContext(
      <MoneySummary {...defaultProps} value={value} />,
    );

    expect(moneySummary).toContainReactText(value);
  });

  it('renders children', () => {
    const children = faker.random.word();
    const moneySummary = mountWithContext(
      <MoneySummary {...defaultProps}>{children}</MoneySummary>,
    );

    expect(moneySummary).toContainReactText(children);
  });
});
