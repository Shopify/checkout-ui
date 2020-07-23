import React from 'react';
import {matchMedia} from '@shopify/jest-dom-mocks';

import {mountWithContext} from '../../test-utilities';
import {UnstyledLink} from '../Link';
import {Spinner} from '../Spinner';

import {Button} from './Button';

const defaultProps = {
  children: 'Go to next step',
};

describe('<Button />', () => {
  beforeEach(() => {
    matchMedia.mock();
  });

  afterEach(() => {
    matchMedia.restore();
  });

  describe('`<button />`', () => {
    describe('children', () => {
      it('renders the children into the button', () => {
        const text = 'Go to shipping';
        const button = mountWithContext(<Button>{text}</Button>);

        expect(button).toContainReactText(text);
      });

      it('renders the children into the link', () => {
        const text = 'Go to shipping';
        const linkButton = mountWithContext(
          <Button to="/shipping">{text}</Button>,
        );

        expect(linkButton).toContainReactText(text);
      });
    });

    describe('onPress()', () => {
      it('is called when button is pressed', () => {
        const onPressSpy = jest.fn();
        const button = mountWithContext(
          <Button {...defaultProps} onPress={onPressSpy} />,
        );

        button.find('button')!.trigger('onClick');
        expect(onPressSpy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('`<UnstyledLink />`', () => {
    it('renders when a url is provided', () => {
      const url = '/shipping';
      const button = mountWithContext(<Button {...defaultProps} to={url} />);
      expect(button).toContainReactComponent(UnstyledLink, {to: url});
    });

    it('renders a button when disabled', () => {
      const button = mountWithContext(
        <Button {...defaultProps} disabled to="/shipping" />,
      );

      expect(button).not.toContainReactComponent(UnstyledLink);
      expect(button).toContainReactComponent('button', {
        disabled: true,
      });
    });
  });

  describe('submit', () => {
    it('renders a type button when not present', () => {
      const button = mountWithContext(<Button {...defaultProps} />);
      expect(button).toContainReactComponent('button', {type: 'button'});
    });

    it('renders a type submit when present', () => {
      const button = mountWithContext(<Button {...defaultProps} submit />);
      expect(button).toContainReactComponent('button', {type: 'submit'});
    });
  });

  describe('loading', () => {
    it('disables button when loading', () => {
      const button = mountWithContext(<Button {...defaultProps} loading />);
      expect(button).toContainReactComponent('button', {disabled: true});
    });

    it('indicates that the button is getting updated', () => {
      const button = mountWithContext(<Button {...defaultProps} loading />);
      expect(button).toContainReactComponent('button', {'aria-busy': true});
    });

    it('renders a <Spinner> when loading', () => {
      matchMedia.setMedia(() => ({matches: false}));

      const button = mountWithContext(<Button {...defaultProps} loading />);
      expect(button).toContainReactComponent(Spinner);
    });

    it('renders the accessibleLabel as the Spinner children when provided', () => {
      const button = mountWithContext(
        <Button {...defaultProps} loadingLabel="Processing" loading />,
      );
      expect(button).toContainReactComponent(Spinner, {children: 'Processing'});
    });

    it('adds the Spinner class when user does not prefers reduced motion', () => {
      matchMedia.setMedia(() => ({matches: false}));

      const button = mountWithContext(
        <Button {...defaultProps} loadingLabel="Processing" loading />,
      );

      expect(button).toContainReactComponent('span', {
        className: 'LoadingContent Spinner',
      });
    });

    it('removes the Spinner class when user prefers reduced motion', () => {
      matchMedia.setMedia(() => ({matches: true}));

      const button = mountWithContext(
        <Button {...defaultProps} loadingLabel="Processing" loading />,
      );

      expect(button).not.toContainReactComponent('span', {
        className: 'LoadingContent Spinner',
      });
    });
  });
});
