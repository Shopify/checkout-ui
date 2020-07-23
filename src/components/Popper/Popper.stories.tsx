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
  const [placement, setPlacement] = useState<Placement | null>('top');

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
        <button onClick={handleClick('top')}>Top</button>
        <button onClick={handleClick('bottom')}>Bottom</button>
      </InlineStack>
    </>
  );
};

const WithSameWidth = () => {
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
        <Popper activator={referenceElement} placement="top" sameWidth>
          <Content>Popper</Content>
        </Popper>
      )}
      <button onClick={handleClick}>
        Popper with the same wiiiiiiiiiiiidth
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
        <Popper activator={referenceElement} placement="top" preventOverflow>
          <Content>Very loooooooooooooooooooooooong Popper</Content>
        </Popper>
      )}
      <button onClick={handleClick}>Prevent overflow</button>
    </div>
  );
};

export const placement = () => <WithPlacement />;

export const sameWidth = () => <WithSameWidth />;

export const preventOverflow = () => <WithOverflowPrevention />;
