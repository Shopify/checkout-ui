import React from 'react';
import {mount} from '@quilted/react-testing/dom';

import {LiveRegion} from './LiveRegion';

describe('<LiveRegion />', () => {
  it('renders the children', () => {
    const children = <p>Hello world!</p>;
    const liveRegion = mount(<LiveRegion>{children}</LiveRegion>);

    expect(liveRegion).toContainReactComponent('div', {
      'aria-live': 'polite',
      'aria-atomic': true,
      role: 'status',
      children,
    });
  });
});
