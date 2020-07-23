import React from 'react';

import {Spinner} from './Spinner';

const meta = {
  component: Spinner,
  title: 'Spinner',
};

export default meta;

export const defaultState = () => <Spinner />;

export const size = () => (
  <>
    <Spinner />
    <Spinner size="large" />
  </>
);

export const color = () => (
  <>
    <Spinner />
    <Spinner color="inherit" />
  </>
);

export const children = () => (
  <>
    <p>To see the accessible content, enable “Reduce Motion” in your OS.</p>
    <Spinner>Loading...</Spinner>
  </>
);
