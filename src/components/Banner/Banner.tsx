import React, {useState, useEffect, useRef, PropsWithChildren} from 'react';
import {BannerProps} from '@shopify/argo-checkout';
import {classNames, variationName} from '@shopify/css-utilities';

import {createIdCreator, useId} from '../../utilities/id';
import {useTranslate} from '../AppContext';
import {Heading} from '../Heading';
import {HeadingGroup} from '../HeadingGroup';
import {Bookend} from '../Bookend';
import {Icon} from '../Icon';
import {View} from '../View';
import {TextContainer} from '../TextContainer';

import styles from './Banner.css';

export interface Props extends PropsWithChildren<BannerProps> {
  /**
   * Checks whether autofocus on the banner needs to be applied.
   */
  autofocus?: boolean;
}

const createId = createIdCreator('Banner');

export function Banner({
  children,
  collapsible = false,
  iconHidden = false,
  status = 'info',
  title,
  autofocus = false,
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

  return (
    <div
      className={className}
      role={status === 'critical' ? 'alert' : 'status'}
      aria-atomic="true"
      aria-live="polite"
      {...(autofocus && {tabIndex: -1})}
      ref={bannerRef}
    >
      <Bookend leading={!iconHidden} trailing={collapsible}>
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
        {collapsible && (
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
        )}
      </Bookend>
    </div>
  );
}
