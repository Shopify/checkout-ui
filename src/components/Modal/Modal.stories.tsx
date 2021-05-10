import React, {useState} from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {faker} from '../../test-utilities';
import {themeWithKnobs} from '../../storybook-utilities';
import {Text} from '../Text';
import {Button} from '../Button';
import {InlineStack} from '../InlineStack';
import {BlockStack} from '../BlockStack';

import {Modal} from './Modal';

const meta = {
  component: Modal,
  title: 'checkout-web-ui/Modal',
  decorators: [withKnobs, themeWithKnobs('headingLevel1')],
};

export default meta;

export const text = () => (
  <Modal open title={faker.random.words(2)} titleHidden>
    <Text>{faker.lorem.paragraphs(1)}</Text>
  </Modal>
);

export const longText = () => (
  <Modal open title={faker.random.words(2)} titleHidden>
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

export const blockingWithHiddenTitle = () => (
  <Modal title={faker.random.words(2)} blocking open titleHidden>
    <Text>{faker.lorem.paragraphs(1)}</Text>
  </Modal>
);

export const iframe = () => (
  <Modal
    src="https://www.example.com/"
    open
    title={faker.random.words(2)}
    titleHidden
  />
);

export const iframeWithTitle = () => (
  <Modal src="http://www.example.com/" title={faker.random.words(3)} open />
);

export const long = () => (
  <Modal
    src="http://www.example.com/"
    open
    long
    title={faker.random.words(2)}
    titleHidden
  />
);

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
