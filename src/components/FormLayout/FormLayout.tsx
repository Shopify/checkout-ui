import React, {PropsWithChildren} from 'react';
import {FormLayoutProps, FormLayoutGroupProps} from '@shopify/argo-checkout';
import {classNames, variationName} from '@shopify/css-utilities';

import {BlockStack} from '../BlockStack';
import {useThemeConfiguration} from '../Theme';

import styles from './FormLayout.css';

export function FormLayout({children}: PropsWithChildren<FormLayoutProps>) {
  const {
    formLayout: {spacing},
  } = useThemeConfiguration();

  const normalizedSpacing = spacing === 'base' ? undefined : spacing;

  return <BlockStack spacing={normalizedSpacing}>{children}</BlockStack>;
}

export function FormLayoutGroup({
  children,
}: PropsWithChildren<FormLayoutGroupProps>) {
  const {
    formLayout: {spacing},
  } = useThemeConfiguration();

  return (
    <div
      className={classNames(
        styles.Group,
        spacing &&
          spacing !== 'base' &&
          styles[variationName('spacing', spacing)],
      )}
    >
      {children}
    </div>
  );
}
