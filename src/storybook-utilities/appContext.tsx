import React from 'react';
import {StoryFn} from '@storybook/addons';

import '../style.css';
import {AppContext, AppContextProps, PortalHost} from '../components';

type Translate = AppContextProps['translate'];
type TranslationKey = Parameters<Translate>[0];

const translate: AppContextProps['translate'] = (key) => {
  const translationMap = new Map<TranslationKey, () => string>([
    ['january', () => 'January'],
    ['close', () => 'Close'],
    ['expand', () => 'Expand notice'],
    ['processing', () => 'Processing…'],
    ['submit', () => 'Submit'],
    ['dismissNotification', () => 'Dismiss notification'],
    ['january', () => 'January'],
    ['february', () => 'February'],
    ['march', () => 'March'],
    ['april', () => 'April'],
    ['may', () => 'May'],
    ['june', () => 'June'],
    ['july', () => 'July'],
    ['august', () => 'August'],
    ['september', () => 'September'],
    ['october', () => 'October'],
    ['november', () => 'November'],
    ['december', () => 'December'],
    ['monday', () => 'Monday'],
    ['tuesday', () => 'Tuesday'],
    ['wednesday', () => 'Wednesday'],
    ['thursday', () => 'Thursday'],
    ['friday', () => 'Friday'],
    ['saturday', () => 'Saturday'],
    ['sunday', () => 'Sunday'],
    ['mondayAbbreviation', () => 'Mo'],
    ['tuesdayAbbreviation', () => 'Tu'],
    ['wednesdayAbbreviation', () => 'We'],
    ['thursdayAbbreviation', () => 'Th'],
    ['fridayAbbreviation', () => 'Fr'],
    ['saturdayAbbreviation', () => 'Sa'],
    ['sundayAbbreviation', () => 'Su'],
  ]);

  const translation = translationMap.get(key)?.();

  return translation == null ? key : translation;
};

export function appContext(storyFn: StoryFn<JSX.Element | null>) {
  return (
    <AppContext translate={translate}>
      <div
        style={
          {
            '--x-default-color': 'var(--x-color-canvas)',
            '--x-default-color-subdued': 'var(--x-color-canvas-subdued)',
            '--x-default-color-text-subdued':
              'var(--x-color-canvas-text-subdued)',
            '--x-default-color-text-emphasized':
              'var(--x-color-canvas-text-emphasized)',
            '--x-default-color-border': 'var(--x-color-canvas-border)',
            background: 'var(--x-color-canvas)',
            color: 'var(--x-default-color-text)',
            fontSize: 'var(--x-typography-size-default)',
            fontFamily: 'var(--x-typography-primary-fonts)',
            fontWeight: 'var(--x-typography-primary-weight-base)',
            lineHeight: 'var(--x-global-typography-line-size-default)',
            textTransform: 'var(--x-global-typography-letter-case)',
          } as any
        }
      >
        {storyFn()}
        <PortalHost />
      </div>
    </AppContext>
  );
}
