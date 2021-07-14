import React from 'react';

import {mountWithContext} from '../../test-utilities';

import {Collapsible} from './Collapsible';

describe('<Collapsible />', () => {
  describe('open', () => {
    it('renders children but is hidden when closed', () => {
      const collapsible = mountWithContext(
        <Collapsible id="test-collapsible" open={false}>
          content
        </Collapsible>,
      );

      expect(collapsible).toContainReactComponent('div', {
        'aria-expanded': false,
        hidden: true,
        style: {height: 0},
      });
      expect(collapsible).toContainReactText('content');
    });

    it('renders children and is aria-expanded when open', () => {
      const collapsible = mountWithContext(
        <Collapsible id="test-collapsible" open>
          content
        </Collapsible>,
      );

      expect(collapsible).toContainReactComponent('div', {
        'aria-expanded': true,
        hidden: false,
        style: {height: 'auto'},
      });
      expect(collapsible).toContainReactText('content');
    });
  });

  describe('minSize', () => {
    it('height is set to minSize when closed and not hidden', () => {
      const minSize = 50;
      const collapsible = mountWithContext(
        <Collapsible id="test-collapsible" open={false} minSize={minSize}>
          content
        </Collapsible>,
      );

      expect(collapsible).toContainReactComponent('div', {
        'aria-expanded': false,
        hidden: false,
        style: {height: minSize},
      });
    });
  });
});
