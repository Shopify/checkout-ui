import React from 'react';

import {BlockStack} from '../BlockStack';
import {InlineStack} from '../InlineStack';

import {Separator} from './Separator';

const meta = {
  component: Separator,
  title: 'Separator',
};

export default meta;

function Content() {
  return <span>Hello, world!</span>;
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
    <Separator width="xthick" />
    <InlineStack>
      <Content />
      <Separator direction="vertical" />
      <Content />
      <Separator direction="vertical" width="medium" />
      <Content />
      <Separator direction="vertical" width="thick" />
      <Content />
      <Separator direction="vertical" width="xthick" />
      <Content />
    </InlineStack>
  </BlockStack>
);
