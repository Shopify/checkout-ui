export type Placement = 'blockStart' | 'blockEnd' | 'inlineStart' | 'inlineEnd';

export interface Offsets {
  x: number;
  y: number;
}

export interface Clipping {
  left: number;
  right: number;
}

const SPACING = 10;

// Round the offsets to the nearest suitable subpixel
// based on the device pixel ratio.
export function roundOffsets({x, y}: Offsets): Offsets {
  const dpr = window.devicePixelRatio || 1;

  return {
    x: Math.round(x * dpr) / dpr || 0,
    y: Math.round(y * dpr) / dpr || 0,
  };
}

export function computeOffsets(
  placement: Placement,
  popperRect: DOMRectReadOnly | null,
  referenceRect: DOMRectReadOnly | null,
  {offset = 0, preventOverflow = false, sameInlineSize = false} = {},
) {
  let offsets: Offsets = {x: 0, y: 0};
  let clipping: Clipping = {left: 0, right: 0};
  let spacing = 0;

  if (!popperRect || !referenceRect) {
    return {offsets, clipping, spacing};
  }

  const commonX = sameInlineSize
    ? referenceRect.left
    : referenceRect.left + referenceRect.width / 2 - popperRect.width / 2;

  const commonY =
    referenceRect.top + referenceRect.height / 2 - popperRect.height / 2;

  switch (placement) {
    case 'blockStart':
      offsets = {
        x: commonX,
        y: referenceRect.top - popperRect.height - offset,
      };
      break;
    case 'blockEnd':
      offsets = {
        x: commonX,
        y: referenceRect.bottom + offset,
      };
      break;
    case 'inlineStart':
      offsets = {
        x: referenceRect.left - popperRect.width - offset,
        y: commonY,
      };
      break;
    case 'inlineEnd':
      offsets = {
        x: referenceRect.right + offset,
        y: commonY,
      };
      break;
  }

  if (preventOverflow) {
    clipping = getClipping(offsets, popperRect);

    if (clipping.right && !clipping.left) {
      offsets.x += clipping.right;
      spacing = -SPACING;
    }

    if (!clipping.right && clipping.left) {
      offsets.x = 0;
      spacing = SPACING;
    }
  }

  return {offsets, clipping, spacing};
}

function getClipping(offsets: Offsets, popperRect: DOMRectReadOnly) {
  const viewportWidth = document.documentElement.clientWidth;
  const elementWidth = offsets.x + popperRect.width;

  let clipping: Clipping = {left: 0, right: 0};

  if (elementWidth > viewportWidth) {
    clipping = {...clipping, right: viewportWidth - elementWidth};
  }
  if (offsets.x < 0) {
    clipping = {
      ...clipping,
      left: -offsets.x,
    };
  }

  return clipping;
}
