import React from 'react';
import {InlineSpacerProps as Props} from '@shopify/checkout-ui-extensions';

import {InlineSpacer as InlineSpacerComponent} from './InlineSpacer';

const meta = {
  component: InlineSpacerComponent,
  title: 'checkout-web-ui/InlineSpacer',
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
        display: 'inline-block',
        width: '5em',
        height: `${size}em`,
      }}
    />
  );
}

export const InlineSpacer = ({...args}: Props) => {
  return (
    <>
      <Content />
      <InlineSpacerComponent {...args} />
      <Content />
      <InlineSpacerComponent {...args} />
      <Content />
      <InlineSpacerComponent {...args} />
      <Content />
    </>
  );
};

InlineSpacer.args = {
  size: undefined,
};

InlineSpacer.story = {
  name: 'InlineSpacer',
};
