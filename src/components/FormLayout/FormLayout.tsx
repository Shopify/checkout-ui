import React, {PropsWithChildren} from 'react';
import {FormLayoutProps, FormLayoutGroupProps} from '@shopify/argo-checkout';

import {BlockStack} from '../BlockStack';
import {Layout} from '../Layout';
import {useThemeConfiguration} from '../Theme';

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
    formLayout: {spacing = 'base'},
  } = useThemeConfiguration();

  const normalizedSpacing = spacing === 'none' ? undefined : spacing;

  return (
    <Layout
      sizes={{base: [1, 1, 1], small: ['fill', 'fill', 'fill']}}
      spacing={normalizedSpacing}
    >
      {children}
    </Layout>
  );
}
