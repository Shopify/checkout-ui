import React from 'react';
import {mount} from '@quilted/react-testing/dom';

import {chevronDown} from '../../icons';

import {Icon} from './Icon';

describe('<Icon />', () => {
  it('renders a placeholder in a <div>', () => {
    const icon = mount(<Icon source="placeholder" />);

    expect(icon).toContainReactComponent('div');
  });

  it('renders an actual icon>', () => {
    const icon = mount(<Icon source="chevronDown" />);

    expect(icon).toContainReactComponent(chevronDown);
  });

  it('renders a <span> with a aria-label attribute', () => {
    const icon = mount(
      <Icon source="placeholder" accessibilityLabel="Some icon" />,
    );

    expect(icon).toContainReactComponent('span', {'aria-label': 'Some icon'});
  });
});
