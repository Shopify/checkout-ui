import React from 'react';
import {BlockStackProps as Props} from '@shopify/argo-checkout';

import {BlockStack as BlockStackComponent} from './BlockStack';

const meta = {
  component: BlockStackComponent,
  title: 'checkout-web-ui/BlockStack',
  argTypes: {
    spacing: {
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
        options: [undefined, 'leading', 'center', 'trailing'],
      },
    },
  },
};

export default meta;

function Content({size = 1}: {size?: number}) {
  return (
    <div
      style={{
        backgroundColor: 'lightgrey',
        width: '5em',
        height: `${size}em`,
      }}
    />
  );
}

export const BlockStack = ({...args}: Props) => {
  return (
    <>
      <BlockStackComponent {...args}>
        <Content />
        <Content size={3} />
        <Content />
        <Content size={2} />
        <Content />
        <Content />
        <Content size={3} />
        <Content />
        <Content size={2} />
      </BlockStackComponent>
    </>
  );
};

BlockStack.args = {
  spacing: undefined,
  alignment: undefined,
};

BlockStack.story = {
  name: 'BlockStack',
};
