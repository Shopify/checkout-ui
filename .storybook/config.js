import {addDecorator} from '@storybook/preact';

import {appContext} from '../src/storybook-utilities';

import '../src/style.css';

addDecorator(appContext);
