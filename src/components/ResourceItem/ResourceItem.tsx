import React from 'react';
import {classNames, variationName} from '@shopify/css-utilities';

import {utilityDefaultBorderColor} from '../../utilities/legacy';
import {VisuallyHidden} from '../VisuallyHidden';
import {ThemeBackground, ThemeResourceItemSpacing} from '../Theme';

import styles from './ResourceItem.css';

export interface ResourceItemContentProps {
  children?: React.ReactNode;
  primary?: boolean;
  hidden?: boolean;
}

export function ResourceItemContent({
  children,
  primary,
  hidden,
}: ResourceItemContentProps) {
  const className = classNames(
    styles.ResourceItemContent,
    primary && styles['ResourceItemContent-isPrimary'],
  );

  return (
    <div role="cell" className={className}>
      {hidden ? <VisuallyHidden>{children}</VisuallyHidden> : children}
    </div>
  );
}

export interface Props {
  children?: React.ReactNode;
  background?: ThemeBackground;
  inlinePadding?: ThemeResourceItemSpacing;
  blockPadding?: ThemeResourceItemSpacing;
}

export function ResourceItem({
  children,
  background,
  inlinePadding,
  blockPadding,
}: Props) {
  const className = classNames(
    styles.ResourceItem,
    utilityDefaultBorderColor,
    background && styles[variationName('background', background)],
    inlinePadding && styles[variationName('inlinePadding', inlinePadding)],
    blockPadding && styles[variationName('blockPadding', blockPadding)],
  );

  return (
    <div role="row" className={className}>
      {children}
    </div>
  );
}

export interface SeparatorProps {
  borderStyle?: 'base' | 'dotted';
  borderColor?: 'base' | 'emphasized';
}

export function ResourceItemSeparator({
  borderStyle,
  borderColor,
}: SeparatorProps) {
  const className = classNames(
    styles.ResourceItemSeparator,
    borderStyle &&
      styles[variationName('ResourceItemSeparator-borderStyle', borderStyle)],
    borderColor &&
      styles[variationName('ResourceItemSeparator-borderColor', borderColor)],
  );

  return <div className={className} />;
}
