import React from 'react';

import styles from './FlagIcon.css';
import {CountryCode, FLAG_ICON_BY_COUNTRY_CODE} from './images';

export interface Props {
  accessibilityLabel?: string;
  countryCode: CountryCode;
}

export function FlagIcon({accessibilityLabel, countryCode}: Props) {
  return (
    <img
      alt={accessibilityLabel}
      className={styles.FlagIcon}
      src={FLAG_ICON_BY_COUNTRY_CODE[countryCode]}
    />
  );
}
