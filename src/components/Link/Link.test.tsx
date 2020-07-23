import React from 'react';
import faker from 'faker';

import {mountWithContext} from '../../test-utilities';

import {Link} from './Link';
import {UnstyledLink} from './components';

describe('<Link />', () => {
  it('renders an UnstyledLink if "to" is provided', () => {
    const props = {to: faker.internet.url()};
    const link = mountWithContext(<Link {...props} />);

    expect(link).toContainReactComponent(UnstyledLink, props);
  });

  it('renders a button if "to" is not provided', () => {
    const link = mountWithContext(<Link onPress={() => null} to={undefined} />);
    expect(link).toContainReactComponent('button');
  });
});
