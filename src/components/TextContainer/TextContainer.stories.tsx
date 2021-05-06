import React from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {themeWithKnobs} from '../../storybook-utilities';
import {TextBlock} from '../TextBlock';
import {Heading} from '../Heading';
import {HeadingGroup} from '../HeadingGroup';
import {InlineStack} from '../InlineStack';

import {TextContainer} from './TextContainer';

const meta = {
  component: TextContainer,
  title: 'checkout-web-ui/TextContainer',
  decorators: [withKnobs, themeWithKnobs('headingLevel2', 'headingLevel3')],
};

export default meta;

function ExampleText() {
  return (
    <TextBlock>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae enim
      veniam natus facilis. Nemo nisi assumenda alias dolore saepe quia! Sed
      perspiciatis veritatis nesciunt vitae nobis distinctio quod illo neque?
    </TextBlock>
  );
}

export const defaultState = () => (
  <TextContainer>
    <ExampleText />
    <ExampleText />
    <ExampleText />
    <ExampleText />
  </TextContainer>
);

export const allSpacings = () => (
  <InlineStack>
    <TextContainer spacing="none">
      <Heading>Tight</Heading>
      <ExampleText />
      <ExampleText />
    </TextContainer>

    <TextContainer spacing="tight">
      <Heading>Tight</Heading>
      <ExampleText />
      <ExampleText />
    </TextContainer>

    <TextContainer>
      <Heading>Default</Heading>
      <ExampleText />
      <ExampleText />
    </TextContainer>

    <TextContainer spacing="loose">
      <Heading>Loose</Heading>
      <ExampleText />
      <ExampleText />
    </TextContainer>
  </InlineStack>
);

export const allAlignments = () => (
  <InlineStack>
    <TextContainer>
      <ExampleText />
      <ExampleText />
    </TextContainer>
    <TextContainer alignment="center">
      <ExampleText />
      <ExampleText />
    </TextContainer>
    <TextContainer alignment="trailing">
      <ExampleText />
      <ExampleText />
    </TextContainer>
  </InlineStack>
);

export const nested = () => (
  <TextContainer alignment="trailing">
    <Heading>Default</Heading>
    <ExampleText />
    <ExampleText />
    <HeadingGroup>
      <TextContainer spacing="tight">
        <Heading>Nested with tight spacing</Heading>
        <ExampleText />
        <ExampleText />
      </TextContainer>
    </HeadingGroup>
  </TextContainer>
);
