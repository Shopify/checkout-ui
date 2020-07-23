import React from 'react';
import {classNames, variationName} from '@shopify/css-utilities';

import {createIdCreator, useId} from '../../utilities/id';
import {utilityDefaultBorderColor} from '../../utilities/legacy';
import {Heading} from '../Heading';
import {HeadingGroup} from '../HeadingGroup';
import {VisuallyHidden} from '../VisuallyHidden';

import styles from './ResourceList.css';

const createId = createIdCreator('ResourceList');
export interface Props {
  children?: React.ReactNode;
  border?: 'none' | 'full' | 'blockEnd' | 'betweenItems';
  title?: string;
  titleHidden?: boolean;
}

export function ResourceList({
  children,
  border = 'none',
  title,
  titleHidden,
}: Props) {
  const id = useId(undefined, createId);
  const className = classNames(
    styles.ResourceList,
    utilityDefaultBorderColor,
    border && styles[variationName('border', border)],
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

export function ResourceListHeader({children}: {children?: React.ReactNode}) {
  return (
    <div role="row" className={styles.ResourceListHeader}>
      {children}
    </div>
  );
}

export function ResourceListHeaderContent({
  children,
  primary,
  hidden,
}: {
  children?: React.ReactNode;
  primary?: boolean;
  hidden?: boolean;
}) {
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
