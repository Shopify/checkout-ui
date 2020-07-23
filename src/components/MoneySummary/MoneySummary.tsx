import React from 'react';

import {InlineStack} from '../InlineStack';
import {Bookend} from '../Bookend';
import {Text} from '../Text';

export interface Props {
  label: string;
  value: string;
  prefix: string;
}

export function MoneySummary({label, value, prefix}: Props) {
  return (
    <div role="row">
      <Bookend trailing alignment="center">
        <div role="rowheader">
          <Text size="medium">{label}</Text>
        </div>
        <div role="cell">
          <InlineStack alignment="baseline" spacing="tight">
            {/* TODO:
            - change API so its clearer that the prefix is a currency
            - add a title for abbr (CAD -> Canadian Dollars) */}
            <Text role={{type: 'abbreviation'}} size="small" subdued>
              {prefix}
            </Text>
            <Text emphasized size="xlarge">
              {value}
            </Text>
          </InlineStack>
        </div>
      </Bookend>
    </div>
  );
}
