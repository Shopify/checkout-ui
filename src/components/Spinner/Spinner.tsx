import React, {PropsWithChildren} from 'react';
import {SpinnerProps} from '@shopify/argo-checkout';
import {classNames, variationName} from '@shopify/css-utilities';

import {usePrefersReducedMotion} from '../../utilities/media-query';
import {Icon} from '../Icon';

import styles from './Spinner.css';

export function Spinner({
  size,
  color,
  children,
}: PropsWithChildren<SpinnerProps>) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const showAccessibleContent = Boolean(children && prefersReducedMotion);

  const className = showAccessibleContent
    ? undefined
    : classNames(styles.Spinner, size && styles[variationName('size', size)]);

  return (
    <div className={className}>
      {showAccessibleContent ? (
        children
      ) : (
        <Icon
          source={size === 'small' ? 'spinnerSmall' : 'spinner'}
          color={color ? undefined : 'interactive'}
        />
      )}
    </div>
  );
}
