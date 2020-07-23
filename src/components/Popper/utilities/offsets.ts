export type Placement = 'top' | 'bottom';

export interface Offsets {
  x: number;
  y: number;
}

export interface Clipping {
  left?: number;
  right?: number;
}

export function computeOffsets(
  placement: Placement,
  popperRect: DOMRectReadOnly | null,
  referenceRect: DOMRectReadOnly | null,
  {preventOverflow = false, sameWidth = false} = {},
) {
  let offsets: Offsets = {x: 0, y: 0};
  let clipping: Clipping = {};

  if (!popperRect || !referenceRect) {
    return {offsets, clipping};
  }

  const commonX = sameWidth
    ? referenceRect.left
    : referenceRect.left + referenceRect.width / 2 - popperRect.width / 2;

  switch (placement) {
    case 'top':
      offsets = {
        x: commonX,
        y: referenceRect.top - popperRect.height,
      };
      break;
    case 'bottom':
      offsets = {
        x: commonX,
        y: referenceRect.bottom,
      };
      break;
  }

  if (!sameWidth && preventOverflow) {
    clipping = getClipping(offsets, popperRect);

    if (clipping.right && !clipping.left) {
      offsets.x += clipping.right;
    }

    if (!clipping.right && clipping.left) {
      offsets.x = 0;
    }
  }

  return {offsets, clipping};
}

function getClipping(offsets: Offsets, popperRect: DOMRectReadOnly) {
  const viewportWidth = document.documentElement.clientWidth;
  const elementWidth = offsets.x + popperRect.width;

  let clipping: Clipping = {};

  if (elementWidth > viewportWidth) {
    clipping = {
      right: viewportWidth - elementWidth,
    };
  }
  if (offsets.x < 0) {
    clipping = {
      ...clipping,
      left: -offsets.x,
    };
  }

  return clipping;
}
