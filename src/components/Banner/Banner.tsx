import React, {useState, useEffect, useRef, PropsWithChildren} from 'react';
import {BannerProps} from '@shopify/checkout-ui-extensions';
import {classNames, variationName} from '@shopify/css-utilities';

import {createIdCreator, useId} from '../../utilities/id';
import {useTranslate} from '../AppContext';
import {Heading} from '../Heading';
import {HeadingGroup} from '../HeadingGroup';
import {Bookend} from '../Bookend';
import {Icon} from '../Icon';
import {View} from '../View';
import {TextContainer} from '../TextContainer';
import {InlineStack} from '../InlineStack';

import styles from './Banner.css';

export interface Props extends PropsWithChildren<BannerProps> {
  /**
   * Checks whether autofocus on the banner needs to be applied.
   */
  autofocus?: boolean;

  /** Callback when banner is dismissed */
  onDismiss?(): void;
}

const createId = createIdCreator('Banner');

export function Banner({
  children,
  collapsible = false,
  iconHidden = false,
  status = 'info',
  title,
  autofocus = false,
  onDismiss,
}: Props) {
  const translate = useTranslate();
  const [collapsed, setCollapsed] = useState(true);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autofocus === true) {
      bannerRef?.current?.focus();
    }
  }, [autofocus]);

  const className = classNames(
    styles.Banner,
    status && styles[variationName('status', status)],
  );

  const id = useId(undefined, createId);
  const controlId = collapsed ? undefined : id;
  const showChildren = !collapsible || (collapsible && !collapsed);

  const dismissButton = (
    <View>
      <button
        type="button"
        className={styles.Button}
        onClick={onDismiss}
        aria-label={translate('dismissNotification')}
      >
        <Icon source="close" size="small" />
      </button>
    </View>
  );

  const collapsibleButton = (
    <View>
      <button
        type="button"
        className={styles.Button}
        onClick={() => setCollapsed((collapsed) => !collapsed)}
        aria-pressed={!collapsed}
        aria-expanded={!collapsed}
        aria-controls={controlId}
      >
        <Icon
          size="small"
          source={collapsed ? 'chevronDown' : 'chevronUp'}
          accessibilityLabel={translate('expand')}
        />
      </button>
    </View>
  );

  return (
    <div
      className={className}
      role={status === 'critical' ? 'alert' : 'status'}
      aria-atomic="true"
      aria-live="polite"
      {...(autofocus && {tabIndex: -1})}
      ref={bannerRef}
    >
      <Bookend
        leading={!iconHidden}
        trailing={collapsible || Boolean(onDismiss)}
      >
        {!iconHidden && (
          <div className={styles.Icon}>
            <Icon source={status} />
          </div>
        )}
        <TextContainer spacing="tight">
          {title && <Heading level={3}>{title}</Heading>}
          {children && showChildren && (
            <div className={styles.Content} id={controlId}>
              <HeadingGroup>
                <View>{children}</View>
              </HeadingGroup>
            </div>
          )}
        </TextContainer>
        {(collapsible || onDismiss) && (
          <InlineStack spacing="loose">
            {collapsible && collapsibleButton}
            {onDismiss && dismissButton}
          </InlineStack>
        )}
      </Bookend>
    </div>
  );
}
