import React from 'react';

import {BlockStack} from '../BlockStack';

import {Text} from './Text';

const meta = {
  component: Text,
  title: 'checkout-web-ui/Text',
};

export default meta;

export const defaultState = () => <Text>Default</Text>;

export const allVisualStyles = () => (
  <BlockStack>
    <Text>Default</Text>
    <Text subdued>Subdued</Text>
    <Text emphasized>Emphasized</Text>
    <Text appearance="accent">Accent</Text>
    <Text subdued appearance="accent">
      Subdued accent
    </Text>
    <Text emphasized appearance="accent">
      Emphasized accent
    </Text>
    <Text appearance="critical">Critical</Text>
    <Text subdued appearance="critical">
      Subdued critical
    </Text>
    <Text emphasized appearance="critical">
      Emphasized critical
    </Text>
    <Text appearance="warning">Warning</Text>
    <Text subdued appearance="warning">
      Subdued warning
    </Text>
    <Text emphasized appearance="warning">
      Emphasized warning
    </Text>
    <Text appearance="success">Success</Text>
    <Text subdued appearance="success">
      Subdued success
    </Text>
    <Text emphasized appearance="success">
      Emphasized success
    </Text>
  </BlockStack>
);

export const allStatus = () => (
  <BlockStack>
    <Text appearance="critical">Critical</Text>
    <Text appearance="warning">Warning</Text>
    <Text appearance="success">Success</Text>
  </BlockStack>
);

export const allRoles = () => (
  <BlockStack>
    <Text role="address">
      490 Rue De La Gauchetière O, Montréal, QC H2Z 0B3
    </Text>
    <Text role="deletion">$12.99</Text>
    <Text role={{type: 'directional-override', direction: 'ltr'}}>
      (514) 841-0100
    </Text>
    <Text role={{type: 'abbreviation', for: 'Gross merchandise value'}}>
      GMV
    </Text>
    <Text role={{type: 'datetime', machineReadable: '2020-05-20'}}>
      May 20th, 2020
    </Text>
  </BlockStack>
);

export const allSizes = () => (
  <BlockStack>
    <Text size="extraSmall">Extra small</Text>
    <Text size="small">Small</Text>
    <Text>Default</Text>
    <Text size="medium">Medium</Text>
    <Text size="large">Large</Text>
    <Text size="extraLarge">Extra large</Text>
  </BlockStack>
);
