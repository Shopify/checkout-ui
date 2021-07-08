import React, {PropsWithChildren} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';
import {Responsive} from '@shopify/checkout-ui-extensions';

import {useResponsive} from '../../utilities/responsive';

import {ConnectedContext} from './hook';
import styles from './Connected.css';

type Spacing = 'extraTight' | 'tight' | 'base' | 'loose' | 'extraLoose';
type Size = 'auto';

export interface Props {
  /** Sets the sizing of the leading child */
  leading?: Size;
  /** Sets the sizing of the trailing child */
  trailing?: Size;
  /**
   * Adjust spacing between children
   * @defaultValue `base`
   */
  spacing?: Spacing;
  /** Whether or not to stack the children vertically */
  stack?: boolean | Responsive<boolean>;
}

/**
 * Connected groups inputs inline and maintains a consistent height across
 * inputs. It is commonly used for displaying a single-line TextField or Select
 * inline with a Button.
 */
export function Connected({
  children,
  spacing = 'base',
  leading,
  trailing,
  stack = false,
}: PropsWithChildren<Props>) {
  const responsiveClassNames = useResponsive({stack});

  return (
    <ConnectedContext.Provider value>
      <div
        className={classNames(
          styles.Connected,
          leading && styles[variationName('leading', leading)],
          trailing && styles[variationName('trailing', trailing)],
          styles[variationName('spacing', spacing)],
          responsiveClassNames.map((className) => styles[className]),
        )}
      >
        {children}
      </div>
    </ConnectedContext.Provider>
  );
}
