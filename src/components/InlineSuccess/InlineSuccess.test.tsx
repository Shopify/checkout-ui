import React from 'react';
import {mount} from '@quilted/react-testing/dom';
import faker from 'faker';

import {InlineSuccess} from './InlineSuccess';

describe('<InlineSuccess />', () => {
  it('renders the message', () => {
    const message = faker.random.words();
    const id = faker.random.alphaNumeric();

    const inlineSuccess = mount(
      <InlineSuccess controlID={id}>{message}</InlineSuccess>,
    );

    expect(inlineSuccess).toContainReactComponent('p', {
      id: `success-for-${id}`,
      children: message,
    });
  });
});
