import React, {forwardRef, PropsWithChildren, useCallback} from 'react';
import {ButtonProps} from '@shopify/argo-checkout';
import {classNames, variationName} from '@shopify/css-utilities';

import {useTranslate} from '../AppContext';
import {useTransition} from '../../utilities/transition';
import {Spinner} from '../Spinner';
import {UnstyledLink} from '../Link';
import {button as legacyButtonClassName} from '../../utilities/legacy';
import {usePrefersReducedMotion} from '../../utilities/media-query';
import {useConnected} from '../Connected';
import {useThemeConfiguration} from '../Theme';
import typographyStyles from '../../utilities/typography-styles.css';

import styles from './Button.css';

export interface Props extends PropsWithChildren<ButtonProps> {
  /** Whether the button should fill all available inline space. */
  fill?: boolean;
  /** Renders a button that is visually styled with secondary colors */
  secondary?: boolean;
  /** Adds an underline to the text when rendered as a plain button */
  underline?: boolean;
}

export const Button = forwardRef(
  (
    {
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
      underline,
    }: Props,
    ref,
  ) => {
    const href = disabled ? undefined : to;
    const onClick = disabled ? undefined : () => onPress?.();
    const refsSetter = useCallback(
      (instance: HTMLButtonElement) => {
        if (typeof ref === 'function') {
          ref(instance);
        } else if (ref) {
          ref.current = instance;
        }
      },
      [ref],
    );

    const translate = useTranslate();
    const prefersReducedMotion = usePrefersReducedMotion();
    const transition = useTransition(loading, {
      enter: 'slow',
    });

    const connected = useConnected();
    const {
      primaryButton: {
        typographyStyle: primaryStyle,
        loadingStyle: primaryLoading = 'spinner',
      },
      secondaryButton: {
        typographyStyle: secondaryStyle,
        loadingStyle: secondaryLoading = 'spinner',
      },
    } = useThemeConfiguration();

    const loadingStyle = secondary ? secondaryLoading : primaryLoading;

    const classes = classNames(
      styles.Button,
      legacyButtonClassName,
      subdued && styles.isSubdued,
      plain && styles.isPlain,
      plain && underline && styles.isUnderline,
      disabled && styles.isDisabled,
      loading && loadingStyle === 'spinner' && styles.isLoading,
      fill && styles.isFill,
      loading &&
        loadingStyle === 'spinner' &&
        styles[variationName('isLoading-transition', transition)],
      connected && styles.isConnected,
      secondary && styles.isSecondary,
      loading && loadingStyle === 'progressBar' && styles[loadingStyle],
    );

    const normalizedLoadingLabel = loadingLabel
      ? loadingLabel
      : translate('processing');

    const contentTypography = secondary
      ? secondaryStyle && typographyStyles[secondaryStyle]
      : primaryStyle && typographyStyles[primaryStyle];
    const content = (
      <span className={classNames(styles.Content, contentTypography)}>
        {loading && loadingStyle === 'progressBar' && prefersReducedMotion
          ? normalizedLoadingLabel
          : children}
      </span>
    );

    const type = submit ? 'submit' : 'button';

    const loadingMarkup = (
      <span
        className={classNames(
          styles.LoadingContent,
          !prefersReducedMotion && styles.Spinner,
        )}
      >
        <Spinner size="small" color="inherit">
          {normalizedLoadingLabel}
        </Spinner>
      </span>
    );

    if (href) {
      return (
        <UnstyledLink to={href} className={classes} onPress={onPress}>
          {content}
          {loading && loadingStyle === 'spinner' && loadingMarkup}
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
        ref={refsSetter}
      >
        {content}
        {loading && loadingStyle === 'spinner' && loadingMarkup}
      </button>
    );
  },
);
