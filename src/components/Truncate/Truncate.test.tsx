import React from 'react';
import {mount} from '@quilted/react-testing/dom';

import {Truncate} from './Truncate';

describe('<Truncate />', () => {
  describe('children', () => {
    it('renders the children in a span', () => {
      const content = 'Snowdevil';
      const truncate = mount(<Truncate>{content}</Truncate>);

      expect(truncate).toContainReactComponent('span', {children: content});
    });
  });
});
