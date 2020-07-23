import React from 'react';
import {mount} from '@quilted/react-testing/dom';

import {SkeletonThumbnail} from './SkeletonThumbnail';

describe('<SkeletonThumbnail />', () => {
  it('renders', () => {
    const skeletonThumbnail = mount(<SkeletonThumbnail />);

    expect(skeletonThumbnail).toContainReactComponent('div');
  });
});
