import React, {PropsWithChildren} from 'react';
import {AutoHeadingGroup} from '@quilted/react-auto-headings';
import {HeadingGroupProps} from '@shopify/argo-checkout';

export function HeadingGroup({children}: PropsWithChildren<HeadingGroupProps>) {
  return <AutoHeadingGroup>{children}</AutoHeadingGroup>;
}
