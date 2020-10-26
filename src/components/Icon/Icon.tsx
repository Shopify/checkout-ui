import React from 'react';
import {classNames, variationName} from '@shopify/css-utilities';

import {utilityDefaultColorAccent} from '../../utilities/legacy';
import {
  camera,
  cancelCircle,
  caretDown,
  cart,
  checkmark,
  checkmarkCircle,
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
  mobile,
  questionFill,
  ship,
  spinner,
  spinnerSmall,
  success,
  warning,
  warningCircle,
  warningFill,
} from '../../icons';

import styles from './Icon.css';

const BUNDLED_ICONS = {
  camera,
  cancelCircle,
  caretDown,
  cart,
  checkmark,
  checkmarkCircle,
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
  mobile,
  questionFill,
  spinner,
  spinnerSmall,
  success,
  ship,
  warning,
  warningCircle,
  warningFill,
};

export interface Props {
  source: 'placeholder' | keyof typeof BUNDLED_ICONS;
  appearance?:
    | 'accent'
    | 'interactive'
    | 'subdued'
    | 'info'
    | 'success'
    | 'warning'
    | 'critical';
  size?: 'small' | 'default' | 'large';
  accessibilityLabel?: string;
}

export function Icon({source, appearance, size, accessibilityLabel}: Props) {
  const className = classNames(
    styles.Icon,
    appearance && styles[variationName('appearance', appearance)],
    appearance && appearance === 'accent' && utilityDefaultColorAccent,
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
