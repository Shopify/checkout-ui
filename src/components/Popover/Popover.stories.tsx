import React, {useState, ReactNode, useRef, useCallback} from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {Text} from '../Text';
import {themeWithKnobs} from '../../storybook-utilities';
import {Button} from '../Button';
import {TextField} from '../TextField';
import {Placement} from '../Popper';

import {Popover} from './Popover';

const meta = {
  component: Popover,
  title: 'Popover',
  decorators: [withKnobs, themeWithKnobs('primaryButton', 'secondaryButton')],
};

export default meta;

const Content = ({children}: {children: ReactNode}) => {
  return (
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
      {children}
    </div>
  );
};

const StoryPopover = ({
  placement,
  offset,
}: {
  placement?: Placement;
  offset?: number;
}) => {
  const activatorRef = useRef<HTMLButtonElement>();
  const [open, setOpen] = useState(false);

  return (
    <Content>
      <Button ref={activatorRef} onPress={() => setOpen(true)}>
        Click me
      </Button>
      <Popover
        activator={activatorRef.current ?? null}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        placement={placement}
        offset={offset}
      >
        <Text>Hello world!</Text>
      </Popover>
    </Content>
  );
};

export const inlineStart = () => <StoryPopover placement="inlineStart" />;

export const inlineEnd = () => <StoryPopover placement="inlineEnd" />;

export const blockStart = () => <StoryPopover placement="blockStart" />;

export const blockEnd = () => <StoryPopover placement="blockEnd" />;

export const inlineWithOffset = () => <StoryPopover offset={10} />;

export const blockWithOffset = () => (
  <StoryPopover placement="blockStart" offset={10} />
);

function InputAsActivator() {
  const activatorRef = useRef<HTMLInputElement>();
  const [open, setOpen] = useState(false);

  const handleChange = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  return (
    <Content>
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
    </Content>
  );
}

export const inputActivator = () => <InputAsActivator />;
