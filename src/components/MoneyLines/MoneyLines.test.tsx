import React from 'react';

import {faker, mountWithContext} from '../../test-utilities';
import {Heading} from '../Heading';
import {View} from '../View';

import {MoneyLine, MoneySummary} from './components';
import {MoneyLines} from './MoneyLines';

describe('<MoneyLines />', () => {
  it('renders the children', () => {
    const moneyLines = mountWithContext(
      <MoneyLines title="title">
        <MoneyLine />
        <MoneySummary />
      </MoneyLines>,
    );

    expect(moneyLines).toContainReactComponent(MoneyLine);
    expect(moneyLines).toContainReactComponent(MoneySummary);
  });

  it('renders the title', () => {
    const title = faker.random.word();
    const moneyLines = mountWithContext(<MoneyLines title={title} />);

    expect(moneyLines).toContainReactComponent(Heading, {
      children: title,
    });
  });

  it('renders a visually hidden title', () => {
    const title = faker.random.word();
    const moneyLines = mountWithContext(
      <MoneyLines title={title} titleHidden />,
    );

    expect(moneyLines.find(View)).toContainReactComponent(Heading, {
      children: title,
    });
  });
});
