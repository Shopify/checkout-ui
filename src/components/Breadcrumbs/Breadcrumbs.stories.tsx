import React from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {themeWithKnobs} from '../../storybook-utilities';

import {Breadcrumbs} from '.';

const meta = {
  component: Breadcrumbs,
  title: 'checkout-web-ui/Breadcrumbs',
  decorators: [withKnobs, themeWithKnobs('buyerJourney')],
};

export default meta;

export const defaultState = () => (
  <Breadcrumbs
    breadcrumbs={[
      {id: 'information', to: '/information', content: 'Information'},
      {id: 'shipping', to: '/shipping', content: 'Shipping'},
      {id: 'payment', to: '/payment', content: 'Payment'},
    ]}
  />
);

export const withActiveBreadcrumb = () => (
  <Breadcrumbs
    active="shipping"
    breadcrumbs={[
      {id: 'information', to: '/information', content: 'Information'},
      {id: 'shipping', to: '/shipping', content: 'Shipping'},
      {id: 'payment', to: '/payment', content: 'Payment'},
    ]}
  />
);

export const withDisabledBreadcrumb = () => (
  <Breadcrumbs
    breadcrumbs={[
      {id: 'information', to: '/information', content: 'Information'},
      {id: 'shipping', to: '/shipping', content: 'Shipping'},
      {id: 'payment', to: '/payment', content: 'Payment', disabled: true},
    ]}
  />
);
