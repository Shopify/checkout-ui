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

  it('removes the Spinner when user prefers reduced motion and that accessible content is provided', () => {
    matchMedia.setMedia(() => ({matches: true}));

    const spinner = mountWithContext(<Spinner accessibilityLabel="Loading" />);

    expect(spinner).not.toContainReactComponent('div', {
      className: 'Spinner',
    });
  });

  it('renders an Icon when user prefers motion', () => {
    matchMedia.setMedia(() => ({matches: false}));

    const spinner = mountWithContext(<Spinner />);

    expect(spinner).toContainReactComponent(Icon);
  });

  describe('accessibilityLabel', () => {
    it('renders the accessible label if user prefers reduced motion', () => {
      matchMedia.setMedia(() => ({matches: true}));

      const accessibleText = 'Loading';
      const spinner = mountWithContext(
        <Spinner accessibilityLabel={accessibleText} />,
      );

      expect(spinner).toContainReactText(accessibleText);
    });

    it('does not renders the accessible label if user prefers motion', () => {
      matchMedia.setMedia(() => ({matches: false}));

      const accessibleText = 'Loading';
      const spinner = mountWithContext(
        <Spinner accessibilityLabel={accessibleText} />,
      );

      expect(spinner).not.toContainReactText(accessibleText);
    });
  });

  describe('color', () => {
    it('renders an Icon with "accent" color by default', () => {
      const spinner = mountWithContext(<Spinner />);

      expect(spinner).toContainReactComponent(Icon, {
        appearance: 'accent',
      });
    });

    it('renders an Icon with with no color prop if "inherit" is passed', () => {
      const spinner = mountWithContext(<Spinner color="inherit" />);

      expect(spinner).toContainReactComponent(Icon, {appearance: undefined});
    });
  });
});
