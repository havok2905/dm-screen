import {
  createContext,
  ReactNode
} from 'react';

import { Adventure } from '../../../core/types';

const defaultAdventure: Adventure = {
  creatures: [],
  handouts: [],
  items: [],
  name: '',
  notes: '',
  system: ''
};

export const AdventureContext = createContext<Adventure>(defaultAdventure);

export interface AdventureContextProviderProps {
  children: ReactNode;
  value: Adventure;
}

export const AdventureContextProvider = ({
  children,
  value
}: AdventureContextProviderProps) => {
  return (
    <AdventureContext.Provider value={value}>
      {children}
    </AdventureContext.Provider>
  );
};