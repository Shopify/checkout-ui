import React from 'react';
import {classNames, variationName} from '@shopify/css-utilities';

import styles from './FlagIcon.css';
import {CountryCode, FLAG_ICON_BY_COUNTRY_CODE} from './images';

export interface Props {
  accessibilityLabel?: string;
  countryCode: CountryCode;
  size?: 'small' | 'default';
}

export function FlagIcon({accessibilityLabel, countryCode, size}: Props) {
  const className = classNames(
    styles.FlagIcon,
    size && styles[variationName('size', size)],
  );

  return (
    <img
      alt={accessibilityLabel}
      className={className}
      src={FLAG_ICON_BY_COUNTRY_CODE[countryCode]}
    />
  );
}
