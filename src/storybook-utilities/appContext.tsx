import React from 'react';
import {StoryFn} from '@storybook/addons';

import '../style.css';
import {AppContext, AppContextProps} from '../components';

const translate: AppContextProps['translate'] = (key) => key;

export function appContext(storyFn: StoryFn<JSX.Element | null>) {
  return (
    <AppContext translate={translate}>
      <div
        style={
          {
            '--x-default-color-text': 'var(--x-color-canvas-text)',
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
            lineHeight: 'var(--x-global-typography-line-size)',
            textTransform: 'var(--x-global-typography-letter-case)',
          } as any
        }
      >
        {storyFn()}
      </div>
    </AppContext>
  );
}
