import React from 'react';

export interface Props {
  lines?: number;
}

export function SkeletonText({lines = 1}: Props) {
  return (
    <div aria-hidden="true">
      {[...Array(lines).keys()].map((i) => (
        <div key={i} />
      ))}
    </div>
  );
}
