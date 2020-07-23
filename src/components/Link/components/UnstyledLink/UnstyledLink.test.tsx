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
});
