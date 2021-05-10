import React from 'react';
import {mount} from '@quilted/react-testing/dom';
import faker from 'faker';

import {ResourceItem, ResourceItemContent} from './ResourceItem';

describe('<ResourceItem />', () => {
  it('renders <ResourceItemContent />', () => {
    const resourceItem = mount(
      <ResourceItem>
        <ResourceItemContent>
          <img src={faker.image.imageUrl()} alt={faker.random.words()} />
        </ResourceItemContent>
      </ResourceItem>,
    );

    expect(resourceItem).toContainReactComponent(ResourceItemContent);
  });

  it('renders a primary <ResourceItemContent />', () => {
    const resourceItem = mount(
      <ResourceItem>
        <ResourceItemContent primary>
          {faker.random.words()}
        </ResourceItemContent>
      </ResourceItem>,
    );

    expect(resourceItem).toContainReactComponent(ResourceItemContent);
  });
});
