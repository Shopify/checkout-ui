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

export const borderAroundItems = () => (
  <ResourceList border="aroundItems">
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
  <ResourceList titleHidden title="title">
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
