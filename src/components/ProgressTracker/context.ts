import {createContext} from 'react';

interface Step {
  active: boolean;
  completed: boolean;
}

export interface ProgressTrackerContextOptions {
  steps: Record<string, Step>;
}

export const ProgressTrackerContext = createContext<ProgressTrackerContextOptions | null>(
  null,
);
