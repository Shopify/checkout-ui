import React from 'react';

import {TextContainer} from '../TextContainer';
import {TextBlock} from '../TextBlock';

import {InlineStack} from './InlineStack';

const meta = {
  component: InlineStack,
  title: 'InlineStack',
};

export default meta;

function Content() {
  return (
    <div style={{backgroundColor: 'lightgrey'}}>
      <TextBlock>This is content</TextBlock>
    </div>
  );
}

function ContentLong() {
  return (
    <div style={{backgroundColor: 'lightgrey'}}>
      <TextContainer>
        <TextBlock>
          This is content lorem ipsum dolor sit amet, consectetur adipiscing
          elit eum maxime, corrupti atque voluptatum nisi modi.
        </TextBlock>
        <TextBlock>
          This is content lorem ipsum dolor sit amet, consectetur adipiscing
          elit eum maxime, corrupti.
        </TextBlock>
      </TextContainer>
    </div>
  );
}

export const defaultState = () => (
  <InlineStack>
    <Content />
    <Content />
    <Content /> <Content />
    <Content />
    <Content /> <Content />
    <Content />
    <Content /> <Content />
    <Content />
    <Content /> <Content />
    <Content />
    <Content /> <Content />
    <Content />
    <Content /> <Content />
    <Content />
    <Content /> <Content />
    <Content /> <Content /> <Content />
    <Content />
    <Content /> <Content />
    <Content />
    <Content /> <Content />
    <Content />
    <Content />
  </InlineStack>
);

export const Alignment = () => (
  <>
    <InlineStack alignment="leading">
      <ContentLong />
      <Content />
      <Content />
    </InlineStack>
    <br />
    <InlineStack alignment="center">
      <ContentLong />
      <Content />
      <Content />
    </InlineStack>
    <br />
    <InlineStack alignment="trailing">
      <ContentLong />
      <Content />
      <Content />
    </InlineStack>
    <br />
    <InlineStack alignment="baseline">
      <ContentLong />
      <Content />
      <TextBlock size="large">This is a large text</TextBlock>
    </InlineStack>
  </>
);

export const AllSpacings = () => (
  <>
    <InlineStack spacing="xtight">
      <Content />
      <Content />
      <Content />
    </InlineStack>
    <InlineStack spacing="tight">
      <Content />
      <Content />
      <Content />
    </InlineStack>
    <InlineStack>
      <Content />
      <Content />
      <Content />
    </InlineStack>
    <InlineStack spacing="loose">
      <Content />
      <Content />
      <Content />
    </InlineStack>
    <InlineStack spacing="xloose">
      <Content />
      <Content />
      <Content />
    </InlineStack>
  </>
);
