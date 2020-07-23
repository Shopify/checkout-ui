import React from 'react';
import {matchMedia} from '@shopify/jest-dom-mocks';

import {mountWithContext} from '../../test-utilities';
import {Icon} from '../Icon';

import {Spinner} from './Spinner';

describe('<Spinner />', () => {
  beforeEach(() => {
    matchMedia.mock();
  });

  afterEach(() => {
    matchMedia.restore();
  });

  it('removes the Spinner styling when user prefers reduced motion and that accessible content is provided', () => {
    matchMedia.setMedia(() => ({matches: true}));

    const spinner = mountWithContext(<Spinner>Loading</Spinner>);

    expect(spinner).not.toContainReactComponent('div', {
      className: 'Spinner',
    });
  });

  describe('children', () => {
    it('renders the childrens if user prefers reduced motion', () => {
      matchMedia.setMedia(() => ({matches: true}));

      const accessibleText = 'Loading';
      const spinner = mountWithContext(<Spinner>{accessibleText}</Spinner>);

      expect(spinner).toContainReactText(accessibleText);
    });

    it('does not renders the childrens if user does not prefers reduced motion', () => {
      matchMedia.setMedia(() => ({matches: false}));

      const accessibleText = 'Loading';
      const spinner = mountWithContext(<Spinner>{accessibleText}</Spinner>);

      expect(spinner).not.toContainReactText(accessibleText);
    });

    it('renders an Icon if childrens are not provided', () => {
      const spinner = mountWithContext(<Spinner />);

      expect(spinner).toContainReactComponent(Icon);
    });
  });

  describe('color', () => {
    it('renders an Icon with "interactive" color by default', () => {
      const spinner = mountWithContext(<Spinner />);

      expect(spinner).toContainReactComponent(Icon, {color: 'interactive'});
    });

    it('renders an Icon with with no color prop if "inherit" is passed', () => {
      const spinner = mountWithContext(<Spinner color="inherit" />);

      expect(spinner).toContainReactComponent(Icon, {color: undefined});
    });
  });
});
