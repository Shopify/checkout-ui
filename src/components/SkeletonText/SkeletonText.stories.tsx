import React from 'react';

import {SkeletonText} from './SkeletonText';

const meta = {
  component: SkeletonText,
  title: 'checkout-web-ui/SkeletonText',
};

export default meta;

export const defaultState = () => <SkeletonText />;

export const multipleLines = () => <SkeletonText lines={3} />;
