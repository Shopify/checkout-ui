import React from 'react';
import {mount} from '@quilted/react-testing/dom';

import {Text} from '../Text';

import {FormattedText} from './FormattedText';

describe('<FormattedText />', () => {
  describe('content', () => {
    it('renders a string when passed a string as content', () => {
      const content = 'Snowdevil';
      const formatted = mount(<FormattedText>{content}</FormattedText>);

      expect(formatted).toContainReactText(content);
    });

    it('renders a React component when passed a component as content', () => {
      const content = <Text>Text</Text>;
      const formatted = mount(<FormattedText>{content}</FormattedText>);

      expect(formatted).toContainReactComponent(Text);
    });

    it('replaces new line characters by <br>s', () => {
      const content = '490 Rue De La Gauchetiere O,\nMontreal,\nQC\nH2Z 0B3';
      const formatted = mount(<FormattedText>{content}</FormattedText>);

      expect(formatted).toContainReactHtml(
        '490 Rue De La Gauchetiere O,<br>Montreal,<br>QC<br>H2Z 0B3',
      );
    });
  });
});
