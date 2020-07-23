import {createContext} from 'react';

import {Offsets, Clipping, Placement} from './utilities/offsets';

export interface PopperContextOptions {
  clipping: Clipping;
  offsets: Offsets;
  placement: Placement;
  popperRect: DOMRectReadOnly | null;
  referenceRect: DOMRectReadOnly | null;
}

export const PopperContext = createContext<PopperContextOptions | null>(null);
