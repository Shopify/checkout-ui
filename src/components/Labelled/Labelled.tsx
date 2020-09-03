import React, {
  useReducer,
  useMemo,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';
import {useMountedRef} from '@shopify/react-hooks';
import {classNames, variationName} from '@shopify/css-utilities';

import {Text} from '../Text';
import {Truncate} from '../Truncate';
import {
  useThemeConfiguration,
  ThemeLabelPosition,
  ThemeBackground,
} from '../Theme';

import {State, Action, LabelledContext} from './context';
import styles from './Labelled.css';

export interface Props {
  children?: ReactNode;
  label: string;
  htmlFor?: string;
  isEmpty?: boolean;
  position?: ThemeLabelPosition;
  background?: ThemeBackground;
  subdued?: boolean;
}

export function Labelled({
  children,
  label,
  htmlFor,
  isEmpty = true,
  position = 'inside',
  background = 'surfaceTertiary',
  subdued,
}: Props) {
  const mounted = useMountedRef();

  const [state, dispatch] = useReducer(
    (state: State, action: Action): State => {
      if (!mounted.current) return state;

      switch (action.type) {
        case 'focus': {
          return {...state, isFocused: true};
        }
        case 'blur': {
          return {
            ...state,
            isFloating: !state.isEmpty,
            isFocused: false,
          };
        }
        case 'change': {
          return {
            ...state,
            isFloating: true,
            isEmpty: action.isEmpty,
          };
        }
        case 'init': {
          return {
            ...state,
            isFloating: !action.isEmpty,
            isEmpty: action.isEmpty,
          };
        }
      }
    },
    {
      isEmpty,
      isFloating: !isEmpty,
      isFocused: false,
    },
  );

  // Handle value changes that bypasses the on Change handler
  // ie. asynchronously setting the value for a children
  useEffect(() => {
    if (!state.isFocused && state.isEmpty !== isEmpty) {
      dispatch({type: 'init', isEmpty});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEmpty]);

  const onFocus = useCallback(() => dispatch({type: 'focus'}), []);
  const onBlur = useCallback(() => dispatch({type: 'blur'}), []);
  const onChange = useCallback(
    (isEmpty: boolean) => dispatch({type: 'change', isEmpty}),
    [],
  );
  const value = useMemo(
    () => ({
      ...state,
      onBlur,
      onChange,
      onFocus,
    }),
    [onBlur, onChange, onFocus, state],
  );
  const {
    label: {typographyStyle},
  } = useThemeConfiguration();

  return (
    <LabelledContext.Provider value={value}>
      <div className={styles.Wrapper}>
        <div
          className={classNames({
            [styles.isFloating]: state.isFloating && position === 'inside',
          })}
        >
          <label
            htmlFor={htmlFor}
            className={classNames(
              styles.Label,
              styles[variationName('Label-position', position)],
              subdued && styles['Label-isSubdued'],
              background &&
                styles[variationName('Label-onBackground', background)],
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
