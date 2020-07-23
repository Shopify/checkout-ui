import React from 'react';

import {TextContainer} from '../TextContainer';

import {TextBlock} from './TextBlock';

const meta = {
  component: TextBlock,
  title: 'TextBlock',
};

export default meta;

function Content() {
  return (
    <>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos
      voluptas eveniet iste reprehenderit.
    </>
  );
}

export const defaultState = () => (
  <TextContainer>
    <TextBlock>
      <Content />
    </TextBlock>
    <TextBlock>
      <Content />
    </TextBlock>
    <TextBlock>
      <Content />
    </TextBlock>
  </TextContainer>
);

export const allVisualStyles = () => (
  <TextContainer>
    <TextBlock>Default</TextBlock>
    <TextBlock subdued>Subdued</TextBlock>
    <TextBlock emphasized>Emphasized</TextBlock>
  </TextContainer>
);

export const allSizes = () => (
  <TextContainer>
    <TextBlock size="small">Small</TextBlock>
    <TextBlock>Default</TextBlock>
    <TextBlock size="medium">Medium</TextBlock>
    <TextBlock size="large">Large</TextBlock>
    <TextBlock size="xlarge">Extra large</TextBlock>
  </TextContainer>
);
