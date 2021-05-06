import React from 'react';

import {InlineError} from './InlineError';

const meta = {
  component: InlineError,
  title: 'checkout-web-ui/InlineError',
};

export default meta;

export const defaultState = () => (
  <InlineError controlID="randomID">This is an error message</InlineError>
);
