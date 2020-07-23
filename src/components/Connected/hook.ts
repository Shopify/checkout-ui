import {useContext, createContext} from 'react';

export const ConnectedContext = createContext<boolean>(false);

export function useConnected() {
  const connected = useContext(ConnectedContext);

  if (connected == null) {
    throw new Error('No connected fields found in context');
  }

  return connected;
}
