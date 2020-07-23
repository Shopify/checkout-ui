import React, {PropsWithChildren} from 'react';
import {FormLayoutProps, FormLayoutGroupProps} from '@shopify/argo-checkout';

import {BlockStack} from '../BlockStack';

import styles from './FormLayout.css';

export function FormLayout({children}: PropsWithChildren<FormLayoutProps>) {
  return <BlockStack>{children}</BlockStack>;
}

export function FormLayoutGroup({
  children,
}: PropsWithChildren<FormLayoutGroupProps>) {
  return <div className={styles.Group}>{children}</div>;
}
