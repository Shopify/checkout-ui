import {useContext, useRef, useEffect, useCallback, useState} from 'react';

import {ThemeConfiguration} from './types';
import {ThemeContext} from './context';

interface InternalState {
  watchedKeys: Set<keyof ThemeConfiguration>;
  reactiveConfiguration: ThemeConfiguration;
}

export function useTheme() {
  const theme = useContext(ThemeContext);

  if (theme == null) {
    throw new Error('No theme found in context');
  }

  return theme;
}

export function useThemeConfiguration(): ThemeConfiguration {
  const theme = useTheme();
  const forceUpdate = useForceUpdate();
  const themeConfigurationRef = useRef(theme.configuration);
  themeConfigurationRef.current = theme.configuration;

  const internals = useRef<InternalState>();
  if (internals.current == null) {
    const watchedKeys = new Set<keyof ThemeConfiguration>();
    const reactiveConfiguration: any = {};

    for (const key of Object.keys(
      theme.configuration,
    ) as (keyof ThemeConfiguration)[]) {
      Object.defineProperty(reactiveConfiguration, key, {
        enumerable: true,
        get() {
          watchedKeys.add(key);
          return themeConfigurationRef.current[key];
        },
      });
    }

    internals.current = {
      watchedKeys,
      reactiveConfiguration,
    };
  }

  useEffect(() => {
    const {current: currentConfiguration} = themeConfigurationRef;
    themeConfigurationRef.current = theme.configuration;

    if (
      [...internals.current!.watchedKeys].some(
        (key) => currentConfiguration[key] !== theme.configuration[key],
      )
    ) {
      forceUpdate();
    }

    return theme.on('change', () => {
      const {current: currentConfiguration} = themeConfigurationRef;
      themeConfigurationRef.current = theme.configuration;

      if (
        [...internals.current!.watchedKeys].some(
          (key) => currentConfiguration[key] !== theme.configuration[key],
        )
      ) {
        forceUpdate();
      }
    });
  }, [forceUpdate, theme]);

  return internals.current.reactiveConfiguration;
}

function useForceUpdate() {
  const [, forceUpdate] = useState({});
  return useCallback(() => forceUpdate(() => ({})), []);
}
