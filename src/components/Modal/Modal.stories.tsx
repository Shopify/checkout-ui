import React, {useState} from 'react';
import {withKnobs} from '@storybook/addon-knobs';
import faker from 'faker';

import {themeWithKnobs} from '../../storybook-utilities';
import {Text} from '../Text';
import {Button} from '../Button';

import {Modal} from './Modal';

const meta = {
  component: Modal,
  title: 'Modal',
  decorators: [withKnobs, themeWithKnobs('headingLevel1')],
};

export default meta;

export const withContent = () => (
  <Modal open>
    <Text>{faker.lorem.paragraphs(1)}</Text>
  </Modal>
);

export const withVeryLongContent = () => (
  <Modal open>
    <Text>{faker.lorem.paragraphs(100)}</Text>
  </Modal>
);

export const withExplicitHeight = () => (
  <Modal open height={300}>
    <Text>{faker.lorem.paragraphs(100)}</Text>
  </Modal>
);

export const withTitle = () => (
  <Modal title={faker.random.words(3)} open>
    <Text>{faker.lorem.paragraphs(1)}</Text>
  </Modal>
);

export const withLongTitle = () => (
  <Modal title={faker.random.words(8)} open>
    <Text>{faker.lorem.paragraphs(1)}</Text>
  </Modal>
);

export const iframe = () => <Modal src="https://www.example.com/" open />;

export const iframeWithTitle = () => (
  <Modal src="http://www.example.com/" title={faker.random.words(3)} open />
);

export const iframeWithExplicitHeight = () => (
  <Modal src="http://www.example.com/" open height={300} />
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
