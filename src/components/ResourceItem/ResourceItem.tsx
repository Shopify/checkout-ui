import React from 'react';
import {classNames} from '@shopify/css-utilities';

import {utilityDefaultBorderColor} from '../../utilities/legacy';
import {VisuallyHidden} from '../VisuallyHidden';

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
  return (
    <div
      role="cell"
      className={
        primary
          ? classNames(
              styles['ResourceItemContent-isPrimary'],
              styles.ResourceItemContent,
            )
          : styles.ResourceItemContent
      }
    >
      {hidden ? <VisuallyHidden>{children}</VisuallyHidden> : children}
    </div>
  );
}

export interface Props {
  children?: React.ReactNode;
}

export function ResourceItem({children}: Props) {
  return (
    <div
      role="row"
      className={classNames(styles.ResourceItem, utilityDefaultBorderColor)}
    >
      {children}
    </div>
  );
}
