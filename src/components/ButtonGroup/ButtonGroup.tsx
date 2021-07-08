import React, {PropsWithChildren} from 'react';
import {ButtonGroupProps} from '@shopify/checkout-ui-extensions';

import {InlineStack} from '../InlineStack';

export function ButtonGroup({children}: PropsWithChildren<ButtonGroupProps>) {
  return <InlineStack alignment="center">{children}</InlineStack>;
}
