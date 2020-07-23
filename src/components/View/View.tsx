import React, {ReactNode} from 'react';

export interface Props {
  children?: ReactNode;
}

/**
 * A View is a generic container component. Its contents will always be their
 * “natural” size, so this component can be useful in layout components (like `Tiles`,
 * `BlockStack`, `InlineStack`) that would otherwise stretch their children to fit.
 */
export function View({children}: Props) {
  return <div>{children}</div>;
}
