import React from 'react';
import {mount} from '@quilted/react-testing/dom';

import {BlockSpacer} from './BlockSpacer';

describe('<BlockSpacer />', () => {
  it('renders a placeholder in a <div>', () => {
    const blockSpacer = mount(<BlockSpacer />);

    expect(blockSpacer).toContainReactComponent('div');
  });
});
