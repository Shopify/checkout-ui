import React from 'react';
import {mount} from '@quilted/react-testing/dom';
import faker from 'faker';

import {InlineError} from './InlineError';

describe('<InlineError />', () => {
  it('renders the message', () => {
    const message = faker.random.words();
    const id = faker.random.alphaNumeric();

    const inlineError = mount(
      <InlineError controlID={id}>{message}</InlineError>,
    );

    expect(inlineError).toContainReactComponent('p', {
      children: message,
      id: `error-for-${id}`,
    });
  });
});
