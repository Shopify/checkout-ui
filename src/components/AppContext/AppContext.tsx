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

export type TranslationKey =
  | 'close'
  | 'expand'
  | 'submit'
  | 'processing'
  | 'dismissNotification'
  | 'january'
  | 'february'
  | 'march'
  | 'april'
  | 'may'
  | 'june'
  | 'july'
  | 'august'
  | 'september'
  | 'october'
  | 'november'
  | 'december'
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'
  | 'mondayAbbreviation'
  | 'tuesdayAbbreviation'
  | 'wednesdayAbbreviation'
  | 'thursdayAbbreviation'
  | 'fridayAbbreviation'
  | 'saturdayAbbreviation'
  | 'sundayAbbreviation'
  | 'showNextMonth'
  | 'showPreviousMonth';

export interface SimpleInterpolationReplacements {
  [key: string]: string | number;
}

export interface Geolocation {
  countryCode?: string;
}

export interface Context {
  linkComponent?: ComponentType<LinkLikeComponentProps>;
  geolocation?: Geolocation;
  translate(
    key: TranslationKey,
    replacements?: SimpleInterpolationReplacements,
  ): string;
}

export const AppContextContext = createContext<Context | null>(null);

export interface Props extends Context {
  children?: ReactNode;
}

export function AppContext({
  children,
  linkComponent,
  geolocation,
  translate,
}: Props) {
  const context = useMemo(() => ({translate, linkComponent, geolocation}), [
    translate,
    linkComponent,
    geolocation,
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

export function useGeolocation() {
  return useAppContext().geolocation;
}
