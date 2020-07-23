import React from 'react';
import {classNames, variationName} from '@shopify/css-utilities';

import {
  caretDown,
  cart,
  checkmark,
  chevronDown,
  chevronUp,
  chevronRight,
  chevronLeft,
  close,
  critical,
  discount,
  delivered,
  delivery,
  disabled,
  errorFill,
  info,
  lock,
  questionFill,
  ship,
  spinner,
  spinnerSmall,
  success,
  warning,
  warningFill,
} from '../../icons';

import styles from './Icon.css';

const BUNDLED_ICONS = {
  caretDown,
  cart,
  checkmark,
  chevronDown,
  chevronUp,
  chevronRight,
  chevronLeft,
  close,
  critical,
  discount,
  delivered,
  delivery,
  disabled,
  errorFill,
  info,
  lock,
  questionFill,
  spinner,
  spinnerSmall,
  success,
  ship,
  warning,
  warningFill,
};

export interface Props {
  source: 'placeholder' | keyof typeof BUNDLED_ICONS;
  color?: 'interactive' | 'subdued' | 'informative' | 'critical' | 'warning';
  size?: 'small' | 'default' | 'large';
  accessibilityLabel?: string;
}

export function Icon({source, color, size, accessibilityLabel}: Props) {
  const className = classNames(
    styles.Icon,
    color && styles[variationName('color', color)],
    size && styles[variationName('size', size)],
  );

  let contentMarkup: React.ReactNode;
  if (source === 'placeholder') {
    contentMarkup = <div className={styles.Placeholder} />;
  } else {
    const SourceComponent = BUNDLED_ICONS[source];
    contentMarkup = (
      <SourceComponent
        className={styles.Svg}
        focusable="false"
        aria-hidden="true"
      />
    );
  }

  return (
    <span className={className} aria-label={accessibilityLabel}>
      {contentMarkup}
    </span>
  );
}
