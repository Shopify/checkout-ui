import React, {ReactNode} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';

import {Text} from '../../../Text';
import {useThemeConfiguration} from '../../../Theme';

import styles from './MoneyLine.css';

interface ChildrenProps {
  children?: ReactNode;
}

interface MoneyLineProps {
  label: string;
  value?: string;
  subdued?: boolean;
}

function hasChildren(props: Props | ChildrenProps): props is ChildrenProps {
  return (props as ChildrenProps).children !== undefined;
}

export type Props = MoneyLineProps | ChildrenProps;

export function MoneyLine(props: Props) {
  const {
    moneyLines: {
      background,
      blockPadding,
      inlinePadding,
      inlineAlignment,
      labelTypographyStyle,
      valueTypographyStyle,
    },
  } = useThemeConfiguration();

  const className = classNames(
    styles.MoneyLine,
    background && styles[variationName('background', background)],
    blockPadding && styles[variationName('blockPadding', blockPadding)],
    inlineAlignment &&
      styles[variationName('inlineAlignment', inlineAlignment)],
    inlinePadding && styles[variationName('inlinePadding', inlinePadding)],
  );

  return (
    <div className={className} role="row">
      {hasChildren(props) ? (
        props.children
      ) : (
        <>
          <MoneyLineHeader>
            <Text style={labelTypographyStyle}>{props.label}</Text>
          </MoneyLineHeader>
          <MoneyLineContent>
            <Text
              subdued={props.subdued}
              emphasized={!props.subdued}
              size={props.subdued ? 'small' : undefined}
              style={valueTypographyStyle}
            >
              {props.value}
            </Text>
          </MoneyLineContent>
        </>
      )}
    </div>
  );
}

export function MoneyLineHeader({children}: ChildrenProps) {
  return (
    <div className={styles.Header} role="rowheader">
      {children}
    </div>
  );
}

export function MoneyLineContent({children}: ChildrenProps) {
  return (
    <div className={styles.Content} role="cell">
      {children}
    </div>
  );
}
