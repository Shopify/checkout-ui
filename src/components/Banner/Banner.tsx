import React, {useState} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';

import {Heading} from '../Heading';
import {HeadingGroup} from '../HeadingGroup';
import {Bookend} from '../Bookend';
import {Icon} from '../Icon';
import {View} from '../View';
import {TextContainer} from '../TextContainer';
import {Button} from '../Button';

import styles from './Banner.css';

type Status = 'info' | 'success' | 'warning' | 'critical';

export interface Props {
  title?: string;
  status?: Status;
  children?: React.ReactNode;
  collapsible?: boolean;
  iconHidden?: boolean;
}

export function Banner({
  title,
  status = 'info',
  children,
  collapsible = false,
  iconHidden = false,
}: Props) {
  const [collapsed, setCollapsed] = useState(true);

  const className = classNames(
    styles.Banner,
    status && styles[variationName('status', status)],
  );

  const titleMarkup = title && (
    <Heading>
      <span className={collapsible && styles.isCollapsible}>{title}</span>
    </Heading>
  );

  const showChildren = !collapsible || (collapsible && !collapsed);

  return (
    <div
      className={className}
      role={status === 'critical' ? 'alert' : 'status'}
      aria-atomic="true"
      aria-live="polite"
    >
      {collapsible && (
        <div className={styles.collapsibleButton}>
          <Button plain onPress={() => setCollapsed((prev) => !prev)}>
            <Icon
              size="small"
              source={collapsed ? 'chevronDown' : 'chevronUp'}
            />
          </Button>
        </div>
      )}

      <Bookend leading>
        {!iconHidden && (
          <div className={styles.Icon}>
            <Icon source={status} />
          </div>
        )}

        <div className={styles.Content}>
          {children ? (
            <TextContainer spacing="tight">
              {titleMarkup}
              {showChildren && (
                <HeadingGroup>
                  <View>{children}</View>
                </HeadingGroup>
              )}
            </TextContainer>
          ) : (
            titleMarkup
          )}
        </div>
      </Bookend>
    </div>
  );
}
