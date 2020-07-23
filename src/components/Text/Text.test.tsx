import React from 'react';
import {mount} from '@quilted/react-testing/dom';

import {Text} from './Text';

describe('<Text />', () => {
  describe('children', () => {
    it('renders the children', () => {
      const content = 'Snowdevil';
      const text = mount(<Text>{content}</Text>);

      expect(text).toContainReactText(content);
    });

    it('renders a <span> tag by default', () => {
      const content = 'Snowdevil';
      const text = mount(<Text>{content}</Text>);

      expect(text).toContainReactComponent('span');
    });
  });

  describe('emphasized', () => {
    it('renders a <strong>', () => {
      const content = 'Snowdevil';
      const text = mount(<Text emphasized>{content}</Text>);

      expect(text).toContainReactComponent('strong');
    });
  });

  describe('role', () => {
    it('renders an <address> tag when role is "address"', () => {
      const content = 'Snowdevil';
      const text = mount(<Text role="address">{content}</Text>);

      expect(text).toContainReactComponent('address');
    });

    it('renders a <del> tag when role is "deletion"', () => {
      const children = 'Snowdevil';
      const text = mount(<Text role="deletion">{children}</Text>);

      expect(text).toContainReactComponent('del', {children});
    });

    it('renders an <abbr> tag when role type is "abbr"', () => {
      const children = 'GMV';
      const title = 'Gross Merchandise Volume';
      const text = mount(
        <Text role={{type: 'abbreviation', for: title}}>{children}</Text>,
      );

      expect(text).toContainReactComponent('abbr', {children, title});
    });

    it('renders a <bdo> tag when role type is "directional-override"', () => {
      const children = 'info@shopify.com';
      const dir = 'ltr';
      const text = mount(
        <Text role={{type: 'directional-override', direction: dir}}>
          {children}
        </Text>,
      );

      expect(text).toContainReactComponent('bdo', {children, dir});
    });

    it('renders a <time> tag when role type is "datetime"', () => {
      const children = 'May 20th, 2020';
      const dateTime = '2020-05-20';
      const text = mount(
        <Text role={{type: 'datetime', machineReadable: dateTime}}>
          {children}
        </Text>,
      );

      expect(text).toContainReactComponent('time', {children, dateTime});
    });
  });
});
