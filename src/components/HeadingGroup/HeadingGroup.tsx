import React, {PropsWithChildren} from 'react';
import {HeadingGroupProps} from '@shopify/checkout-ui-extensions';

import {AutoHeadingGroup} from '../../utilities/auto-headings';

export function HeadingGroup({children}: PropsWithChildren<HeadingGroupProps>) {
  return <AutoHeadingGroup>{children}</AutoHeadingGroup>;
}
