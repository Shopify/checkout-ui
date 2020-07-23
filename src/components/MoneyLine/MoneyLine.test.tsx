import React from 'react';
import {mount} from '@quilted/react-testing/dom';
import faker from 'faker';

import {TextBlock} from '../TextBlock';

import {MoneyLine, Props} from './MoneyLine';

const defaultProps: Props = {
  label: faker.random.word(),
  value: faker.random.number().toString(),
};

describe('<MoneyLine />', () => {
  it('renders a label', () => {
    const label = faker.random.word();
    const moneyLine = mount(<MoneyLine {...defaultProps} label={label} />);

    expect(moneyLine).toContainReactText(label);
  });

  it('renders a value', () => {
    const value = faker.random.number().toString();
    const moneyLine = mount(<MoneyLine {...defaultProps} value={value} />);

    expect(moneyLine).toContainReactText(value);
  });

  it('renders a subdued value if subdued', () => {
    const value = faker.random.number().toString();
    const moneyLine = mount(
      <MoneyLine {...defaultProps} value={value} subdued />,
    );

    expect(moneyLine).toContainReactComponent(TextBlock, {
      subdued: true,
      children: value,
    });
  });

  it('renders its children', () => {
    function Child() {
      return <div />;
    }

    const moneyLine = mount(
      <MoneyLine {...defaultProps}>
        <Child />
      </MoneyLine>,
    );

    expect(moneyLine).toContainReactComponent(Child);
  });
});
