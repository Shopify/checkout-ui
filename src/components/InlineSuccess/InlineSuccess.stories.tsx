import React from 'react';

import {InlineSuccess} from './InlineSuccess';

const meta = {
  component: InlineSuccess,
  title: 'InlineSuccess',
};

export default meta;

export const defaultState = () => (
  <InlineSuccess controlID="randomID">This is a success message</InlineSuccess>
);
