/* eslint-disable jsx-a11y/no-redundant-roles */
import React from 'react';

import {Icon} from '../Icon';
import {Text} from '../Text';
import {useThemeConfiguration} from '../Theme';
import {Link} from '..';

import styles from './Breadcrumbs.css';

export interface Breadcrumb {
  id: string;
  to: string;
  disabled?: boolean;
  content: string;
}

export interface Props {
  active?: string;
  breadcrumbs: Breadcrumb[];
}

const NUMBER_STYLE_MAP = {
  none: () => null,
  decimal: (index: number) => <Marker>{index.toString()}</Marker>,
  decimalLeadingZero: (index: number) => (
    <Marker>{index.toString().padStart(2, '0')}</Marker>
  ),
};

export function Breadcrumbs({active, breadcrumbs}: Props) {
  const {
    buyerJourney: {
      numberStyle = 'none',
      chevronIconSeparator = true,
      typographyStyle,
    },
  } = useThemeConfiguration();

  return (
    // eslint-disable-next-line @shopify/jsx-no-hardcoded-content
    <nav aria-label="Breadcrumbs">
      <ol className={styles.Breadcrumbs} role="list">
        {breadcrumbs.map(({id, to, disabled, content}, index) => {
          const showSeparator = breadcrumbs.length !== index + 1;
          const isActive = active === id;
          const isClickable = !isActive && !disabled;
          const ariaCurrent = isActive ? 'step' : false;
          const marker = NUMBER_STYLE_MAP[numberStyle](index + 1);

          const breadcrumbContent = isClickable ? (
            <Text size="small" style={typographyStyle}>
              <Link to={to}>
                {marker}
                {content}
              </Link>
            </Text>
          ) : (
            <Text
              emphasized={isActive}
              subdued={!isActive}
              size="small"
              style={typographyStyle}
            >
              {marker}
              {content}
            </Text>
          );

          return (
            <li className={styles.Item} key={id} aria-current={ariaCurrent}>
              {breadcrumbContent}
              {showSeparator && (
                <span className={styles.Separator}>
                  {chevronIconSeparator && (
                    <Icon source="chevronRight" size="small" color="subdued" />
                  )}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function Marker({children}: {children: string}) {
  return <span className={styles.Marker}>{children}</span>;
}
