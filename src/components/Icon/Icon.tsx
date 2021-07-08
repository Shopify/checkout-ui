import React from 'react';
import {classNames, variationName} from '@shopify/css-utilities';
import {IconProps} from '@shopify/checkout-ui-extensions';

import {
  utilityDefaultColorAccent,
  utilityDefaultTextColorSubdued,
} from '../../utilities/legacy';
import {
  arrowLeft,
  arrowRight,
  calendar,
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
  geolocation,
  info,
  list,
  locateMe,
  lock,
  map,
  marker,
  minus,
  mobile,
  plus,
  questionFill,
  reorder,
  spinner,
  spinnerSmall,
  store,
  success,
  truck,
  warning,
  warningCircle,
  warningFill,
  giftFill,
  external,
} from '../../icons';

import styles from './Icon.css';

const BUNDLED_ICONS = {
  arrowLeft,
  arrowRight,
  calendar,
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
  geolocation,
  info,
  list,
  locateMe,
  lock,
  map,
  marker,
  minus,
  mobile,
  plus,
  questionFill,
  reorder,
  spinner,
  spinnerSmall,
  store,
  success,
  truck,
  warning,
  warningCircle,
  warningFill,
  giftFill,
  external,
};

export function Icon({
  source,
  appearance,
  size,
  accessibilityLabel,
}: IconProps) {
  const className = classNames(
    styles.Icon,
    appearance && styles[variationName('appearance', appearance)],
    appearance && appearance === 'accent' && utilityDefaultColorAccent,
    appearance && appearance === 'subdued' && utilityDefaultTextColorSubdued,
    size && styles[variationName('size', size)],
  );

  const SourceComponent = BUNDLED_ICONS[source];
  const contentMarkup: React.ReactNode = (
    <SourceComponent
      className={styles.Svg}
      focusable="false"
      aria-hidden="true"
      role="presentation"
    />
  );

  return (
    <span className={className} aria-label={accessibilityLabel}>
      {contentMarkup}
    </span>
  );
}

export const AVAILABLE_ICONS = Object.keys(BUNDLED_ICONS);
