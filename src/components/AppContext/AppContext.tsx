import React, {
  createContext,
  useMemo,
  useContext,
  ReactNode,
  HTMLProps,
  ComponentType,
} from 'react';

import {HeadingGroup} from '../HeadingGroup';

export interface LinkLikeComponentProps extends HTMLProps<HTMLAnchorElement> {
  to: string;
  children?: React.ReactNode;
  external?: boolean;
  [key: string]: any;
}

export type TranslationKey = 'close' | 'expand' | 'submit' | 'processing';

export interface Context {
  linkComponent?: ComponentType<LinkLikeComponentProps>;
  translate(key: TranslationKey): string;
}

export const AppContextContext = createContext<Context | null>(null);

export interface Props extends Context {
  children?: ReactNode;
}

export function AppContext({children, translate, linkComponent}: Props) {
  const context = useMemo(() => ({translate, linkComponent}), [
    translate,
    linkComponent,
  ]);

  return (
    <AppContextContext.Provider value={context}>
      <HeadingGroup>{children}</HeadingGroup>
    </AppContextContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContextContext);

  if (context == null) {
    throw new Error('No app context available');
  }

  return context;
}

export function useTranslate() {
  return useAppContext().translate;
}

export function useLinkComponent() {
  return useAppContext().linkComponent;
}
