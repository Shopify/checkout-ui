import React, {useState, MouseEvent, ReactNode} from 'react';

import {InlineStack} from '../InlineStack';

import {Popper} from './Popper';
import {Placement} from './utilities/offsets';

const meta = {
  component: Popper,
  title: 'Popper',
  decorators: [
    (story: () => JSX.Element) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        {story()}
      </div>
    ),
  ],
};

export default meta;

const Content = ({children}: {children: ReactNode}) => {
  return (
    <div
      style={{
        border: '1px solid red',
        padding: 10,
      }}
    >
      {children}
    </div>
  );
};

const WithPlacement = () => {
  const [
    referenceElement,
    setReferenceElement,
  ] = useState<HTMLButtonElement | null>(null);
  const [placement, setPlacement] = useState<Placement | null>('blockStart');

  const handleClick = (placement: Placement) => (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    setReferenceElement(event.currentTarget);
    setPlacement(placement);
  };

  return (
    <>
      {referenceElement && placement && (
        <Popper activator={referenceElement} placement={placement}>
          <Content>Popper</Content>
        </Popper>
      )}
      <InlineStack>
        <button onClick={handleClick('blockStart')}>blockStart</button>
        <button onClick={handleClick('blockEnd')}>blockEnd</button>
        <button onClick={handleClick('inlineStart')}>inlineStart</button>
        <button onClick={handleClick('inlineEnd')}>inlineEnd</button>
      </InlineStack>
    </>
  );
};

const WithSameInlineSize = () => {
  const [
    referenceElement,
    setReferenceElement,
  ] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setReferenceElement(event.currentTarget);
  };

  return (
    <>
      {referenceElement && placement && (
        <Popper
          activator={referenceElement}
          placement="blockStart"
          sameInlineSize
        >
          <Content>Popper</Content>
        </Popper>
      )}
      <button onClick={handleClick}>Popper with the same inline size</button>
    </>
  );
};

const WithMinimumInlineSize = () => {
  const [
    referenceElement,
    setReferenceElement,
  ] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setReferenceElement(event.currentTarget);
  };

  return (
    <>
      {referenceElement && placement && (
        <Popper
          activator={referenceElement}
          placement="blockStart"
          minInlineSize={480}
        >
          <Content>Popper</Content>
        </Popper>
      )}
      <button onClick={handleClick}>
        Popper with a minimum inline size (480px)
      </button>
    </>
  );
};

const WithOverflowPrevention = () => {
  const [
    referenceElement,
    setReferenceElement,
  ] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setReferenceElement(event.currentTarget);
  };

  return (
    <div
      style={{
        display: 'flex',
        flex: '1',
        paddingRight: 50,
        justifyContent: 'flex-end',
      }}
    >
      {referenceElement && placement && (
        <Popper
          activator={referenceElement}
          placement="blockStart"
          preventOverflow
        >
          <Content>Very loooooooooooooooooooooooong Popper</Content>
        </Popper>
      )}
      <button onClick={handleClick}>Prevent overflow</button>
    </div>
  );
};

export const placement = () => <WithPlacement />;
export const sameInlineSize = () => <WithSameInlineSize />;
export const minimumInlineSize = () => <WithMinimumInlineSize />;
export const preventOverflow = () => <WithOverflowPrevention />;
