import React from 'react';
import {mount} from '@quilted/react-testing/dom';

import {SkeletonText} from './SkeletonText';

describe('<SkeletonText />', () => {
  it('renders a skeleton with the default number of lines', () => {
    const skeletonText = mount(<SkeletonText />);

    expect(skeletonText.find('div')).toContainReactComponentTimes('div', 1);
  });

  it('renders a skeleton with 10 lines', () => {
    const skeletonText = mount(<SkeletonText lines={10} />);

    expect(skeletonText.find('div')).toContainReactComponentTimes('div', 10);
  });
});
