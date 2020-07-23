import {createContext} from 'react';

interface Step {
  active: boolean;
  completed: boolean;
}

export interface StepperContextOptions {
  steps: Record<string, Step>;
}

export const StepperContext = createContext<StepperContextOptions | null>(null);
