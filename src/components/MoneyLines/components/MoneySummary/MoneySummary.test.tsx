import React from 'react';
import faker from 'faker';

import {mountWithContext} from '../../../../test-utilities';
import {Text} from '../../../Text';

import {
  MoneySummary,
  MoneySummaryContent,
  MoneySummaryHeader,
} from './MoneySummary';

describe('<MoneySummary />', () => {
  it('renders a label', () => {
    const label = faker.random.word();
    const moneySummary = mountWithContext(
      <MoneySummary label={label} prefix="prefix" value="value" />,
    );

    expect(moneySummary.find(MoneySummaryHeader)).toContainReactComponent(
      Text,
      {
        children: label,
      },
    );
  });

  it('renders a prefix', () => {
    const prefix = faker.random.word();
    const moneySummary = mountWithContext(
      <MoneySummary label="label" prefix={prefix} value="value" />,
    );

    expect(moneySummary.find(MoneySummaryContent)).toContainReactComponent(
      Text,
      {
        children: prefix,
      },
    );
  });

  it('renders a value', () => {
    const value = faker.random.word();
    const moneySummary = mountWithContext(
      <MoneySummary label="label" prefix="prefix" value={value} />,
    );

    expect(moneySummary.find(MoneySummaryContent)).toContainReactComponent(
      Text,
      {
        children: value,
      },
    );
  });

  it('renders the children', () => {
    const moneySummary = mountWithContext(
      <MoneySummary>
        <MoneySummaryHeader />
        <MoneySummaryContent />
      </MoneySummary>,
    );

    expect(moneySummary).toContainReactComponent(MoneySummaryHeader);
    expect(moneySummary).toContainReactComponent(MoneySummaryContent);
  });

  describe('<MoneySummaryHeader />', () => {
    it('renders the children', () => {
      const children = 'children';
      const moneySummary = mountWithContext(
        <MoneySummary label="label" prefix="prefix" value="value">
          <MoneySummaryHeader>{children}</MoneySummaryHeader>
        </MoneySummary>,
      );

      expect(moneySummary.find(MoneySummaryHeader)).toContainReactText(
        children,
      );
    });
  });

  describe('<MoneySummaryContent />', () => {
    it('renders the children', () => {
      const children = 'children';
      const moneySummary = mountWithContext(
        <MoneySummary label="label" prefix="prefix" value="value">
          <MoneySummaryContent>{children}</MoneySummaryContent>
        </MoneySummary>,
      );

      expect(moneySummary.find(MoneySummaryContent)).toContainReactText(
        children,
      );
    });
  });
});
