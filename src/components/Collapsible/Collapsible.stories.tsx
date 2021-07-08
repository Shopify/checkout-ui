import React, {useState, useCallback} from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {faker} from '../../test-utilities';
import {themeWithKnobs} from '../../storybook-utilities';
import {BlockSpacer} from '../BlockSpacer';
import {Button} from '../Button';
import {Text} from '../Text';
import {View} from '../View';

import {Collapsible, Props} from './Collapsible';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'checkout-web-ui/Collapsible',
  component: Collapsible,
  decorators: [withKnobs, themeWithKnobs()],
};

export const basicCollapsible = (args: Props) => <Story {...args} />;
basicCollapsible.args = {
  id: 'basic-collapsible',
  minSize: 0,
  fade: false,
};
basicCollapsible.story = {
  name: 'Collapsible',
};

const content = faker.lorem.paragraphs(3);

function Story({id, minSize = 0, fade}: Props) {
  const [open, setOpen] = useState(true);
  const handleToggle = useCallback(() => setOpen((open) => !open), []);

  return (
    <>
      <Button onPress={handleToggle} aria-expanded={open} aria-controls={id}>
        Toggle
      </Button>
      <BlockSpacer />
      <Collapsible open={open} id={id} minSize={minSize} fade={fade}>
        <View border="base" padding="base">
          <Text>{content}</Text>
        </View>
      </Collapsible>
    </>
  );
}

export const accordion = () => <Accordion />;

function Accordion() {
  const [openId, setOpenId] = useState(-1);

  return (
    <>
      <Button
        onPress={() => {
          setOpenId(0);
        }}
        fill
        kind="secondary"
        aria-expanded={openId === 0}
        aria-controls="collapsible0"
      >
        Panel 1
      </Button>
      <Collapsible open={openId === 0} id="collapsible0">
        <View padding="base">
          <Text>{content}</Text>
        </View>
      </Collapsible>
      <Button
        onPress={() => {
          setOpenId(1);
        }}
        fill
        kind="secondary"
        aria-expanded={openId === 1}
        aria-controls="collapsible1"
      >
        Panel 2
      </Button>
      <Collapsible open={openId === 1} id="collapsible1">
        <View padding="base">
          <Text>{content}</Text>
        </View>
      </Collapsible>
      <Button
        onPress={() => {
          setOpenId(2);
        }}
        fill
        kind="secondary"
        aria-expanded={openId === 2}
        aria-controls="collapsible2"
      >
        Panel 3
      </Button>
      <Collapsible open={openId === 2} id="collapsible2">
        <View padding="base">
          <Text>{content}</Text>
        </View>
      </Collapsible>
    </>
  );
}
