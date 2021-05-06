import React, {
  useState,
  useCallback,
  useEffect,
  PropsWithChildren,
} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';

import {Text} from '../Text';
import {Truncate} from '../Truncate';
import {
  useThemeConfiguration,
  ThemeLabelPosition,
  ThemeBackground,
} from '../Theme';

import {LabelledContext} from './context';
import styles from './Labelled.css';

export interface Props {
  label: string;
  htmlFor?: string;
  empty: boolean;
  position?: ThemeLabelPosition;
  background?: ThemeBackground;
  subdued?: boolean;
  prefixed?: boolean;
  hasIcon?: boolean;
}

export function Labelled({
  children,
  label,
  htmlFor,
  empty,
  position = 'inside',
  background = 'surfaceTertiary',
  subdued,
  prefixed,
  hasIcon,
}: PropsWithChildren<Props>) {
  const [focused, setFocused] = useState(false);
  const [wasNotEmpty, setWasNotEmpty] = useState(false);

  useEffect(() => {
    if (!empty) {
      setWasNotEmpty(true);
    } else if (!focused) {
      setWasNotEmpty(false);
    }
  }, [focused, empty]);

  const floating = (!empty || (empty && wasNotEmpty)) && position === 'inside';

  const handleFocus = useCallback(() => {
    setFocused(true);

    if (prefixed) {
      setWasNotEmpty(true);
    }
  }, [prefixed]);
  const handleBlur = useCallback(() => setFocused(false), []);

  const {
    label: {typographyStyle},
  } = useThemeConfiguration();

  return (
    <LabelledContext.Provider
      value={{
        onFocus: handleFocus,
        onBlur: handleBlur,
        focused,
        floating,
      }}
    >
      <div className={styles.Wrapper}>
        <div
          className={classNames({
            [styles.floating]: floating,
          })}
        >
          <label
            id={`${htmlFor}-label`}
            htmlFor={htmlFor}
            className={classNames(
              styles.Label,
              styles[variationName('Label-position', position)],
              subdued && styles['Label-subdued'],
              background &&
                styles[variationName('Label-onBackground', background)],
              hasIcon && styles['Label-nextToIcon'],
            )}
          >
            <Text size="small" subdued style={typographyStyle}>
              <Truncate>{label}</Truncate>
            </Text>
          </label>
          {children}
        </div>
      </div>
    </LabelledContext.Provider>
  );
}
