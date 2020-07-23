import React from 'react';
import {createMount} from '@quilted/react-testing/dom';

import {
  UiTheme,
  ThemeContext,
  createTheme,
  AppContext,
  AppContextProps,
} from '../components';

interface Options extends Partial<Omit<AppContextProps, 'children'>> {
  theme?: UiTheme;
}

interface Context {
  theme: UiTheme;
}

const defaultTranslate: AppContextProps['translate'] = () =>
  'NO_TRANSLATIONS_PROVIDED';

export const mountWithContext = createMount<Options, Context>({
  context({theme = createTheme()}) {
    return {theme};
  },
  render(element, {theme}, {translate = defaultTranslate, linkComponent}) {
    return (
      <AppContext translate={translate} linkComponent={linkComponent}>
        <ThemeContext.Provider value={theme}>{element}</ThemeContext.Provider>
      </AppContext>
    );
  },
});
