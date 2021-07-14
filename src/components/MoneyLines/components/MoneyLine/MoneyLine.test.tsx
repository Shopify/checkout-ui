import React from 'react';
import faker from 'faker';

import {mountWithContext} from '../../../../test-utilities';
import {Text} from '../../../Text';

import {MoneyLine, MoneyLineContent, MoneyLineHeader} from './MoneyLine';

describe('<MoneyLine />', () => {
  it('renders a label', () => {
    const label = faker.random.word();
    const moneyLine = mountWithContext(<MoneyLine label={label} />);

    expect(moneyLine.find(MoneyLineHeader)).toContainReactComponent(Text, {
      children: label,
    });
  });

  it('renders a value', () => {
    const value = faker.random.word();
    const moneyLine = mountWithContext(
      <MoneyLine label="label" value={value} />,
    );

    expect(moneyLine.find(MoneyLineContent)).toContainReactComponent(Text, {
      children: value,
    });
  });

  it('renders a subdued value', () => {
    const value = faker.random.word();
    const moneyLine = mountWithContext(
      <MoneyLine label="label" value={value} subdued />,
    );

    expect(moneyLine.find(MoneyLineContent)).toContainReactComponent(Text, {
      subdued: true,
      children: value,
    });
  });

  it('renders the children', () => {
    const moneyLine = mountWithContext(
      <MoneyLine>
        <MoneyLineHeader />
        <MoneyLineContent />
      </MoneyLine>,
    );

    expect(moneyLine).toContainReactComponent(MoneyLineHeader);
    expect(moneyLine).toContainReactComponent(MoneyLineContent);
  });

  describe('<MoneyLineHeader />', () => {
    it('renders the children', () => {
      const children = 'children';
      const moneyLine = mountWithContext(
        <MoneyLine>
          <MoneyLineHeader>{children}</MoneyLineHeader>
        </MoneyLine>,
      );

      expect(moneyLine.find(MoneyLineHeader)).toContainReactText(children);
    });
  });

  describe('<MoneyLineContent />', () => {
    it('renders the children', () => {
      const children = 'children';
      const moneyLine = mountWithContext(
        <MoneyLine>
          <MoneyLineContent>{children}</MoneyLineContent>
        </MoneyLine>,
      );

      expect(moneyLine.find(MoneyLineContent)).toContainReactText(children);
    });
  });
});
