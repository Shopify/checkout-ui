import React from 'react';
import {classNames} from '@shopify/css-utilities';

import {CARD_IMAGE_BY_BRAND} from './images';
import styles from './PaymentIcon.css';

export interface Props {
  paymentBrand: string;
  disabled?: boolean;
  active?: boolean;
}

// TODO: need an accessible label... somewhere... and to remove the title
// from the SVG
export function PaymentIcon({paymentBrand, disabled, active}: Props) {
  return (
    <img
      alt=""
      src={CARD_IMAGE_BY_BRAND.get(
        paymentBrand.toLowerCase().replace(/-/g, '_'),
      )}
      className={classNames(styles.PaymentIcon, {
        [styles.disabled]: disabled,
        [styles.active]: active,
      })}
    />
  );
}
