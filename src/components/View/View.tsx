import React, {ElementType, PropsWithChildren} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';
import {ViewProps} from '@shopify/checkout-ui-extensions';

import {useResponsive} from '../../utilities/responsive';
import {useResponsiveStyle} from '../../utilities/responsiveValue';
import {pixelOrPercent} from '../../utilities/units';

import styles from './View.css';

type Role = 'region' | 'complementary';

export interface Props extends ViewProps {
  accessibilityLabel?: string;
  role?: Role;
}

const ELEMENT_MAP = new Map<Role, ElementType>([
  ['region', 'section'],
  ['complementary', 'aside'],
]);

export function View({
  accessibilityLabel,
  accessibilityVisibility,
  backgroundFit,
  backgroundImage,
  backgroundPosition = 'center',
  backgroundRepeat = false,
  children,
  display = 'block',
  id,
  maxInlineSize,
  role,
  visibility,
  ...props
}: PropsWithChildren<Props>) {
  const responsiveClassNames = useResponsive(props);

  const responsiveStyle = useResponsiveStyle({
    backgroundImage: {
      value: backgroundImage,
      transform: (value: string) => `url(${JSON.stringify(value)})`,
    },
    maxWidth: {
      value: maxInlineSize,
      transform: (value: number) => pixelOrPercent(value),
    },
  });

  const Element = (role && ELEMENT_MAP.get(role)) ?? 'div';

  return (
    <Element
      className={classNames(
        styles.View,
        backgroundImage &&
          backgroundFit &&
          styles[variationName('backgroundFit', backgroundFit)],
        backgroundImage &&
          backgroundPosition &&
          styles[variationName('backgroundPosition', backgroundPosition)],
        backgroundImage &&
          styles[variationName('backgroundRepeat', `${backgroundRepeat}`)],
        display && styles[variationName('display', display)],
        visibility && styles[variationName('visibility', visibility)],
        responsiveClassNames &&
          responsiveClassNames.map((className) => styles[className]),
      )}
      style={responsiveStyle}
      aria-hidden={accessibilityVisibility === 'hidden' ? true : undefined}
      aria-label={role && accessibilityLabel}
      id={id}
    >
      {children}
    </Element>
  );
}
