import {createContext, useContext} from 'react';

export interface FormDetails {
  readonly id: string;
  readonly nested: boolean;
}

export const FormContext = createContext<FormDetails | undefined>(undefined);

export const useContainingForm = () => useContext(FormContext);
