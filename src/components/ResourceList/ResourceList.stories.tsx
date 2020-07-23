import React from 'react';

import {Text} from '../Text';
import {Thumbnail} from '../Thumbnail';
import {ResourceItem, ResourceItemContent} from '../ResourceItem';

import {
  ResourceList,
  ResourceListHeader,
  ResourceListHeaderContent,
} from './ResourceList';

const meta = {
  component: ResourceList,
  title: 'ResourceList',
  decorators: [
    (story: () => JSX.Element) => <div style={{margin: '1em'}}>{story()}</div>,
  ],
};

export default meta;

const placeholder =
  '//cdn.shopify.com/s/assets/checkout/product-blank-98d4187c2152136e9fb0587a99dfcce6f6873f3a9f21ea9135ed7f495296090f.png';

function Item() {
  return (
    <ResourceItem>
      <ResourceItemContent>
        <Thumbnail
          source={placeholder}
          description="some media source"
          badge={1}
        />
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
  <ResourceList>
    <Item />
    <Item />
    <Item />
  </ResourceList>
);

export const oneItem = () => (
  <ResourceList>
    <Item />
  </ResourceList>
);

export const borderBlockEnd = () => (
  <ResourceList border="blockEnd">
    <Item />
    <Item />
    <Item />
  </ResourceList>
);

export const borderFull = () => (
  <ResourceList border="full">
    <Item />
    <Item />
    <Item />
  </ResourceList>
);

export const borderBetweenItems = () => (
  <ResourceList border="betweenItems">
    <Item />
    <Item />
    <Item />
  </ResourceList>
);

export const withHeader = () => (
  <ResourceList>
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
  <ResourceList>
    <ResourceListHeader>
      <ResourceListHeaderContent hidden>
        <Text>Image</Text>
      </ResourceListHeaderContent>
      <ResourceListHeaderContent primary hidden>
        <Text>Description</Text>
      </ResourceListHeaderContent>
      <ResourceListHeaderContent hidden>
        <Text>Price</Text>
      </ResourceListHeaderContent>
    </ResourceListHeader>
    <Item />
    <Item />
    <Item />
  </ResourceList>
);
