import React from 'react';

export interface Props {
  lines?: number;
}

export function SkeletonText({lines = 1}: Props) {
  // TODO: Implement the loading UI
  return (
    <div aria-hidden="true">
      {[...Array(lines).keys()].map((i) => (
        <div key={i}>LOADING</div>
      ))}
    </div>
  );
}
