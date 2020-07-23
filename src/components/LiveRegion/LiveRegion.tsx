import React, {ReactNode} from 'react';

interface Props {
  children: ReactNode;
}

export function LiveRegion({children}: Props) {
  return (
    <div aria-live="polite" role="status" aria-atomic>
      {children}
    </div>
  );
}
