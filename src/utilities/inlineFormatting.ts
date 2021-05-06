import {useContext, createContext} from 'react';

export const InlineFormattingContext = createContext<boolean>(false);

export function useInlineFormatting() {
  return useContext(InlineFormattingContext);
}
