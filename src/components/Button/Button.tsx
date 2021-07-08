import React, {forwardRef, PropsWithChildren, useCallback} from 'react';
import {ButtonProps} from '@shopify/checkout-ui-extensions';
import {classNames, variationName} from '@shopify/css-utilities';

import {useContainingForm} from '../../utilities/forms';
import {useTranslate} from '../AppContext';
import {useTransition} from '../../utilities/transition';
import {Spinner} from '../Spinner';
import {UnstyledLink} from '../Link';
import {
  button as legacyButtonClassName,
  buttonPrimary as legacyButtonPrimaryClassName,
  buttonSecondary as legacyButtonSecondaryClassName,
  buttonCritical as legacyButtonCriticalClassName,
  colorCriticalAccent as legacyColorCriticalAccent,
} from '../../utilities/legacy';
import {usePrefersReducedMotion} from '../../utilities/media-query';
import {useConnected} from '../Connected';
import {useThemeConfiguration} from '../Theme';
import {useResponsive} from '../../utilities/responsive';
import typographyStyles from '../../utilities/typography-styles.css';

import styles from './Button.css';

export interface Props extends PropsWithChildren<ButtonProps> {
  onMouseEnter?(): void;
}

export const Button = forwardRef(function Button(
  {
    children,
    kind = 'primary',
    submit = false,
    disabled,
    onPress,
    to,
    loading = false,
    loadingLabel,
    accessibilityLabel,
    fill = false,
    appearance,
    onMouseEnter,
    size = 'base',
  }: Props,
  ref,
) {
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

  const responsiveSizes = useResponsive({size});

  const {
    primaryButton: {
      style: primaryStyle = 'fill',
      border: primaryBorder = 'none',
      typographyStyle: primaryTypographyStyle,
      loadingStyle: primaryLoading = 'spinner',
    },
    secondaryButton: {
      style: secondaryStyle = 'inverse',
      border: secondaryBorder = 'full',
      typographyStyle: secondaryTypographyStyle,
      loadingStyle: secondaryLoading = 'spinner',
    },
    link: {
      colorHovered: plainColorHovered,
      typographyStyle: linkTypographyStyle,
    },
  } = useThemeConfiguration();

  const form = useContainingForm();

  const isSecondary = kind === 'secondary';

  const style = isSecondary ? secondaryStyle : primaryStyle;
  const border = isSecondary ? secondaryBorder : primaryBorder;
  const typographyStyle = isSecondary
    ? secondaryTypographyStyle
    : primaryTypographyStyle;
  const loadingStyle = isSecondary ? secondaryLoading : primaryLoading;

  const isPlain = kind === 'plain' || style === 'plain';

  const classes = classNames(
    styles.Button,
    kind && !isPlain && styles[variationName('kind', kind)],
    responsiveSizes &&
      !isPlain &&
      responsiveSizes.map((className) => styles[className]),
    border && !isPlain && styles[variationName('border', border)],
    style && !isPlain && styles[variationName('style', style)],
    appearance && styles[variationName('appearance', appearance)],
    isPlain && styles.stylePlain,
    isPlain &&
      plainColorHovered &&
      styles[variationName('stylePlainColorHovered', plainColorHovered)],
    fill && styles.fill,
    disabled && styles.disabled,
    loading && styles[variationName('loading', loadingStyle)],
    loading &&
      loadingStyle === 'spinner' &&
      styles[variationName('loading-transition', transition)],
    !isPlain && typographyStyle && typographyStyles[typographyStyle],
    isPlain && linkTypographyStyle && typographyStyles[linkTypographyStyle],
    connected && styles.connected,
    /* Basic theming for older browsers that do not support CSS Custom Properties: */
    legacyButtonClassName,
    kind === 'primary' && legacyButtonPrimaryClassName,
    kind === 'secondary' && legacyButtonSecondaryClassName,
    appearance === 'critical' && legacyButtonCriticalClassName,
    kind === 'plain' && appearance === 'critical' && legacyColorCriticalAccent,
  );

  const normalizedLoadingLabel = loadingLabel
    ? loadingLabel
    : translate('processing');

  const contentClassNames = classNames(styles.Content);
  const content = (
    <span className={contentClassNames}>
      {loading && loadingStyle === 'progressBar' && prefersReducedMotion
        ? normalizedLoadingLabel
        : children}
    </span>
  );

  const type = submit ? 'submit' : 'button';

  const loadingMarkup =
    loadingStyle === 'spinner' ? (
      <span
        className={classNames(
          styles.LoadingContent,
          !prefersReducedMotion && styles.Spinner,
        )}
      >
        <Spinner
          size="small"
          color="inherit"
          accessibilityLabel={normalizedLoadingLabel}
        />
      </span>
    ) : (
      <span className={styles.ProgressBar} />
    );

  if (href) {
    return (
      <UnstyledLink
        to={href}
        className={classes}
        onPress={onPress}
        ariaBusy={loading}
        ariaLive={loading ? 'assertive' : 'polite'}
        ariaLabel={accessibilityLabel}
      >
        {content}
        {loading && loadingMarkup}
      </UnstyledLink>
    );
  }

  return (
    <button
      type={type}
      form={submit && form?.nested ? form.id : undefined}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      aria-busy={loading || undefined}
      aria-live={loading ? 'assertive' : undefined}
      aria-label={accessibilityLabel}
      ref={refsSetter}
      onMouseEnter={onMouseEnter}
    >
      {content}
      {loading && loadingMarkup}
    </button>
  );
});
