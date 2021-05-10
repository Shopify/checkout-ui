import React, {useState, useRef, useCallback} from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {Text} from '../Text';
import {TextBlock} from '../TextBlock';
import {themeWithKnobs} from '../../storybook-utilities';
import {Button} from '../Button';
import {TextField} from '../TextField';
import {View} from '../View';
import {Placement} from '../Popper';

import {Popover} from './Popover';

const meta = {
  component: Popover,
  title: 'checkout-web-ui/Popover',
  decorators: [
    withKnobs,
    themeWithKnobs('primaryButton', 'secondaryButton'),
    (story: () => JSX.Element) => (
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {story()}
      </div>
    ),
  ],
};

export default meta;

const StoryPopover = ({
  placement,
}: {
  placement?: Placement;
  offset?: number;
}) => {
  const activatorRef = useRef<HTMLButtonElement>();
  const activatorRefShort = useRef<HTMLButtonElement>();
  const [open, setOpen] = useState(false);
  const [openShort, setOpenShort] = useState(false);

  return (
    <>
      <Button ref={activatorRef} onPress={() => setOpen(!open)}>
        Click me
      </Button>
      <Popover
        activator={activatorRef.current ?? null}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        placement={placement}
      >
        <div style={{maxWidth: '200px'}}>
          <View padding="base">
            <TextBlock>A thoughtful way to pay</TextBlock>
            <TextBlock>Tap don’t type</TextBlock>
            <TextBlock>
              Shop Pay remembers your important details, so you can fill carts,
              not forms. And everything is encrypted so you can speed safely
              through checkout.
            </TextBlock>
          </View>
        </div>
      </Popover>
      <br />
      <br />
      <Button ref={activatorRefShort} onPress={() => setOpenShort(!openShort)}>
        Click me
      </Button>
      <Popover
        activator={activatorRefShort.current ?? null}
        open={openShort}
        onClose={() => {
          setOpenShort(false);
        }}
        placement={placement}
      >
        <div style={{maxWidth: '200px'}}>
          <View padding="base">
            <TextBlock>Short</TextBlock>
          </View>
        </div>
      </Popover>
    </>
  );
};

export const inlineStart = () => <StoryPopover placement="inlineStart" />;

export const inlineEnd = () => <StoryPopover placement="inlineEnd" />;

export const blockStart = () => <StoryPopover placement="blockStart" />;

export const blockEnd = () => <StoryPopover placement="blockEnd" />;

function InputAsActivator() {
  const activatorRef = useRef<HTMLInputElement>();
  const [open, setOpen] = useState(false);

  const handleChange = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  return (
    <>
      <TextField onChange={handleChange} label="Email" ref={activatorRef} />
      <Popover
        activator={activatorRef.current ?? null}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Text>Hello world!</Text>
      </Popover>
    </>
  );
}

export const inputActivator = () => <InputAsActivator />;
