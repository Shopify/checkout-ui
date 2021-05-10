import {useEffect, useCallback, useRef} from 'react';

const FOCUSABLE_ELEMENTS = `
  a[href],
  area[href],
  input:not([type="hidden"]):not([disabled]):not([tabindex="-1"]),
  select:not([disabled]),
  textarea:not([disabled]),
  button:not([disabled]):not([tabindex="-1"]),
  iframe,
  object,
  embed,
  [tabindex="0"],
  [contenteditable],
  audio[controls],
  video[controls]`;

export function useFocusTrap({preventScroll} = {preventScroll: false}) {
  const ref = useRef<HTMLElement | null>(null);

  const findFocusableElements = useCallback(
    (ref: React.RefObject<HTMLElement>) => {
      const focusableElements = ref?.current?.querySelectorAll<HTMLElement>(
        FOCUSABLE_ELEMENTS,
      );

      if (focusableElements && focusableElements.length > 0) {
        const {
          0: firstElement,
          [focusableElements.length - 1]: lastElement,
        } = focusableElements;

        return {firstElement, lastElement};
      }

      return {firstElement: null, lastElement: null};
    },
    [],
  );

  const setRef = useCallback(
    (node) => {
      if (node) {
        if (!ref.current) {
          ref.current = node;

          setTimeout(() => {
            ref?.current?.focus({preventScroll});
          });
        }
      } else {
        ref.current = null;
      }
    },
    [preventScroll],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const {firstElement, lastElement} = findFocusableElements(ref);

      switch (event.key) {
        case 'Tab':
          if (event.shiftKey) {
            if (lastElement && document.activeElement === firstElement) {
              event.preventDefault();
              lastElement.focus();
            }
          } else if (!event.shiftKey) {
            if (firstElement && document.activeElement === lastElement) {
              event.preventDefault();
              firstElement.focus();
            }
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [findFocusableElements]);

  return setRef;
}
