import React from 'react';

import {Spinner} from './Spinner';

const meta = {
  component: Spinner,
  title: 'checkout-web-ui/Spinner',
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

export const accessibilityLabel = () => (
  <>
    <p>To see the accessible content, enable “Reduce Motion” in your OS.</p>
    <Spinner accessibilityLabel="Loading..." />
  </>
);
