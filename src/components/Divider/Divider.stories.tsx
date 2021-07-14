import React from 'react';
import {withKnobs} from '@storybook/addon-knobs';
import faker from 'faker';

import {themeWithKnobs} from '../../storybook-utilities';
import {BlockStack} from '../BlockStack';
import {InlineStack} from '../InlineStack';
import {Text} from '../Text';
import {View} from '../View';

import {Divider, Props} from './Divider';

const meta = {
  component: Divider,
  title: 'checkout-web-ui/Divider',
  decorators: [withKnobs, themeWithKnobs('colors')],
  argTypes: {
    width: {
      control: {
        type: 'select',
        options: [undefined, 'thin', 'medium', 'thick', 'extraThick'],
      },
    },
    blockSpacing: {
      control: {
        type: 'select',
        options: [
          undefined,
          'none',
          'extraTight',
          'tight',
          'base',
          'loose',
          'extraLoose',
        ],
      },
    },
    alignment: {
      control: {
        type: 'select',
        options: [undefined, 'start', 'center', 'end'],
      },
    },
  },
};

export default meta;

function Content() {
  return <Text>Hello, world!</Text>;
}

function ChildContent() {
  return (
    <>
      <Text subdued>Hello, </Text>
      <Text emphasized>world!</Text>
    </>
  );
}

function LoremIpsum() {
  return (
    <View border="dotted" display="block">
      <Text subdued>{faker.lorem.words(20)}</Text>
    </View>
  );
}

export const defaultState = () => (
  <BlockStack>
    <Content />
    <Divider />
    <Content />
  </BlockStack>
);

export const vertical = () => (
  <InlineStack>
    <Content />
    <Divider direction="vertical" />
    <Content />
  </InlineStack>
);

export const width = () => (
  <BlockStack>
    <Content />
    <Divider />
    <Content />
    <Divider width="medium" />
    <Content />
    <Divider width="thick" />
    <Content />
    <Divider width="extraThick" />
    <InlineStack>
      <Content />
      <Divider direction="vertical" />
      <Content />
      <Divider direction="vertical" width="medium" />
      <Content />
      <Divider direction="vertical" width="thick" />
      <Content />
      <Divider direction="vertical" width="extraThick" />
      <Content />
    </InlineStack>
  </BlockStack>
);

export const blockSpacing = () => (
  <>
    <View display="block" border="dotted" padding="loose">
      <Content />
      <Divider blockSpacing="none" />
      <Content />
      <Divider blockSpacing="extraTight" />
      <Content />
      <Divider blockSpacing="tight" />
      <Content />
      <Divider blockSpacing="base" />
      <Content />
      <Divider blockSpacing="loose" />
      <Content />
      <Divider blockSpacing="extraLoose" />
      <Content />
    </View>
    <br />
    <View display="block" border="dotted" padding="loose">
      <InlineStack spacing="none">
        <LoremIpsum />
        <Divider direction="vertical" blockSpacing="none" />
        <LoremIpsum />
        <Divider direction="vertical" blockSpacing="extraTight" />
        <LoremIpsum />
        <Divider direction="vertical" blockSpacing="tight" />
        <LoremIpsum />
        <Divider direction="vertical" blockSpacing="base" />
        <LoremIpsum />
        <Divider direction="vertical" blockSpacing="loose" />
        <LoremIpsum />
        <Divider direction="vertical" blockSpacing="extraLoose" />
        <LoremIpsum />
      </InlineStack>
    </View>
  </>
);
export const alignment = () => (
  <>
    <Text subdued>With alignment, width, children</Text>
    <View display="block" padding="loose" border="dotted">
      <BlockStack spacing="extraLoose">
        <Divider direction="horizontal" width="thin" alignment="center">
          <ChildContent />
        </Divider>
        <Divider direction="horizontal" width="medium" alignment="center">
          <ChildContent />
        </Divider>
        <Divider direction="horizontal" width="thick" alignment="start">
          <ChildContent />
        </Divider>
        <Divider direction="horizontal" width="extraThick" alignment="end">
          <ChildContent />
        </Divider>
      </BlockStack>
    </View>
    <br />
    <Text subdued>With direction vertical, alignment, width, children</Text>
    <View display="block" padding="loose" border="dotted">
      <InlineStack alignment="center" spacing="extraLoose">
        <Divider direction="vertical" width="extraThick" alignment="start">
          <Content />
        </Divider>
        <LoremIpsum />
        <Divider direction="vertical" width="thick" alignment="center">
          <Content />
        </Divider>
        <LoremIpsum />
        <Divider direction="vertical" width="medium" alignment="end">
          <Content />
        </Divider>
        <LoremIpsum />
        <Divider direction="vertical" width="thin" alignment="end">
          <Content />
        </Divider>
      </InlineStack>
    </View>
  </>
);
export const withControls = (props: Props) => (
  <View>
    <Content />
    <Divider {...props} />
    <Content />
  </View>
);

withControls.args = {
  width: undefined,
  blockSpacing: undefined,
  children: '',
  alignment: undefined,
};
