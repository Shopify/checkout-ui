import React from 'react';

import {Icon} from '../Icon';

import {EmptyState, EmptyStateIcon, EmptyStateText} from './EmptyState';

const meta = {
  component: EmptyState,
  title: 'checkout-web-ui/EmptyState',
};

export default meta;

export const defaultState = () => {
  return (
    <EmptyState>
      <EmptyStateText>No results.</EmptyStateText>
    </EmptyState>
  );
};

export const withIcon = () => {
  return (
    <EmptyState>
      <EmptyStateIcon>
        <Icon source="info" />
      </EmptyStateIcon>
      <EmptyStateText>No results.</EmptyStateText>
    </EmptyState>
  );
};
