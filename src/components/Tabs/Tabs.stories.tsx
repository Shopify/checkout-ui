import React, {useState} from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {themeWithKnobs} from '../../storybook-utilities';
import {View} from '../View';

import {Tabs, TabsProps} from './Tabs';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'checkout-web-ui/Tabs',
  component: Tabs,
  decorators: [withKnobs, themeWithKnobs()],
};

export const basicTabs = (args: TabsProps) => <Story {...args} />;
basicTabs.args = {
  tabs: [
    {
      label: 'Tab 1',
      icon: 'truck',
    },
    {
      label: 'Tab 2',
      icon: 'map',
    },
    'Tab 3',
  ],
  bordered: true,
};

basicTabs.story = {
  name: 'Tabs',
};

function Story(args: TabsProps) {
  const [selected, setSelected] = useState(0);

  const handleChange = (newSelected: number) => {
    setSelected(newSelected);
  };

  return (
    <Tabs
      {...args}
      selected={selected}
      onChange={handleChange}
      ariaLabel="Tabs example"
    >
      <View padding="base">Content for tab 1</View>
      <View padding="base">Content for tab 2</View>
      <View padding="base">Content for tab 3</View>
    </Tabs>
  );
}
