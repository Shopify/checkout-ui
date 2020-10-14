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
    <TextBlock appearance="accent">Accent</TextBlock>
    <TextBlock subdued appearance="accent">
      Subdued accent
    </TextBlock>
    <TextBlock emphasized appearance="accent">
      Emphasized accent
    </TextBlock>
    <TextBlock appearance="critical">Critical</TextBlock>
    <TextBlock subdued appearance="critical">
      Subdued critical
    </TextBlock>
    <TextBlock emphasized appearance="critical">
      Emphasized critical
    </TextBlock>
    <TextBlock appearance="warning">Warning</TextBlock>
    <TextBlock subdued appearance="warning">
      Subdued warning
    </TextBlock>
    <TextBlock emphasized appearance="warning">
      Emphasized warning
    </TextBlock>
    <TextBlock appearance="success">Success</TextBlock>
    <TextBlock subdued appearance="success">
      Subdued success
    </TextBlock>
    <TextBlock emphasized appearance="success">
      Emphasized success
    </TextBlock>
  </TextContainer>
);

export const allStatus = () => (
  <TextContainer>
    <TextBlock appearance="critical">Critical</TextBlock>
    <TextBlock appearance="warning">Warning</TextBlock>
    <TextBlock appearance="success">Success</TextBlock>
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
