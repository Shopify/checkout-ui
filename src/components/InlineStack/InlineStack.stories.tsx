import React from 'react';

import {View} from '../View';

import {InlineStack as InlineStackComponent, Props} from './InlineStack';

const meta = {
  component: InlineStackComponent,
  title: 'checkout-web-ui/InlineStack',
  argTypes: {
    demoWidth: {control: {type: 'range', min: 0, max: 100}},
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
        options: [undefined, 'leading', 'center', 'trailing', 'baseline'],
      },
    },
    blockAlignment: {
      control: {
        type: 'select',
        options: [undefined, 'center', 'trailing'],
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

export const InlineStack = ({
  demoWidth,
  ...args
}: Props & {demoWidth: number}) => {
  return (
    <View maxInlineSize={Number(`0.${demoWidth}`)} border="dotted">
      <InlineStackComponent {...args}>
        <Content />
        <Content size={3} />
        <Content />
        <Content size={2} />
        <Content />
        <Content />
        <Content size={3} />
        <Content />
        <Content size={2} />
      </InlineStackComponent>
    </View>
  );
};

InlineStack.args = {
  demoWidth: 25,
  spacing: undefined,
  alignment: undefined,
  blockAlignment: undefined,
  wrap: false,
};

InlineStack.story = {
  name: 'InlineStack',
};
