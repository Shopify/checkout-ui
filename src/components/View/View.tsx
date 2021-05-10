import React, {PropsWithChildren} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';
import {ViewProps} from '@shopify/argo-checkout';

import {useResponsive} from '../../utilities/responsive';
import {useResponsiveValue} from '../../utilities/responsiveValue';
import {pixelOrPercent} from '../../utilities/units';

import styles from './View.css';

export function View({
  maxInlineSize,
  display = 'block',
  visibility,
  accessibilityVisibility,
  id,
  children,
  ...props
}: PropsWithChildren<ViewProps>) {
  const responsiveClassNames = useResponsive(props);

  const style = useResponsiveValue({
    ...(maxInlineSize &&
      typeof maxInlineSize === 'number' && {
        base: {maxWidth: pixelOrPercent(maxInlineSize)},
      }),
    ...(maxInlineSize &&
      typeof maxInlineSize === 'object' &&
      Object.entries(maxInlineSize).reduce((values, [breakpoint, value]) => {
        if (value) {
          return {
            ...values,
            [breakpoint]: {maxWidth: pixelOrPercent(value)},
          };
        }

        return values;
      }, {})),
  });

  const Element = display === 'inline' ? 'span' : 'div';

  return (
    <Element
      className={classNames(
        styles.View,
        visibility && styles[variationName('visibility', visibility)],
        responsiveClassNames &&
          responsiveClassNames.map((className) => styles[className]),
      )}
      style={style}
      aria-hidden={accessibilityVisibility === 'hidden'}
      id={id}
    >
      {children}
    </Element>
  );
}
