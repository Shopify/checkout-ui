import React, {ReactNode} from 'react';

import styles from './FormattedText.css';

export interface Props {
  /* Content to be formatted */
  children?: string | ReactNode;
}

/**
 * FormattedText replaces new line characters with HTML line breaks (`<br />`).
 * Use this component when you want to render text created by an editor or a `<textarea>`.
 * For more complex use cases involving basic HTML tags, format the content as a React component
 * and pass it in as a child. The component will recieve customized styling based on the supported tags (currently only <strong>).
 */
export function FormattedText({children}: Props) {
  if (typeof children === 'string') {
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
  } else {
    return <div className={styles.FormattedText}>{children}</div>;
  }
}
