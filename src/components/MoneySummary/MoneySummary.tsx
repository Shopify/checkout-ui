import React, {PropsWithChildren} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';

import {InlineStack} from '../InlineStack';
import {Text} from '../Text';
import {useThemeConfiguration} from '../Theme';
import {MoneyLineSeparator} from '../MoneyLine';

import styles from './MoneySummary.css';

export interface Props {
  label: string;
  value: string;
  prefix: string;
}

export function MoneySummary({
  label,
  value,
  prefix,
  children,
}: PropsWithChildren<Props>) {
  const {
    moneyLines: {inlineAlignment},
    moneySummary: {
      background,
      currencyCode = true,
      separator = true,
      labelTypographyStyle,
      currencyTypographyStyle,
      valueTypographyStyle,
    },
  } = useThemeConfiguration();

  const className = classNames(
    styles.MoneySummary,
    background && styles[variationName('background', background)],
    inlineAlignment &&
      styles[variationName('inlineAlignment', inlineAlignment)],
  );

  return (
    <>
      {separator && <MoneyLineSeparator />}
      <div className={className} role="row">
        <div className={styles.Label} role="rowheader">
          <Text size="medium" style={labelTypographyStyle}>
            {label}
          </Text>
          {children}
        </div>
        <div className={styles.Value} role="cell">
          <InlineStack alignment="baseline" spacing="tight">
            {/* TODO:
            - change API so its clearer that the prefix is a currency
            - add a title for abbr (CAD -> Canadian Dollars) */}
            {currencyCode && (
              <Text
                role={{type: 'abbreviation'}}
                size="small"
                subdued
                style={currencyTypographyStyle}
              >
                {prefix}
              </Text>
            )}
            <Text emphasized size="extraLarge" style={valueTypographyStyle}>
              {value}
            </Text>
          </InlineStack>
        </div>
      </div>
    </>
  );
}
