import React from 'react';
import {mount} from '@quilted/react-testing/dom';
import faker from 'faker';

import {ResourceItem} from '../ResourceItem';

import {
  ResourceList,
  ResourceListHeader,
  ResourceListHeaderContent,
} from './ResourceList';

describe('<ResourceList />', () => {
  it('renders its children', () => {
    const resourceList = mount(
      <ResourceList>
        <ResourceItem>{faker.random.words()}</ResourceItem>
        <ResourceItem>{faker.random.words()}</ResourceItem>
      </ResourceList>,
    );

    expect(resourceList).toContainReactComponentTimes(ResourceItem, 2);
  });
});

describe('<ResourceListHeader />', () => {
  it('renders its children', () => {
    const resourceHeader = mount(
      <ResourceListHeader>
        <ResourceListHeaderContent>
          {faker.random.words()}
        </ResourceListHeaderContent>
        <ResourceListHeaderContent>
          {faker.random.words()}
        </ResourceListHeaderContent>
      </ResourceListHeader>,
    );

    expect(resourceHeader).toContainReactComponentTimes(
      ResourceListHeaderContent,
      2,
    );
  });
});
