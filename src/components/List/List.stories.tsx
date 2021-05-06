import React from 'react';

import {InlineStack} from '../InlineStack';
import {BlockStack} from '../BlockStack';

import {List, ListItem} from './List';

const meta = {
  component: List,
  title: 'checkout-web-ui/List',
  decorators: [
    (story: () => JSX.Element) => (
      <div
        style={{
          padding: '1em',
        }}
      >
        {story()}
      </div>
    ),
  ],
};

export default meta;

export const defaultState = () => (
  <List>
    <ListItem>English</ListItem>
    <ListItem>Français</ListItem>
    <ListItem>Deutsch</ListItem>
  </List>
);

export const spacing = () => (
  <InlineStack spacing="extraLoose">
    <List spacing="none">
      <ListItem>English</ListItem>
      <ListItem>Français</ListItem>
      <ListItem>Deutsch</ListItem>
    </List>
    <List spacing="extraTight">
      <ListItem>English</ListItem>
      <ListItem>Français</ListItem>
      <ListItem>Deutsch</ListItem>
    </List>
    <List spacing="tight">
      <ListItem>English</ListItem>
      <ListItem>Français</ListItem>
      <ListItem>Deutsch</ListItem>
    </List>
    <List spacing="base">
      <ListItem>English</ListItem>
      <ListItem>Français</ListItem>
      <ListItem>Deutsch</ListItem>
    </List>
    <List spacing="loose">
      <ListItem>English</ListItem>
      <ListItem>Français</ListItem>
      <ListItem>Deutsch</ListItem>
    </List>
    <List spacing="extraLoose">
      <ListItem>English</ListItem>
      <ListItem>Français</ListItem>
      <ListItem>Deutsch</ListItem>
    </List>
  </InlineStack>
);

export const marker = () => (
  <BlockStack spacing="extraLoose">
    <List marker="none">
      <ListItem>English</ListItem>
      <ListItem>Français</ListItem>
      <ListItem>Deutsch</ListItem>
    </List>
    <List marker="bullet">
      <ListItem>English</ListItem>
      <ListItem>Français</ListItem>
      <ListItem>Deutsch</ListItem>
    </List>
    <List marker="number">
      <ListItem>English</ListItem>
      <ListItem>Français</ListItem>
      <ListItem>Deutsch</ListItem>
    </List>
  </BlockStack>
);
