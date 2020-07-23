import {useRef} from 'react';

type IdCreator = () => string;

export function createIdCreator(prefix: string): IdCreator {
  let index = 0;
  return () => `${prefix}${index++}`;
}

export function useId(explicitId: string | undefined, createId: IdCreator) {
  const idRef = useRef(explicitId);
  idRef.current = explicitId ?? idRef.current ?? createId();
  return idRef.current;
}
