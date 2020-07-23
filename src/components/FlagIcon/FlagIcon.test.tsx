import React from 'react';
import {mount} from '@quilted/react-testing/dom';

import {FlagIcon} from './FlagIcon';

describe('<FlagIcon />', () => {
  it('renders an <img>', () => {
    const flagIcon = mount(<FlagIcon countryCode="ca" />);

    expect(flagIcon).toContainReactComponent('img');
  });

  it('sets src and an alt attributes', () => {
    const flagIcon = mount(
      <FlagIcon countryCode="ca" accessibilityLabel="Canada" />,
    );

    expect(flagIcon).toContainReactComponent('img', {
      src: 'ca.svg',
      alt: 'Canada',
    });
  });
});
