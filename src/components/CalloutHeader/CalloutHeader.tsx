import React, {ReactNode} from 'react';
import {classNames} from '@shopify/css-utilities';

import {Icon} from '../Icon';

import styles from './CalloutHeader.css';

// For the next implementer: see the os-header class and its children
// in https://github.com/Shopify/shopify/blob/9c4a7082b4fdf716cdcbed24018bef04eb840493/components/checkouts/web/app/views/checkouts/web/checkouts/thank_you.html.erb

type Status = 'success' | 'cancelled' | 'warning';

export interface Props {
  children?: ReactNode;
  status: Status;
  animated?: boolean;
}

const STATUS_ICONS: {
  [key: string]: React.ReactNode;
} = {
  success: <Icon source="checkmarkCircle" appearance="accent" />,
  cancelled: <Icon source="cancelCircle" appearance="accent" />,
  warning: <Icon source="warningCircle" appearance="subdued" />,
};

export function CalloutHeader({children, status, animated = true}: Props) {
  const className = classNames(styles.CalloutHeader, {
    [styles.Animated]: animated,
  });

  return (
    <header className={className}>
      <div className={styles.CalloutHeaderStatus}>{STATUS_ICONS[status]}</div>
      <div className={styles.CalloutHeaderContent}>{children}</div>
    </header>
  );
}
