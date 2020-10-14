import React, {useState} from 'react';
import {withKnobs} from '@storybook/addon-knobs';
import faker from 'faker';

import {themeWithKnobs} from '../../storybook-utilities';
import {Text} from '../Text';
import {Button} from '../Button';
import {InlineStack} from '../InlineStack';
import {BlockStack} from '../BlockStack';

import {Modal} from './Modal';

const meta = {
  component: Modal,
  title: 'Modal',
  decorators: [withKnobs, themeWithKnobs('headingLevel1')],
};

export default meta;

export const text = () => (
  <Modal open>
    <Text>{faker.lorem.paragraphs(1)}</Text>
  </Modal>
);

export const longText = () => (
  <Modal open>
    <Text>{faker.lorem.paragraphs(100)}</Text>
  </Modal>
);

export const title = () => (
  <Modal title={faker.random.words(3)} open>
    <Text>{faker.lorem.paragraphs(1)}</Text>
  </Modal>
);

export const longTitle = () => (
  <Modal title={faker.random.words(8)} open>
    <Text>{faker.lorem.paragraphs(1)}</Text>
  </Modal>
);

export const blocking = () => (
  <Modal title={faker.random.words(2)} blocking open>
    <Text>{faker.lorem.paragraphs(1)}</Text>
  </Modal>
);

export const iframe = () => <Modal src="https://www.example.com/" open />;

export const iframeWithTitle = () => (
  <Modal src="http://www.example.com/" title={faker.random.words(3)} open />
);

export const long = () => <Modal src="http://www.example.com/" open long />;

export const focusTrap = () => (
  <Modal title={faker.random.words(3)} open>
    <BlockStack>
      <Text>{faker.lorem.paragraphs(1)}</Text>
      <InlineStack>
        <Button subdued>You</Button>
        <Button subdued>are</Button>
        <Button subdued>trapped</Button>
      </InlineStack>
    </BlockStack>
  </Modal>
);

const Closed = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onPress={() => setOpen(true)}>Show modal</Button>
      <Modal
        title={faker.random.words(3)}
        open={open}
        onClose={() => setOpen(false)}
      >
        <Text>{faker.lorem.paragraphs(1)}</Text>
      </Modal>
    </>
  );
};

export const closed = () => <Closed />;
