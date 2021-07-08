import React from 'react';

export function MockPrefersReducedMotion() {
  const css = `:root {
    --x-duration-fast: 0.001ms;
    --x-duration-base: 0.001ms;
    --x-duration-slow: 0.001ms;
    --x-duration-slower: 0.001ms;
    --x-duration-slowest: 0.001ms;
  }`;

  return <style>{css}</style>;
}
