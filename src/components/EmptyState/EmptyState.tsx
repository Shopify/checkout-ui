import React from 'react';

import {TextContainer} from '../TextContainer';
import {BlockStack} from '../BlockStack';
import {TextBlock} from '../TextBlock';

import styles from './EmptyState.css';

export function EmptyState({children}: React.PropsWithChildren<{}>) {
  return (
    <div className={styles.Wrapper}>
      <BlockStack spacing="tight" alignment="center">
        {children}
      </BlockStack>
    </div>
  );
}

export function EmptyStateIcon({children}: React.PropsWithChildren<{}>) {
  return <div className={styles.Icon}>{children}</div>;
}

export function EmptyStateText({children}: React.PropsWithChildren<{}>) {
  return (
    <TextContainer alignment="center">
      <TextBlock>{children}</TextBlock>
    </TextContainer>
  );
}
