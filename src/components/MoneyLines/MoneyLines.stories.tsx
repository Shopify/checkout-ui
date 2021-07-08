import React from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {Text} from '../Text';
import {themeWithKnobs} from '../../storybook-utilities';
import {Icon} from '../Icon';
import {InlineStack} from '../InlineStack';
import {Tooltip} from '../Tooltip';
import {Divider} from '../Divider';

import {MoneyLines} from './MoneyLines';

import {MoneyLine, MoneyLineContent, MoneyLineHeader, MoneySummary} from '.';

const meta = {
  decorators: [withKnobs, themeWithKnobs('headingLevel1')],
  component: MoneyLines,
  subComponents: {MoneyLine, MoneySummary},
  title: 'checkout-web-ui/MoneyLines',
};

export default meta;

export const basic = () => (
  <MoneyLines title="Cost summary">
    <MoneyLine label="Subtotal" value="$3,300.00" />
    <MoneyLine label="Shipping" value="Calculated at next" subdued />
    <MoneyLine>
      <MoneyLineHeader>
        <InlineStack>
          <Text>Taxes</Text>
        </InlineStack>
      </MoneyLineHeader>
      <MoneyLineContent>
        <InlineStack>
          <Text emphasized>$429.00</Text>
          <Tooltip content="Tooltip">
            <Icon
              source="questionFill"
              size="large"
              appearance="subdued"
              accessibilityLabel="Tooltip"
            />
          </Tooltip>
        </InlineStack>
      </MoneyLineContent>
    </MoneyLine>
    <MoneyLine>
      <MoneyLineHeader>
        <InlineStack>
          <Text>Discount</Text>
          <InlineStack alignment="center" spacing="extraTight">
            <Icon source="discount" size="large" />
            <Text>SPRINGSALE10</Text>
          </InlineStack>
        </InlineStack>
      </MoneyLineHeader>
      <MoneyLineContent>
        <Text emphasized>$10</Text>
      </MoneyLineContent>
    </MoneyLine>
    <Divider blockSpacing="loose" />
    <MoneySummary label="Total" value="$3,719.00" prefix="CAD" />
  </MoneyLines>
);
