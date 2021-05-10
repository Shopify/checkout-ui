import React from 'react';
import {mount} from '@quilted/react-testing/dom';

import {Redact} from './Redact';

describe('<Redact />', () => {
  describe('lines', () => {
    it('defaults to one line', () => {
      const redacted = mount(<Redact />);
      expect(redacted).toContainReactComponentTimes('div', 1);
    });

    it('renders the exact number of lines', () => {
      const redacted = mount(<Redact lines={3} />);
      expect(redacted).toContainReactComponentTimes('div', 3);
    });
  });

  describe('blockSize', () => {
    it('defaults to base blockSize', () => {
      const redacted = mount(<Redact />);
      const classNames = redacted.find('div')!.prop('className');
      expect(classNames).toContain('blockSizeBase');
    });

    it('renders with specific blockSize', () => {
      const redacted = mount(<Redact blockSize="large" />);
      const classNames = redacted.find('div')!.prop('className');
      expect(classNames).toContain('blockSizeLarge');
    });
  });
});
