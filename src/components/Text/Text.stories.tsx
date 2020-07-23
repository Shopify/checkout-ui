import React from 'react';

import {BlockStack} from '../BlockStack';

import {Text} from './Text';

const meta = {
  component: Text,
  title: 'Text',
};

export default meta;

export const defaultState = () => <Text>Default</Text>;

export const allVisualStyles = () => (
  <BlockStack>
    <Text>Default</Text>
    <Text subdued>Subdued</Text>
    <Text emphasized>Emphasized</Text>
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
    <Text size="small">Small</Text>
    <Text>Default</Text>
    <Text size="medium">Medium</Text>
    <Text size="large">Large</Text>
    <Text size="xlarge">Extra large</Text>
  </BlockStack>
);
