import React from 'react';
import {mount} from '@quilted/react-testing/dom';
import faker from 'faker';

import {View} from './View';

describe('<View />', () => {
  describe('children', () => {
    it('renders its children', () => {
      const text = 'Snowdevil';
      const view = mount(<View>{text} </View>);

      expect(view).toContainReactText(text);
    });
  });

  describe('id', () => {
    it('sets id when id is set', () => {
      const id = faker.random.uuid();
      const view = mount(<View id={id} />);

      expect(view).toContainReactComponent('div', {
        id,
      });
    });
  });

  describe('role', () => {
    it('renders a div by default', () => {
      const text = 'Snowdevil';
      const view = mount(<View>{text} </View>);

      expect(view).toContainReactComponent('div');
    });

    it('renders a section when "region" is set', () => {
      const view = mount(<View role="region" />);

      expect(view).toContainReactComponent('section');
    });

    it('renders an aside when "complimentary" is set', () => {
      const view = mount(<View role="complementary" />);

      expect(view).toContainReactComponent('aside');
    });
  });

  describe('accessibilityVisibility', () => {
    it('sets aria-hidden to true when accessibilityVisibility is set', () => {
      const text = 'Snowdevil';
      const view = mount(<View accessibilityVisibility="hidden">{text} </View>);

      expect(view).toContainReactComponent('div', {'aria-hidden': true});
    });

    it('does not set aria-hidden when accessibilityVisibility is not set', () => {
      const text = 'Snowdevil';
      const view = mount(<View>{text} </View>);

      expect(view).toContainReactComponent('div', {'aria-hidden': undefined});
    });
  });

  describe('accessibilityLabel', () => {
    it('sets aria-label with accessibilityLabel if role is set', () => {
      const text = faker.random.words();
      const view = mount(<View accessibilityLabel={text} role="region" />);

      expect(view).toContainReactComponent('section', {'aria-label': text});
    });

    it('does not set aria-label if role is not set', () => {
      const text = faker.random.words();
      const view = mount(<View accessibilityLabel={text} />);

      expect(view).not.toContainReactComponent('div', {'aria-label': text});
    });
  });
});
