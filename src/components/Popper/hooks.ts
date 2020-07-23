import {useState, useCallback, useLayoutEffect, useContext} from 'react';

import {PopperContext} from './context';

export function usePopper() {
  const context = useContext(PopperContext);

  if (context === null) {
    throw new Error('No Popper in context');
  }

  return context;
}

type CallbackRef = (element: Element | null) => void;

export function useRect(): [DOMRectReadOnly | null, CallbackRef] {
  const [rect, setRect] = useState<DOMRectReadOnly | null>(null);

  const ref = useCallback((node) => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);

  return [rect, ref];
}

export function useEffectRect(ref: HTMLElement | null) {
  const [rect, setRect] = useState<DOMRectReadOnly | null>(null);

  const setBoundingRect = useCallback(() => {
    if (ref !== null) {
      setRect(ref.getBoundingClientRect());
    }
  }, [ref]);

  useLayoutEffect(() => {
    setBoundingRect();

    window.addEventListener('resize', setBoundingRect);
    window.addEventListener('scroll', setBoundingRect);

    return () => {
      window.removeEventListener('resize', setBoundingRect);
      window.removeEventListener('scroll', setBoundingRect);
    };
  }, [setBoundingRect]);

  return rect;
}
