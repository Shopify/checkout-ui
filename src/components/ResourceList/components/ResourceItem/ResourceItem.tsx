import React from 'react';
import {classNames, variationName} from '@shopify/css-utilities';

import {utilityDefaultBorderColor} from '../../../../utilities/legacy';
import {View} from '../../../View';
import {
  ThemeBackground,
  ThemeResourceItemDivider,
  ThemeSpacing,
} from '../../../Theme';

import styles from './ResourceItem.css';

type Alignment = 'leading' | 'center' | 'trailing';

export interface ResourceItemContentProps {
  /** Position children along the cross axis */
  alignment?: Alignment;
  children?: React.ReactNode;
  primary?: boolean;
  hidden?: boolean;
}

export function ResourceItemContent({
  alignment = 'center',
  children,
  primary,
  hidden,
}: ResourceItemContentProps) {
  const className = classNames(
    styles.ResourceItemContent,
    alignment &&
      styles[variationName('ResourceItemContent-alignment', alignment)],
    primary && styles['ResourceItemContent-isPrimary'],
    hidden && styles['ResourceItemContent-isHidden'],
  );

  return (
    <div role="cell" className={className}>
      {hidden ? <View visibility="hidden">{children}</View> : children}
    </div>
  );
}

export interface Props {
  children?: React.ReactNode;
  background?: ThemeBackground;
  divider?: ThemeResourceItemDivider;
  inlinePadding?: ThemeSpacing;
  blockPadding?: ThemeSpacing;
  spacing?: ThemeSpacing;
}

export function ResourceItem({
  children,
  background,
  divider,
  inlinePadding,
  blockPadding,
  spacing = 'base',
}: Props) {
  const className = classNames(
    styles.ResourceItem,
    utilityDefaultBorderColor,
    background && styles[variationName('background', background)],
    inlinePadding && styles[variationName('inlinePadding', inlinePadding)],
    blockPadding && styles[variationName('blockPadding', blockPadding)],
    divider && styles[variationName('divider', divider)],
    spacing && styles[variationName('spacing', spacing)],
  );

  return (
    <div role="row" className={className}>
      {children}
    </div>
  );
}
