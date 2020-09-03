import React, {ReactNode} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';

import {createIdCreator, useId} from '../../utilities/id';
import {utilityDefaultBorderColor} from '../../utilities/legacy';
import {Heading} from '../Heading';
import {HeadingGroup} from '../HeadingGroup';
import {VisuallyHidden} from '../VisuallyHidden';
import {
  ThemeGap,
  ThemeResourceListBorder,
  ThemeBorderStyle,
  ThemeBorderColor,
} from '../Theme';

import styles from './ResourceList.css';

const createId = createIdCreator('ResourceList');
export interface Props {
  children?: ReactNode;
  title?: string;
  titleHidden?: boolean;
  border?: ThemeResourceListBorder;
  borderStyle?: ThemeBorderStyle;
  borderColor?: ThemeBorderColor;
  gap?: ThemeGap;
}

export function ResourceList({
  children,
  title,
  titleHidden,
  gap,
  border,
  borderStyle,
  borderColor,
}: Props) {
  const id = useId(undefined, createId);
  const className = classNames(
    styles.ResourceList,
    utilityDefaultBorderColor,
    gap && styles[variationName('gap', gap)],
    border && styles[variationName('border', border)],
    borderStyle && styles[variationName('borderStyle', borderStyle)],
    borderColor && styles[variationName('borderColor', borderColor)],
  );

  const titleMarkup = title ? <Heading id={id}>{title}</Heading> : null;

  return (
    <>
      {title && titleHidden ? (
        <VisuallyHidden>{titleMarkup}</VisuallyHidden>
      ) : (
        titleMarkup
      )}
      <HeadingGroup>
        <div role="table" aria-labelledby={id} className={className}>
          {children}
        </div>
      </HeadingGroup>
    </>
  );
}

export interface ResourceListHeaderProps {
  children?: ReactNode;
  hidden?: boolean;
}

export function ResourceListHeader({
  children,
  hidden,
}: ResourceListHeaderProps) {
  return (
    <div
      role="row"
      className={classNames(styles.ResourceListHeader, {
        [styles['ResourceListHeader-isHidden']]: hidden,
      })}
    >
      {children}
    </div>
  );
}

export interface ResourceListHeaderContentProps {
  children?: ReactNode;
  hidden?: boolean;
  primary?: boolean;
}

export function ResourceListHeaderContent({
  children,
  primary,
  hidden,
}: ResourceListHeaderContentProps) {
  return (
    <div
      role="columnheader"
      className={
        primary ? styles['ResourceListHeaderContent-isPrimary'] : undefined
      }
    >
      {hidden ? <VisuallyHidden>{children}</VisuallyHidden> : children}
    </div>
  );
}
