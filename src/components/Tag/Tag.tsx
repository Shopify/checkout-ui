import React, {PropsWithChildren} from 'react';
import {TagProps, IconProps} from '@shopify/checkout-ui-extensions';
import {classNames} from '@shopify/css-utilities';

import {Icon} from '../Icon';
import {Truncate} from '../Truncate';

import styles from './Tag.css';

export interface Props extends PropsWithChildren<TagProps> {
  /** Icon source */
  icon?: IconProps['source'];
}

export function Tag({
  children,
  icon,
  onRemove,
  removeControlAccessibilityLabel,
}: Props) {
  const tagClassNames = classNames(styles.Tag);
  const labelClassNames = classNames(
    styles.Label,
    Boolean(onRemove) && styles.removable,
  );
  const iconClassNames = classNames(styles.Icon);
  return (
    <div className={tagClassNames}>
      <span className={labelClassNames}>
        {icon && (
          <span className={iconClassNames}>
            <Icon source={icon} size="large" />
          </span>
        )}
        <Truncate>{children}</Truncate>
      </span>
      {Boolean(onRemove) && (
        <button
          type="button"
          className={styles.Button}
          onClick={onRemove}
          aria-label={removeControlAccessibilityLabel}
        >
          <Icon source="close" size="base" />
        </button>
      )}
    </div>
  );
}
