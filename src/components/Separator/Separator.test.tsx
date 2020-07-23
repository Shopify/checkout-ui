import React from 'react';
import {mount} from '@quilted/react-testing/dom';

import {Separator} from './Separator';

describe('<Separator />', () => {
  it('renders horizontal by default', () => {
    const separator = mount(<Separator />);

    expect(separator).toContainReactComponent('div', {
      style: {
        borderBottomWidth: '1px',
      },
    });
  });

  it('renders vertical', () => {
    const separator = mount(<Separator direction="vertical" />);

    expect(separator).toContainReactComponent('div', {
      style: {
        borderRightWidth: '1px',
      },
    });
  });

  it('renders width', () => {
    const separator = mount(<Separator width="thick" />);

    expect(separator).toContainReactComponent('div', {
      style: {
        borderBottomWidth: '5px',
      },
    });
  });
});
