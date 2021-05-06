import React from 'react';
import {BlockSpacerProps as Props} from '@shopify/argo-checkout';

import {BlockSpacer as BlockSpacerComponent} from './BlockSpacer';

const meta = {
  component: BlockSpacerComponent,
  title: 'checkout-web-ui/BlockSpacer',
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: [
          undefined,
          'extraSmall',
          'small',
          'base',
          'large',
          'extraLarge',
        ],
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

export const BlockSpacer = ({...args}: Props) => {
  return (
    <>
      <Content />
      <BlockSpacerComponent {...args} />
      <Content />
      <BlockSpacerComponent {...args} />
      <Content />
      <BlockSpacerComponent {...args} />
      <Content />
    </>
  );
};

BlockSpacer.args = {
  size: undefined,
};

BlockSpacer.story = {
  name: 'BlockSpacer',
};
