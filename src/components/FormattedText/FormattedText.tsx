import React from 'react';

export interface Props {
  /* Content to be formatted */
  children?: string;
}

/**
 * FormattedText replaces new line characters with HTML line breaks (`<br />`).
 * Use this component when you want to render text created by an editor or a `<textarea>`.
 *
 * Note: this component will eventually grow to support more use cases like basic HTML tags.
 */
export function FormattedText({children = ''}: Props) {
  return (
    <>
      {children
        .split('\n')
        .filter(Boolean)
        .map((content, index) => (
          <>
            {index > 0 && <br />}
            {content}
          </>
        ))}
    </>
  );
}
