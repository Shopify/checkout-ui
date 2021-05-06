import React, {ReactNode} from 'react';

import {View} from '../View';
import {Text} from '../Text';
import {BlockStack} from '../BlockStack';
import {Spinner} from '../Spinner';

import {Layout} from './Layout';

const meta = {
  component: Layout,
  title: 'checkout-web-ui/Layout',
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
      Content block Lorem, ipsum dolor sit amet consectetur adipisicing elit.
      Distinctio nemo in ex illo debitis necessitatibus sunt molestiae earum
      nesciunt alias praesentium, explicabo hic eveniet corporis harum nihil
      quidem vero eius.
    </div>
  );
}

function ExampleSmallContent() {
  return (
    <div
      style={{
        backgroundColor: 'lightgrey',
        border: '1px #000 solid',
        padding: '1em',
        width: '100%',
      }}
    >
      Content block
    </div>
  );
}

interface BoxProps {
  children?: ReactNode;
}

function ExampleBox({children}: BoxProps) {
  return (
    <div
      style={{
        height: '500px',
        border: '1px grey dotted',
      }}
    >
      {children}
    </div>
  );
}

export const defaultState = () => (
  <>
    <Text>Default with small content</Text>
    <Layout>
      <View>
        <ExampleSmallContent />
      </View>
      <View>
        <ExampleSmallContent />
      </View>
    </Layout>

    <Text>Default with large content</Text>
    <Layout>
      <View>
        <ExampleContent />
      </View>
      <View>
        <ExampleContent />
      </View>
    </Layout>
  </>
);

export const inlineAlignment = () => (
  <>
    <Text>Default (center)</Text>
    <Layout>
      <ExampleSmallContent />
      <ExampleSmallContent />
    </Layout>

    <Text>Leading</Text>
    <Layout inlineAlignment="leading">
      <ExampleSmallContent />
      <ExampleSmallContent />
    </Layout>

    <Text>Trailing</Text>
    <Layout inlineAlignment="trailing">
      <ExampleSmallContent />
      <ExampleSmallContent />
    </Layout>
  </>
);

export const blockAlignment = () => (
  <>
    <Text>Default (leading)</Text>
    <ExampleBox>
      <Layout>
        <ExampleContent />
        <ExampleContent />
      </Layout>
    </ExampleBox>

    <Text>Center</Text>
    <ExampleBox>
      <Layout blockAlignment="center">
        <ExampleContent />
        <ExampleContent />
      </Layout>
    </ExampleBox>

    <Text>Trailing</Text>
    <ExampleBox>
      <Layout blockAlignment="trailing">
        <ExampleContent />
        <ExampleContent />
      </Layout>
    </ExampleBox>
  </>
);

export const defaultSizes = () => (
  <>
    <Text>
      2 columns - <code>[0.75, 0.25]</code>
    </Text>
    <Layout sizes={[0.75, 0.25]}>
      <ExampleSmallContent />
      <ExampleContent />
    </Layout>

    <Text>
      2 columns - <code>[500, 300]</code>
    </Text>
    <Layout sizes={[500, 300]}>
      <ExampleSmallContent />
      <ExampleContent />
    </Layout>

    <Text>
      2 columns - <code>0.5, 200]</code>
    </Text>
    <Layout sizes={[0.5, 200]}>
      <ExampleSmallContent />
      <ExampleContent />
    </Layout>

    <Text>
      2 columns that would overflow - <code>[0.75, 0.5]</code>
    </Text>
    <Layout sizes={[0.75, 0.5]}>
      <ExampleSmallContent />
      <ExampleContent />
    </Layout>

    <Text>
      2 columns that would overflow - <code>[1000, 2000]</code>
    </Text>
    <Layout sizes={[1000, 2000]}>
      <ExampleSmallContent />
      <ExampleContent />
    </Layout>

    <Text>
      3 columns - <code>[auto, auto, auto]</code>
    </Text>
    <Layout sizes={['auto', 'auto', 'auto']}>
      <ExampleSmallContent />
      <ExampleSmallContent />
      <ExampleSmallContent />
    </Layout>

    <Text>
      3 columns - <code>[0.5, 0.25, 0.25]</code>
    </Text>
    <Layout sizes={[0.5, 0.25, 0.25]}>
      <ExampleSmallContent />
      <ExampleContent />
      <ExampleSmallContent />
    </Layout>

    <Text>
      3 columns - <code>[0.5, auto, auto]</code>
    </Text>
    <Layout sizes={[0.5, 'auto', 'auto']}>
      <ExampleSmallContent />
      <ExampleContent />
      <ExampleSmallContent />
    </Layout>

    <Text>
      3 columns - <code>[500, auto, fill]</code>
    </Text>
    <Layout sizes={[500, 'auto', 'fill']}>
      <ExampleSmallContent />
      <ExampleSmallContent />
      <ExampleContent />
    </Layout>

    <Text>
      3 columns - <code>[auto, auto, fill]</code>
    </Text>
    <Layout sizes={['auto', 'auto', 'fill']}>
      <ExampleContent />
      <ExampleContent />
      <ExampleSmallContent />
    </Layout>

    <Text>
      3 rows - <code>[1, 1, 1]</code>
    </Text>
    <Layout sizes={[1, 1, 1]}>
      <ExampleSmallContent />
      <ExampleContent />
      <ExampleSmallContent />
    </Layout>

    <Text>
      3 columns/rows mix - <code>[1, auto, fill]</code>
    </Text>
    <Layout sizes={[1, 'auto', 'fill']}>
      <ExampleSmallContent />
      <ExampleSmallContent />
      <ExampleSmallContent />
    </Layout>
  </>
);

