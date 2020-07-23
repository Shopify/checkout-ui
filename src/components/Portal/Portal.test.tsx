import React from 'react';
import {mount} from '@quilted/react-testing/dom';

import {Portal} from './Portal';

describe('<Portal />', () => {
  it('renders the children in document body', () => {
    mount(
      <Portal>
        <div className="test" />
      </Portal>,
    );

    expect(document.body.querySelectorAll('.test')).toHaveLength(1);
  });
});
