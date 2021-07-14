import React, {useState} from 'react';
import {withKnobs} from '@storybook/addon-knobs';
import {Story} from '@storybook/preact/types-6-0';

import {faker} from '../../test-utilities';
import {
  themeWithKnobs,
  MockPrefersReducedMotion,
} from '../../storybook-utilities';
import {Text} from '../Text';
import {Button} from '../Button';
import {InlineStack} from '../InlineStack';
import {BlockStack} from '../BlockStack';
import {TextField} from '../TextField';

import {Modal, Props} from './index';

const meta = {
  component: Modal,
  title: 'checkout-web-ui/Modal',
  decorators: [withKnobs, themeWithKnobs('headingLevel1')],
};

export default meta;

const Template: Story<Props> = (args) => (
  <>
    {/* This sets the fade-in animation duration to near 0
    to avoid flaky a11y color contrast tests failures */}
    {process.env.A11Y_TESTS && <MockPrefersReducedMotion />}
    <ModalContainer {...args} title={args.title || faker.random.words(2)} />
  </>
);

const ModalContainer = ({
  title,
  open: openProp,
  children,
  blocking,
  ...rest
}: Props) => {
  const [open, setOpen] = useState(openProp ?? true);

  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onPress={() => setOpen(true)}>Show modal</Button>
      <Modal
        {...rest}
        title={title}
        open={open}
        {...(blocking
          ? {blocking: true}
          : {blocking: false, onClose: handleClose})}
      >
        {typeof children === 'function'
          ? children({onClose: handleClose})
          : children}
      </Modal>
    </>
  );
};

export const text = Template.bind({});
text.args = {
  children: <Text>{faker.lorem.paragraphs(1)}</Text>,
};

export const longText = Template.bind({});
longText.args = {
  titleHidden: true,
  children: <Text>{faker.lorem.paragraphs(100)}</Text>,
};

export const title = Template.bind({});
title.args = {
  children: <Text>{faker.lorem.paragraphs(1)}</Text>,
};

export const longTitle = Template.bind({});
longTitle.args = {
  title: faker.random.words(8),
  children: <Text>{faker.lorem.paragraphs(1)}</Text>,
};

const BlockingContent = ({onClose}: {onClose: () => void}) => {
  return (
    <BlockStack>
      <Text>
        No generic close button, neither ESC nor backdrop click close the modal.
        The only way to close it is manually created buttons like the one below.
      </Text>
      <Button onPress={onClose}>Close Blocking Modal</Button>
    </BlockStack>
  );
};

export const blocking = Template.bind({});
blocking.args = {
  blocking: true,
  children: ({onClose}: {onClose: () => void}) => (
    <BlockingContent onClose={onClose} />
  ),
};

export const blockingWithHiddenTitle = Template.bind({});
blockingWithHiddenTitle.args = {
  blocking: true,
  titleHidden: true,
  children: ({onClose}: {onClose: () => void}) => (
    <BlockingContent onClose={onClose} />
  ),
};

export const iframe = Template.bind({});
iframe.args = {
  source: 'http://www.example.com/',
  titleHidden: true,
};

export const iframeWithTitle = Template.bind({});
iframeWithTitle.args = {
  source: 'http://www.example.com/',
};

export const maxInlineSize = Template.bind({});
maxInlineSize.args = {
  maxInlineSize: 320,
  titleHidden: true,
  children: <Text>{faker.lorem.paragraphs(3)}</Text>,
};

export const maxInlineSizeFraction = Template.bind({});
maxInlineSizeFraction.args = {
  maxInlineSize: 0.7,
  titleHidden: true,
  children: <Text>{faker.lorem.paragraphs(3)}</Text>,
};

export const blockSize = Template.bind({});
blockSize.args = {
  source: 'http://www.example.com/',
  blockSize: 'fill',
  titleHidden: true,
};

export const focusTrap = Template.bind({});
focusTrap.args = {
  children: (
    <BlockStack>
      <Text>{faker.lorem.paragraphs(1)}</Text>
      <InlineStack>
        <Button>You</Button>
        <Button>are</Button>
        <Button>trapped</Button>
      </InlineStack>
    </BlockStack>
  ),
};

export const focusedInput = Template.bind({});
focusedInput.args = {
  children: (
    <BlockStack spacing="base">
      <TextField autofocus label="First Name" />
      <TextField label="Last Name" />
      <Button>Submit</Button>
    </BlockStack>
  ),
};

export const closed = Template.bind({});
closed.args = {
  open: false,
  children: <Text>{faker.lorem.paragraphs(1)}</Text>,
};
