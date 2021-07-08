import {useState, useEffect, useRef} from 'react';

import {usePrefersReducedMotion} from './media-query';

// Following implementation from React Transition Group
// @see http://reactcommunity.org/react-transition-group/transition

export type state =
  | 'enter'
  | 'entering'
  | 'entered'
  | 'exit'
  | 'exiting'
  | 'exited';

type duration = 'none' | 'fast' | 'base' | 'slow' | 'slower' | 'slowest';

export const durations = new Map<duration, number>([
  ['none', 0],
  ['fast', 133.333],
  ['base', 200],
  ['slow', 300],
  ['slower', 450],
  ['slowest', 675],
]);

export function useTransition(
  transitionIn: boolean,
  duration: duration | {enter?: duration; exit?: duration} = 'slow',
  transitionOnMount = false,
): state {
  const [state, setState] = useState(transitionOnMount ? false : transitionIn);
  const [transitioning, setTransitioning] = useState(false);
  const transitionInRef = useRef(transitionOnMount ? false : transitionIn);

  const endTransitionRef = useRef(() => {
    setTransitioning(false);
    setState(transitionInRef.current);
  });

  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (transitionIn !== transitionInRef.current) setTransitioning(true);
    transitionInRef.current = transitionIn;

    let enterDuration =
      typeof duration === 'string' ? duration : duration.enter;
    let exitDuration = typeof duration === 'string' ? duration : duration.exit;

    if (prefersReducedMotion) {
      enterDuration = 'none';
      exitDuration = 'none';
    }

    const timeout = setTimeout(
      endTransitionRef.current,
      transitionIn
        ? durations.get(enterDuration ?? 'none')
        : durations.get(exitDuration ?? 'none'),
    );
    return () => {
      clearTimeout(timeout);
    };
  }, [duration, prefersReducedMotion, transitionIn]);

  if (transitioning) {
    return transitionIn ? 'entering' : 'exiting';
  }

  if (transitionIn === state) {
    return transitionIn ? 'entered' : 'exited';
  }

  return transitionIn ? 'enter' : 'exit';
}
