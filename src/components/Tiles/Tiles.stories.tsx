import React from 'react';

import {View} from '../View';

import {Tiles} from './Tiles';

const meta = {
  component: Tiles,
  title: 'checkout-web-ui/Tiles',
};

export default meta;

function ExampleTile() {
  return (
    <View>
      <View background="surfaceSecondary" border="base" padding="base">
        Content block
      </View>
    </View>
  );
}

function LongExampleTile() {
  return (
    <View>
      <View background="surfaceSecondary" border="base" padding="base">
        This is a long content block that wraps on multiple lines. This is a
        long content block that wraps on multiple lines.
      </View>
    </View>
  );
}

export const defaultState = () => (
  <Tiles>
    <ExampleTile />
    <LongExampleTile />
    <ExampleTile />
    <ExampleTile />
    <ExampleTile />
    <ExampleTile />
  </Tiles>
);

export const allProps = () => (
  <Tiles spacing="extraTight" maxPerLine={4} breakAt={600} alignment="center">
    <ExampleTile />
    <LongExampleTile />
    <ExampleTile />
    <ExampleTile />
    <LongExampleTile />
    <ExampleTile />
  </Tiles>
);

export const Spacing = () => (
  <>
    <Tiles spacing="none">
      <ExampleTile />
      <ExampleTile />
      <ExampleTile />
      <ExampleTile />
    </Tiles>
    <Tiles spacing="extraTight">
      <ExampleTile />
      <ExampleTile />
      <ExampleTile />
      <ExampleTile />
    </Tiles>
    <Tiles spacing="tight">
      <ExampleTile />
      <ExampleTile />
      <ExampleTile />
      <ExampleTile />
    </Tiles>
    <Tiles spacing="base">
      <ExampleTile />
      <ExampleTile />
      <ExampleTile />
      <ExampleTile />
    </Tiles>
    <Tiles spacing="loose">
      <ExampleTile />
      <ExampleTile />
      <ExampleTile />
      <ExampleTile />
    </Tiles>
    <Tiles spacing="extraLoose">
      <ExampleTile />
      <ExampleTile />
      <ExampleTile />
      <ExampleTile />
    </Tiles>
  </>
);

export const Alignment = () => (
  <View maxInlineSize={400}>
    <View border="base">
      <Tiles alignment="leading">
        <ExampleTile />
        <LongExampleTile />
        <ExampleTile />
      </Tiles>
    </View>
    <br />
    <View border="base">
      <Tiles alignment="center">
        <ExampleTile />
        <LongExampleTile />
        <ExampleTile />
      </Tiles>
    </View>
    <br />
    <View border="base">
      <Tiles alignment="trailing">
        <ExampleTile />
        <LongExampleTile />
        <ExampleTile />
      </Tiles>
    </View>
    <br />
    <View border="base">
      <Tiles alignment="baseline">
        <ExampleTile />
        <LongExampleTile />
        <ExampleTile />
      </Tiles>
    </View>
  </View>
);

export const maxPerLine = () => (
  <>
    <Tiles maxPerLine={2}>
      <ExampleTile />
      <ExampleTile />
      <ExampleTile />
      <ExampleTile />
    </Tiles>
  </>
);

export const breakAt = () => (
  <>
    <p>This Tiles breaks at 600px:</p>
    <Tiles breakAt={600} spacing="none">
      <ExampleTile />
      <ExampleTile />
      <ExampleTile />
      <ExampleTile />
    </Tiles>
    <br />
    <p>This Tiles is inside a 599px wrapper and breaks at 600px:</p>
    <View maxInlineSize={599} border="base">
      <Tiles breakAt={600} spacing="none">
        <ExampleTile />
        <ExampleTile />
        <ExampleTile />
        <ExampleTile />
      </Tiles>
    </View>
  </>
);

export const nested = () => (
  <>
    <p>This Tiles breaks at 900px then at 450px:</p>
    <Tiles breakAt={900}>
      <View>
        <Tiles breakAt={450}>
          <ExampleTile />
          <ExampleTile />
        </Tiles>
      </View>
      <View>
        <Tiles breakAt={450}>
          <ExampleTile />
          <ExampleTile />
        </Tiles>
      </View>
    </Tiles>
  </>
);
