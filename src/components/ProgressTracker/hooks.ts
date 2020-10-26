import {useContext} from 'react';

import {ProgressTrackerContext} from './context';

export function useProgressTracker() {
  const context = useContext(ProgressTrackerContext);

  if (context === null) {
    throw new Error('<Step />  must be used inside of an <ProgressTracker />');
  }

  return context;
}
