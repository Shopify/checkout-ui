import React, {PropsWithChildren} from 'react';
import {ButtonProps} from '@shopify/argo-checkout';
import {classNames, variationName} from '@shopify/css-utilities';

import {useTranslate} from '../AppContext';
import {useTransition} from '../../utilities/transition';
import {Spinner} from '../Spinner';
import {UnstyledLink} from '../Link';
import {button as legacyButtonClassName} from '../../utilities/legacy';
import {usePrefersReducedMotion} from '../../utilities/media-query';
import {useConnected} from '../Connected';

import styles from './Button.css';

interface Props extends PropsWithChildren<ButtonProps> {
  /** Whether the button should fill all available inline space. */
  fill?: boolean;
  /** Renders a button that is visually styled with secondary colors */
  secondary?: boolean;
}

export function Button({
  children,
  submit = false,
  disabled,
  onPress,
  to,
  subdued,
  plain,
  secondary,
  loading = false,
  fill = false,
  loadingLabel,
}: Props) {
  const href = disabled ? undefined : to;
  const onClick = disabled ? undefined : () => onPress?.();

  const translate = useTranslate();
  const prefersReducedMotion = usePrefersReducedMotion();
  const transition = useTransition(loading, {
    enter: 'slow',
  });

  const connected = useConnected();

  const classes = classNames(
    styles.Button,
    legacyButtonClassName,
    subdued && styles.isSubdued,
    plain && styles.isPlain,
    disabled && styles.isDisabled,
    loading && styles.isLoading,
    fill && styles.isFill,
    styles[variationName('isLoading-transition', transition)],
    connected && styles.isConnected,
    secondary && styles.isSecondary,
  );

  const content = <span className={styles.Content}>{children}</span>;

  const type = submit ? 'submit' : 'button';

  const loadingMarkup = (
    <span
      className={classNames(
        styles.LoadingContent,
        !prefersReducedMotion && styles.Spinner,
      )}
    >
      <Spinner size="small" color="inherit">
        {loadingLabel ? loadingLabel : translate('processing')}
      </Spinner>
    </span>
  );

  if (href) {
    return (
      <UnstyledLink to={href} className={classes} onPress={onPress}>
        {content}
        {loading && loadingMarkup}
      </UnstyledLink>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      aria-busy={loading}
    >
      {content}
      {loading && loadingMarkup}
    </button>
  );
}
