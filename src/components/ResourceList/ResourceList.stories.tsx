import React from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {themeWithKnobs} from '../../storybook-utilities';
import {Text} from '../Text';
import {Thumbnail} from '../Thumbnail';

import {
  ResourceList,
  ResourceListHeader,
  ResourceListHeaderContent,
} from './ResourceList';

import {ResourceItem, ResourceItemContent} from '.';

const meta = {
  component: ResourceList,
  title: 'checkout-web-ui/ResourceList',
  decorators: [withKnobs, themeWithKnobs()],
};

export default meta;

function Item() {
  return (
    <ResourceItem>
      <ResourceItemContent>
        <Thumbnail description="some media source" badge={1} />
      </ResourceItemContent>
      <ResourceItemContent primary>
        <Text emphasized>T-shirt</Text>
        <Text subdued>L/Blue</Text>
      </ResourceItemContent>
      <ResourceItemContent>
        <Text emphasized>$12.00</Text>
      </ResourceItemContent>
    </ResourceItem>
  );
}

export const multipleItems = () => (
  <ResourceList title="Products" titleHidden>
    <Item />
    <Item />
    <Item />
  </ResourceList>
);

export const oneItem = () => (
  <ResourceList title="Products" titleHidden>
    <Item />
  </ResourceList>
);

export const borderFull = () => (
  <ResourceList title="Products" titleHidden border="full">
    <Item />
    <Item />
    <Item />
  </ResourceList>
);

export const borderInner = () => (
  <ResourceList title="Products" titleHidden border="inner">
    <Item />
    <Item />
    <Item />
  </ResourceList>
);

export const borderOuter = () => (
  <ResourceList title="Products" titleHidden border="outer">
    <Item />
    <Item />
    <Item />
  </ResourceList>
);

export const withHeader = () => (
  <ResourceList title="Products" titleHidden>
    <ResourceListHeader>
      <ResourceListHeaderContent>
        <Text>Image</Text>
      </ResourceListHeaderContent>
      <ResourceListHeaderContent primary>
        <Text>Description</Text>
      </ResourceListHeaderContent>
      <ResourceListHeaderContent>
        <Text>Price</Text>
      </ResourceListHeaderContent>
    </ResourceListHeader>
    <Item />
    <Item />
    <Item />
  </ResourceList>
);

export const withHiddenHeaderContent = () => (
  <ResourceList titleHidden title="Products">
    <ResourceListHeader>
      <ResourceListHeaderContent primary>
        <Text emphasized>test</Text>
      </ResourceListHeaderContent>
      <ResourceListHeaderContent>
        <Text emphasized>test</Text>
      </ResourceListHeaderContent>
    </ResourceListHeader>
    <Item />
    <Item />
    <Item />
  </ResourceList>
);
