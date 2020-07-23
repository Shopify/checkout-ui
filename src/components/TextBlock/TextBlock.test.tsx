import React from 'react';
import {mount} from '@quilted/react-testing/dom';

import {TextBlock} from './TextBlock';

describe('<TextBlock />', () => {
  describe('children', () => {
    it('renders the children', () => {
      const content = 'Snowdevil';
      const text = mount(<TextBlock>{content}</TextBlock>);

      expect(text).toContainReactText(content);
    });
  });
});
