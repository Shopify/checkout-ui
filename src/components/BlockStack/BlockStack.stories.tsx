import React from 'react';

import {InlineStack} from '../InlineStack';

import {BlockStack} from './BlockStack';

const meta = {
  component: BlockStack,
  title: 'BlockStack',
};

export default meta;

function Content() {
  return <div style={{backgroundColor: 'lightgrey'}}>Content block</div>;
}

export const spacing = () => (
  <InlineStack>
    <BlockStack spacing="xtight">
      <Content />
      <Content />
      <Content />
      <Content />
    </BlockStack>

    <BlockStack spacing="tight">
      <Content />
      <Content />
      <Content />
      <Content />
    </BlockStack>

    <BlockStack>
      <Content />
      <Content />
      <Content />
      <Content />
    </BlockStack>

    <BlockStack spacing="loose">
      <Content />
      <Content />
      <Content />
      <Content />
    </BlockStack>

    <BlockStack spacing="xloose">
      <Content />
      <Content />
      <Content />
      <Content />
    </BlockStack>
  </InlineStack>
);

export const alignment = () => (
  <>
    <BlockStack alignment="leading">
      <Content />
    </BlockStack>
    <BlockStack alignment="center">
      <Content />
    </BlockStack>
    <BlockStack alignment="trailing">
      <Content />
    </BlockStack>
  </>
);

export const nested = () => (
  <>
    <BlockStack spacing="xtight">
      <Content />
      <Content />
      <BlockStack spacing="tight">
        <Content />
        <Content />
        <BlockStack>
          <Content />
          <Content />
          <BlockStack spacing="loose">
            <Content />
            <Content />
            <BlockStack spacing="xloose">
              <Content />
              <Content />
              <Content />
              <Content />
            </BlockStack>
            <Content />
            <Content />
          </BlockStack>
          <Content />
          <Content />
        </BlockStack>
        <Content />
        <Content />
      </BlockStack>
      <Content />
      <Content />
    </BlockStack>
  </>
);
