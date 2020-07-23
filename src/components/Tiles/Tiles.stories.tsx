import React from 'react';

import {View} from '../View';

import {Tiles} from './Tiles';

const meta = {
  component: Tiles,
  title: 'Tiles',
};

export default meta;

function ExampleTile() {
  return (
    <View>
      <div
        style={{
          backgroundColor: 'lightgrey',
          border: '1px #000 solid',
          padding: '1em',
        }}
      >
        Content block
      </div>
    </View>
  );
}

function LongExampleTile() {
  return (
    <View>
      <div
        style={{
          backgroundColor: 'lightgrey',
          border: '1px #000 solid',
          padding: '1em',
        }}
      >
        This is a long content block that wraps on multiple lines. This is a
        long content block that wraps on multiple lines.
      </div>
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
  <Tiles spacing="xtight" maxPerLine={4} breakAt={600} alignment="center">
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
    <Tiles spacing="xtight">
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
    <Tiles>
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
    <Tiles spacing="xloose">
      <ExampleTile />
      <ExampleTile />
      <ExampleTile />
      <ExampleTile />
    </Tiles>
  </>
);

export const Alignment = () => (
  <div style={{width: '400px'}}>
    <div style={{border: '1px #999 dotted'}}>
      <Tiles alignment="leading">
        <ExampleTile />
        <LongExampleTile />
        <ExampleTile />
      </Tiles>
    </div>
    <br />
    <div style={{border: '1px #999 dotted'}}>
      <Tiles alignment="center">
        <ExampleTile />
        <LongExampleTile />
        <ExampleTile />
      </Tiles>
    </div>
    <br />
    <div style={{border: '1px #999 dotted'}}>
      <Tiles alignment="trailing">
        <ExampleTile />
        <LongExampleTile />
        <ExampleTile />
      </Tiles>
    </div>
    <br />
    <div style={{border: '1px #999 dotted'}}>
      <Tiles alignment="baseline">
        <ExampleTile />
        <LongExampleTile />
        <ExampleTile />
      </Tiles>
    </div>
  </div>
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
    <div style={{width: '599px', border: '1px #999 dotted'}}>
      <Tiles breakAt={600} spacing="none">
        <ExampleTile />
        <ExampleTile />
        <ExampleTile />
        <ExampleTile />
      </Tiles>
    </div>
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
