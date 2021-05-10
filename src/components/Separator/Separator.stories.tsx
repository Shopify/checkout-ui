import React from 'react';

import {BlockStack} from '../BlockStack';
import {InlineStack} from '../InlineStack';
import {Text} from '../Text';

import {Separator} from './Separator';

const meta = {
  component: Separator,
  title: 'checkout-web-ui/Separator',
};

export default meta;

function Content() {
  return <Text>Hello, world!</Text>;
}

export const defaultState = () => (
  <BlockStack>
    <Content />
    <Separator />
    <Content />
  </BlockStack>
);

export const vertical = () => (
  <InlineStack>
    <Content />
    <Separator direction="vertical" />
    <Content />
  </InlineStack>
);

export const width = () => (
  <BlockStack>
    <Content />
    <Separator />
    <Content />
    <Separator width="medium" />
    <Content />
    <Separator width="thick" />
    <Content />
    <Separator width="extraThick" />
    <InlineStack>
      <Content />
      <Separator direction="vertical" />
      <Content />
      <Separator direction="vertical" width="medium" />
      <Content />
      <Separator direction="vertical" width="thick" />
      <Content />
      <Separator direction="vertical" width="extraThick" />
      <Content />
    </InlineStack>
  </BlockStack>
);
