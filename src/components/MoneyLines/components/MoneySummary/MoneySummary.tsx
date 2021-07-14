import React, {ReactNode} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';

import {InlineStack} from '../../../InlineStack';
import {Text} from '../../../Text';
import {Divider} from '../../../Divider';
import {useThemeConfiguration} from '../../../Theme';

import styles from './MoneySummary.css';

interface ChildrenProps {
  children?: ReactNode;
}

interface MoneyLineProps {
  label: string;
  value: string;
  prefix: string;
}

function hasChildren(props: Props | ChildrenProps): props is ChildrenProps {
  return (props as ChildrenProps).children !== undefined;
}

export type Props = MoneyLineProps | ChildrenProps;

export function MoneySummary(props: Props) {
  const {
    moneyLines: {divided, dividerSpacing, inlineAlignment},
    moneySummary: {
      background,
      blockPadding,
      currencyCode = true,
      currencyTypographyStyle,
      inlinePadding,
      labelTypographyStyle,
      valueTypographyStyle,
    },
  } = useThemeConfiguration();

  const className = classNames(
    styles.MoneySummary,
    background && styles[variationName('background', background)],
    blockPadding && styles[variationName('blockPadding', blockPadding)],
    inlineAlignment &&
      styles[variationName('inlineAlignment', inlineAlignment)],
    inlinePadding && styles[variationName('inlinePadding', inlinePadding)],
  );

  return (
    <>
      {divided && <Divider blockSpacing={dividerSpacing} />}
      <div className={className} role="row">
        {hasChildren(props) ? (
          props.children
        ) : (
          <>
            <MoneySummaryHeader>
              <Text emphasized size="medium" style={labelTypographyStyle}>
                {props.label}
              </Text>
            </MoneySummaryHeader>
            <MoneySummaryContent>
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
                    {props.prefix}
                  </Text>
                )}
                <Text emphasized size="extraLarge" style={valueTypographyStyle}>
                  {props.value}
                </Text>
              </InlineStack>
            </MoneySummaryContent>
          </>
        )}
      </div>
    </>
  );
}

export function MoneySummaryHeader({children}: ChildrenProps) {
  return (
    <div className={styles.Header} role="rowheader">
      {children}
    </div>
  );
}

export function MoneySummaryContent({children}: ChildrenProps) {
  return (
    <div className={styles.Content} role="cell">
      {children}
    </div>
  );
}
