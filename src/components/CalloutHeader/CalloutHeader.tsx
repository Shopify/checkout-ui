import React, {ReactNode} from 'react';
import {classNames} from '@shopify/css-utilities';

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
  success: <CheckmarkCircleIcon />,
  cancelled: <CancelledCircleIcon />,
  warning: <WarningCircleIcon />,
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

export function CheckmarkCircleIcon() {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M49 25C49 38.2548 38.2548 49 25 49C11.7452 49 1 38.2548 1 25C1 11.7452 11.7452 1 25 1C38.2548 1 49 11.7452 49 25Z"
        stroke="#197BBD"
        strokeWidth="2"
      />
      <path
        d="M15 24.5113L22.3067 31.818L35.1247 19"
        stroke="#197BBD"
        strokeWidth="2"
      />
    </svg>
  );
}

export function CancelledCircleIcon() {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M49 25C49 38.2548 38.2548 49 25 49C11.7452 49 1 38.2548 1 25C1 11.7452 11.7452 1 25 1C38.2548 1 49 11.7452 49 25Z"
        stroke="#197BBD"
        strokeWidth="2"
      />
      <path d="M39 12L11.9999 39" stroke="#197BBD" strokeWidth="2" />
      <path d="M12 12L39.0001 39.0001" stroke="#197BBD" strokeWidth="2" />
    </svg>
  );
}

export function WarningCircleIcon() {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M49 25C49 38.2548 38.2548 49 25 49C11.7452 49 1 38.2548 1 25C1 11.7452 11.7452 1 25 1C38.2548 1 49 11.7452 49 25Z"
        stroke="#BBBBBB"
        strokeWidth="2"
      />
      <path
        d="M25 11V30"
        stroke="#BBBBBB"
        strokeWidth="2"
        stroke-linecap="square"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M25 39C25.8284 39 26.5 38.3284 26.5 37.5C26.5 36.6716 25.8284 36 25 36C24.1716 36 23.5 36.6716 23.5 37.5C23.5 38.3284 24.1716 39 25 39Z"
        fill="#BBBBBB"
      />
    </svg>
  );
}
