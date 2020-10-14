import React from 'react';

import {InlineStack} from '../InlineStack';

import {Icon} from './Icon';

const meta = {
  component: Icon,
  title: 'Icon',
};

export default meta;

export const defaultState = () => <Icon source="questionFill" />;

export const color = () => (
  <InlineStack>
    <Icon source="questionFill" size="large" appearance="accent" />
    <Icon source="questionFill" size="large" appearance="interactive" />
    <Icon source="questionFill" size="large" appearance="subdued" />
    <Icon source="questionFill" size="large" appearance="info" />
    <Icon source="questionFill" size="large" appearance="success" />
    <Icon source="questionFill" size="large" appearance="warning" />
    <Icon source="questionFill" size="large" appearance="critical" />
  </InlineStack>
);

export const placeholder = () => <Icon source="placeholder" />;

export const allSizes = () => (
  <InlineStack>
    <Icon source="cart" size="small" />
    <Icon source="cart" size="default" />
    <Icon source="cart" size="large" />
  </InlineStack>
);

export const allIcons = () => (
  <InlineStack>
    <Icon source="caretDown" size="large" />
    <Icon source="checkmark" size="large" />
    <Icon source="chevronDown" size="large" />
    <Icon source="chevronUp" size="large" />
    <Icon source="chevronRight" size="large" />
    <Icon source="chevronLeft" size="large" />
    <Icon source="close" size="large" />
    <Icon source="critical" size="large" />
    <Icon source="discount" size="large" />
    <Icon source="delivery" size="large" />
    <Icon source="delivered" size="large" />
    <Icon source="disabled" size="large" />
    <Icon source="errorFill" size="large" />
    <Icon source="info" size="large" />
    <Icon source="lock" size="large" />
    <Icon source="mobile" size="large" />
    <Icon source="questionFill" size="large" />
    <Icon source="ship" size="large" />
    <Icon source="success" size="large" />
    <Icon source="warning" size="large" />
    <Icon source="warningFill" size="large" />
  </InlineStack>
);
