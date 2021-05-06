import React from 'react';
import {mount} from '@quilted/react-testing/dom';

import {View} from './View';

describe('<View />', () => {
  describe('children', () => {
    it('renders its children', () => {
      const text = 'Snowdevil';
      const view = mount(<View>{text} </View>);

      expect(view).toContainReactText(text);
    });
  });

  describe('display', () => {
    it('renders a div by default', () => {
      const text = 'Snowdevil';
      const view = mount(<View>{text} </View>);

      expect(view).toContainReactComponent('div');
    });

    it('renders a span when "inline" is set', () => {
      const text = 'Snowdevil';
      const view = mount(<View display="inline">{text} </View>);

      expect(view).toContainReactComponent('span');
    });

    it('renders a div when "block" is set', () => {
      const text = 'Snowdevil';
      const view = mount(<View display="block">{text} </View>);

      expect(view).toContainReactComponent('div');
    });
  });

  describe('accessibilityVisibility', () => {
    it('sets aria-hidden to true when accessibilityVisibility is set', () => {
      const text = 'Snowdevil';
      const view = mount(<View accessibilityVisibility="hidden">{text} </View>);

      expect(view).toContainReactComponent('div', {'aria-hidden': true});
    });

    it('sets aria-hidden to false when accessibilityVisibility is not set', () => {
      const text = 'Snowdevil';
      const view = mount(<View>{text} </View>);

      expect(view).toContainReactComponent('div', {'aria-hidden': false});
    });
  });
});
