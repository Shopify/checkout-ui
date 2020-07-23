import React, {PropsWithChildren} from 'react';
import {ButtonGroupProps} from '@shopify/argo-checkout';

import {InlineStack} from '../InlineStack';

export function ButtonGroup({children}: PropsWithChildren<ButtonGroupProps>) {
  return <InlineStack>{children}</InlineStack>;
}
