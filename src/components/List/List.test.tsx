import React from 'react';

import {mountWithContext} from '../../test-utilities';

import {List, ListItem} from './List';

describe('<List />', () => {
  describe('children', () => {
    it('renders the children', () => {
      const content = 'Snowdevil';
      const list = mountWithContext(<List>{content}</List>);

      expect(list).toContainReactText(content);
    });

    it('renders a <ul> tag by default', () => {
      const content = 'Snowdevil';
      const list = mountWithContext(<List>{content}</List>);

      expect(list).toContainReactComponent('ul');
    });
  });

  describe('marker', () => {
    it('renders a <ol> tag when marker set to "number"', () => {
      const content = 'Snowdevil';
      const list = mountWithContext(<List marker="number">{content}</List>);

      expect(list).toContainReactComponent('ol');
    });

    it('sets a role of "list" for accessibility when marker is "none"', () => {
      const content = 'Snowdevil';
      const list = mountWithContext(<List marker="none">{content}</List>);

      expect(list).toContainReactComponent('ul', {role: 'list'});
    });
  });
});

describe('<ListItem />', () => {
  describe('children', () => {
    it('renders the children', () => {
      const content = 'Snowdevil';
      const list = mountWithContext(
        <List>
          <ListItem>{content}</ListItem>
        </List>,
      );

      expect(list).toContainReactText(content);
    });
  });
});
