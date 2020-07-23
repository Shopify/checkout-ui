import React from 'react';

import {View} from '../View';

import {Layout} from './Layout';

const meta = {
  component: Layout,
  title: 'Layout',
};

export default meta;

function ExampleContent() {
  return (
    <div
      style={{
        backgroundColor: 'lightgrey',
        border: '1px #000 solid',
        padding: '1em',
      }}
    >
      Content block
    </div>
  );
}

export const defaultState = () => (
  <Layout
    maxInlineSize={700}
    sizes={[1, 1]}
    media={[
      {
        viewportSize: 'medium',
        maxInlineSize: 1200,
        sizes: [0.7, {size: 0.3, toInlineEdge: true}],
      },
    ]}
  >
    <View>
      <ExampleContent />
    </View>
    <View>
      <ExampleContent />
    </View>
  </Layout>
);
