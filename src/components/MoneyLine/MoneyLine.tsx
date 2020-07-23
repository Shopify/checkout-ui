import React from 'react';

import {View} from '../View';
import {Text} from '../Text';
import {TextBlock} from '../TextBlock';

import styles from './MoneyLine.css';

export interface Props {
  label: string;
  value?: string;
  subdued?: boolean;
  children?: React.ReactNode;
}

export function MoneyLine({label, value, subdued, children}: Props) {
  return (
    <div className={styles.MoneyLine} role="row">
      <div role="rowheader">
        <View>
          <Text>{label}</Text>
          {children}
        </View>
      </div>
      <div role="cell">
        <TextBlock subdued={subdued} emphasized={!subdued}>
          {value}
        </TextBlock>
      </div>
    </div>
  );
}

export function MoneyLineSeparator() {
  return <div className={styles.MoneyLineSeparator} />;
}
