import React from 'react';
import faker from 'faker';

import {mountWithContext} from '../../../../test-utilities';

import {UnstyledLink, Props} from './UnstyledLink';

const defaultProps: Props = {
  to: faker.internet.url(),
};

describe('<UnstyledLink />', () => {
  it('renders an anchor with expected target and rel if external', () => {
    const unstyledLink = mountWithContext(
      <UnstyledLink {...defaultProps} external />,
    );

    expect(unstyledLink).toContainReactComponent('a', {
      target: '_blank',
      rel: 'noopener noreferrer',
    });
  });

  it('renders an anchor without target or rel if not external', () => {
    const unstyledLink = mountWithContext(<UnstyledLink {...defaultProps} />);

    expect(unstyledLink).toContainReactComponent('a', {
      target: undefined,
      rel: undefined,
    });
  });

  it('renders a custom link provided by the consumer', () => {
    function CustomLink() {
      return <div>No navigation allowed!</div>;
    }

    const unstyledLink = mountWithContext(<UnstyledLink {...defaultProps} />, {
      linkComponent: CustomLink,
    });

    expect(unstyledLink).toContainReactComponent(CustomLink, defaultProps);
  });

  describe('language', () => {
    it('renders an anchor with lang attribute', () => {
      const unstyledLink = mountWithContext(
        <UnstyledLink {...defaultProps} language="en" />,
      );

      expect(unstyledLink).toContainReactComponent('a', {
        lang: 'en',
      });
    });
  });

  describe('ariaBusy', () => {
    it('renders an anchor with aria-busy when set', () => {
      const unstyledLink = mountWithContext(
        <UnstyledLink {...defaultProps} ariaBusy />,
      );

      expect(unstyledLink).toContainReactComponent('a', {
        'aria-busy': true,
      });
    });

    it('does not renders with aria-busy when not set', () => {
      const unstyledLink = mountWithContext(<UnstyledLink {...defaultProps} />);

      expect(unstyledLink).toContainReactComponent('a', {
        'aria-busy': undefined,
      });
    });
  });

  describe('ariaLive', () => {
    it('renders an anchor with aria-live value when set', () => {
      const unstyledLink = mountWithContext(
        <UnstyledLink {...defaultProps} ariaLive="assertive" />,
      );

      expect(unstyledLink).toContainReactComponent('a', {
        'aria-live': 'assertive',
      });
    });

    it('does not renders with aria-live when not set', () => {
      const unstyledLink = mountWithContext(<UnstyledLink {...defaultProps} />);

      expect(unstyledLink).toContainReactComponent('a', {
        'aria-live': undefined,
      });
    });
  });

  describe('ariaLabel', () => {
    it('renders an anchor with aria-label when set', () => {
      const content = 'Accessible label';
      const unstyledLink = mountWithContext(
        <UnstyledLink {...defaultProps} ariaLabel={content} />,
      );

      expect(unstyledLink).toContainReactComponent('a', {
        'aria-label': content,
      });
    });

    it('does not renders with aria-live when not set', () => {
      const unstyledLink = mountWithContext(<UnstyledLink {...defaultProps} />);

      expect(unstyledLink).toContainReactComponent('a', {
        'aria-label': undefined,
      });
    });
  });
});
