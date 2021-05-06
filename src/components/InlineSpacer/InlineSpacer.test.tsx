import React from 'react';
import {mount} from '@quilted/react-testing/dom';

import {InlineSpacer} from './InlineSpacer';

describe('<InlineSpacer />', () => {
  it('renders a placeholder in a <div>', () => {
    const inlineSpacer = mount(<InlineSpacer />);

    expect(inlineSpacer).toContainReactComponent('div');
  });
});
