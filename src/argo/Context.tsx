import React, {useMemo} from 'react';

import '../style.css';
import {
  AppContext,
  AppContextProps,
  Theme,
  createTheme,
  UiTheme,
} from '../components';

interface Props extends Omit<AppContextProps, 'translate'> {
  theme?: UiTheme;
  translate?: AppContextProps['translate'];
}

const defaultTranslate: AppContextProps['translate'] = (key) => {
  switch (key) {
    case 'processing':
      return 'Processing';
    case 'submit':
      return 'Submit';
  }
};

export function Context({
  children,
  linkComponent,
  translate: explicitTranslate,
  theme: explicitTheme,
}: Props) {
  const theme = useMemo(() => explicitTheme ?? createTheme(), [explicitTheme]);
  const translate = useMemo(() => explicitTranslate ?? defaultTranslate, [
    explicitTranslate,
  ]);

  return (
    <AppContext translate={translate} linkComponent={linkComponent}>
      <Theme theme={theme}>{children}</Theme>
    </AppContext>
  );
}
