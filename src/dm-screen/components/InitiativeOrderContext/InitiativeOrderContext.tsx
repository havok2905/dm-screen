import {
  createContext,
  ReactNode
} from 'react';
import { InitiativeOrder } from '../../../core/types';

const defaultInitiativeOrder: InitiativeOrder = {
  currentIndex: 0,
  items: [],
  round: 1
};

export const InitiativeOrderContext = createContext<InitiativeOrder>(defaultInitiativeOrder);

export interface InitiativeOrderContextProviderProps {
  children: ReactNode;
  value: InitiativeOrder;
}

export const InitiativeOrderContextProvider = ({
  children,
  value
}: InitiativeOrderContextProviderProps) => {
  return (
    <InitiativeOrderContext.Provider value={value}>
      {children}
    </InitiativeOrderContext.Provider>
  );
};
