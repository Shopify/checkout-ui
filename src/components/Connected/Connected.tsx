import React, {PropsWithChildren} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';

import {ConnectedContext} from './hook';
import styles from './Connected.css';

type Spacing = 'xtight' | 'tight' | 'loose' | 'xloose';
type Size = 'auto';

export interface Props {
  /** Sets the sizing of the leading child */
  leading?: Size;
  /** Sets the sizing of the trailing child */
  trailing?: Size;
  /** Adjust spacing between children */
  spacing?: Spacing;
}

/**
 * Connected groups inputs inline and maintains a consistent height across
 * inputs. It is commonly used for displaying a single-line TextField or Select
 * inline with a Button.
 */
export function Connected({
  children,
  spacing,
  leading,
  trailing,
}: PropsWithChildren<Props>) {
  return (
    <ConnectedContext.Provider value>
      <div
        className={classNames(
          styles.Connected,
          leading && styles[variationName('leading', leading)],
          trailing && styles[variationName('trailing', trailing)],
          spacing && styles[variationName('spacing', spacing)],
        )}
      >
        {children}
      </div>
    </ConnectedContext.Provider>
  );
}
