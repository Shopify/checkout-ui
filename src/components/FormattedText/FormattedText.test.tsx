import React from 'react';
import {mount} from '@quilted/react-testing/dom';

import {FormattedText} from './FormattedText';

describe('<FormattedText />', () => {
  describe('content', () => {
    it('renders its content', () => {
      const content = 'Snowdevil';
      const formatted = mount(<FormattedText>{content}</FormattedText>);

      expect(formatted).toContainReactText(content);
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
