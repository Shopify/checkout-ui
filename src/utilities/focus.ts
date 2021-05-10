export function isFocused(element: HTMLElement | null) {
  return document.activeElement === element;
}

export const FOCUSABLE_SELECTOR = `
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

/* https://github.com/Shopify/javascript-utilities/blob/master/src/focus.ts */
export function findFirstFocusableNode(
  element: HTMLElement,
  onlyDescendants = true,
): HTMLElement | null {
  if (!onlyDescendants && element.matches(FOCUSABLE_SELECTOR)) {
    return element;
  }
  return element.querySelector(FOCUSABLE_SELECTOR);
}

export function findLastFocusableNode(
  element: HTMLElement,
  onlyDescendants = true,
) {
  if (!onlyDescendants && element.matches(FOCUSABLE_SELECTOR)) {
    return element;
  }
  const allFocusable = element.querySelectorAll(FOCUSABLE_SELECTOR);
  return allFocusable[allFocusable.length - 1] as HTMLElement | null;
}

export function findNextFocusableNode(node: HTMLElement) {
  const allFocusableElements = [
    ...document.querySelectorAll(FOCUSABLE_SELECTOR),
  ];
  const nodeIndex = allFocusableElements.findIndex(
    (currentNode) => node === currentNode,
  );

  if (nodeIndex) {
    return allFocusableElements[nodeIndex + 1] as HTMLElement;
  }

  return null;
}