export const defaultMaxInlineSize = () => (
  <>
    <Text>
      2 columns - <code>[0.5, 0.5]</code> maxInlineSize <code>default</code>
    </Text>
    <Layout sizes={[0.5, 0.5]}>
      <ExampleSmallContent />
      <ExampleContent />
    </Layout>

    <Text>
      2 columns - <code>[0.5, 0.5]</code> maxInlineSize <code>800px</code>
    </Text>
    <Layout maxInlineSize={800} sizes={[0.5, 0.5]}>
      <ExampleSmallContent />
      <ExampleContent />
    </Layout>

    <Text>
      2 columns - <code>[0.5, 0.5]</code> maxInlineSize <code>75%</code>
    </Text>
    <Layout maxInlineSize={0.75} sizes={[0.5, 0.5]}>
      <ExampleSmallContent />
      <ExampleContent />
    </Layout>

    <Text>
      2 columns - <code>[0.5, 0.5]</code> maxInlineSize <code>800px</code>{' '}
      inlineAlignment <code>leading</code>
    </Text>
    <Layout maxInlineSize={800} sizes={[0.5, 0.5]} inlineAlignment="leading">
      <ExampleSmallContent />
      <ExampleContent />
    </Layout>

    <Text>
      2 columns - <code>[0.5, 0.5]</code> maxInlineSize <code>75%</code>{' '}
      inlineAlignment <code>trailing</code>
    </Text>
    <Layout maxInlineSize={0.75} sizes={[0.5, 0.5]} inlineAlignment="trailing">
      <ExampleSmallContent />
      <ExampleContent />
    </Layout>
  </>
);

export const media = () => (
  <>
    <Text>
      Default 2 columns - <code>[1, 1]</code>
      <br /> Media above small 2 rows - <code>
        [0.75, 0.25]
      </code> maxInlineSize: <code>95%</code> spacing: <code>extraTight</code>
      <br /> Media above medium 2 rows - <code>
        [0.5, 0.5]
      </code> maxInlineSize: <code>85%</code> spacing: <code>base</code>
      <br /> Media above large 2 rows - <code>
        [0.25, 0.75]
      </code> maxInlineSize: <code>75%</code> spacing: <code>extraLoose</code>
    </Text>
    <Layout
      sizes={{
        base: [1, 1],
        small: [0.75, 0.25],
        medium: [0.5, 0.5],
        large: [0.25, 0.75],
      }}
      maxInlineSize={{small: 0.95, medium: 0.85, large: 0.75}}
      spacing={{small: 'extraTight', medium: 'base', large: 'extraLoose'}}
    >
      <ExampleSmallContent />
      <ExampleContent />
    </Layout>
  </>
);

export const commonLayouts = () => (
  <>
    <Text>Checkout</Text>
    <ExampleBox>
      <Layout sizes={[0.5, 0.5]}>
        <View padding="base">
          <Layout maxInlineSize={500} inlineAlignment="trailing">
            <ExampleSmallContent />
          </Layout>
        </View>
        <View padding="base">
          <Layout maxInlineSize={500} inlineAlignment="leading">
            <ExampleContent />
          </Layout>
        </View>
      </Layout>
    </ExampleBox>

    <Text>Siberia</Text>
    <ExampleBox>
      <Layout sizes={[0.5, 0.5]} maxInlineSize={925} blockAlignment="center">
        <View padding="base">Main</View>
        <View padding="base">Sidebar</View>
      </Layout>
    </ExampleBox>

    <Text>Centered</Text>
    <ExampleBox>
      <Layout blockAlignment="center">
        <BlockStack alignment="center">
          <Spinner />
          <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>
        </BlockStack>
      </Layout>
    </ExampleBox>
  </>
);

export const spacing = () => (
  <>
    <Text>ExtraTight</Text>
    <Layout spacing="extraTight" sizes={[1, 0.5, 0.5]}>
      <ExampleSmallContent />
      <ExampleSmallContent />
      <ExampleSmallContent />
    </Layout>

    <Text>Tight</Text>
    <Layout spacing="tight" sizes={[1, 0.5, 0.5]}>
      <ExampleSmallContent />
      <ExampleSmallContent />
      <ExampleSmallContent />
    </Layout>

    <Text>Base</Text>
    <Layout spacing="base" sizes={[1, 0.5, 0.5]}>
      <ExampleSmallContent />
      <ExampleSmallContent />
      <ExampleSmallContent />
    </Layout>

    <Text>Loose</Text>
    <Layout spacing="loose" sizes={[1, 0.5, 0.5]}>
      <ExampleSmallContent />
      <ExampleSmallContent />
      <ExampleSmallContent />
    </Layout>

    <Text>ExtraLoose</Text>
    <Layout spacing="extraLoose" sizes={[1, 0.5, 0.5]}>
      <ExampleSmallContent />
      <ExampleSmallContent />
      <ExampleSmallContent />
    </Layout>
  </>
);

export const nested = () => (
  <Layout sizes={[1, 1, 1]} spacing="base">
    <ExampleSmallContent />
    <Layout sizes={[0.25, 0.75]} spacing="base">
      <ExampleSmallContent />
      <ExampleSmallContent />
    </Layout>
    <ExampleSmallContent />
  </Layout>
);
