import React from 'react';
import {classNames, variationName} from '@shopify/css-utilities';

import {InlineStack} from '../InlineStack';
import {Text} from '../Text';
import {useThemeConfiguration} from '../Theme';

import styles from './MoneyLine.css';

export interface Props {
  label: string;
  value?: string;
  subdued?: boolean;
  childPosition?: 'default' | 'end';
  children?: React.ReactNode;
}

export function MoneyLine({
  label,
  value,
  subdued,
  childPosition,
  children,
}: Props) {
  const {
    moneyLines: {
      background,
      inlineAlignment,
      labelTypographyStyle,
      valueTypographyStyle,
    },
  } = useThemeConfiguration();

  const className = classNames(
    styles.MoneyLine,
    background && styles[variationName('background', background)],
    inlineAlignment &&
      styles[variationName('inlineAlignment', inlineAlignment)],
  );

  return (
    <div className={className} role="row">
      <div className={styles.Label} role="rowheader">
        <InlineStack spacing="tight">
          <Text style={labelTypographyStyle}>{label}</Text>
          {(!childPosition || childPosition === 'default') && children}
        </InlineStack>
      </div>
      <div className={styles.Value} role="cell">
        <InlineStack spacing="tight">
          <Text
            subdued={subdued}
            emphasized={!subdued}
            size={subdued ? 'small' : undefined}
            style={valueTypographyStyle}
          >
            {value}
          </Text>
          {childPosition === 'end' && children}
        </InlineStack>
      </div>
    </div>
  );
}

export function MoneyLineSeparator() {
  return <div className={styles.MoneyLineSeparator} />;
}
