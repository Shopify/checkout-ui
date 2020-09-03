import React from 'react';
import faker from 'faker';

import {mountWithContext} from '../../test-utilities';
import {Text} from '../Text';

import {MoneyLine, Props} from './MoneyLine';

const defaultProps: Props = {
  label: faker.random.word(),
  value: faker.random.number().toString(),
};

describe('<MoneyLine />', () => {
  it('renders a label', () => {
    const label = faker.random.word();
    const moneyLine = mountWithContext(
      <MoneyLine {...defaultProps} label={label} />,
    );

    expect(moneyLine).toContainReactText(label);
  });

  it('renders a value', () => {
    const value = faker.random.number().toString();
    const moneyLine = mountWithContext(
      <MoneyLine {...defaultProps} value={value} />,
    );

    expect(moneyLine).toContainReactText(value);
  });

  it('renders a subdued value if subdued', () => {
    const value = faker.random.number().toString();
    const moneyLine = mountWithContext(
      <MoneyLine {...defaultProps} value={value} subdued />,
    );

    expect(moneyLine).toContainReactComponent(Text, {
      subdued: true,
      children: value,
    });
  });

  it('renders its children', () => {
    function Child() {
      return <div />;
    }

    const moneyLine = mountWithContext(
      <MoneyLine {...defaultProps}>
        <Child />
      </MoneyLine>,
    );

    expect(moneyLine).toContainReactComponent(Child);
  });
});
