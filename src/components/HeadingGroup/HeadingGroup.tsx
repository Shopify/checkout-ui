import React, {PropsWithChildren} from 'react';
import {HeadingGroupProps} from '@shopify/argo-checkout';

import {AutoHeadingGroup} from '../../utilities/auto-headings';

export function HeadingGroup({children}: PropsWithChildren<HeadingGroupProps>) {
  return <AutoHeadingGroup>{children}</AutoHeadingGroup>;
}
