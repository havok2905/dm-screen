import {
  createContext,
  ReactNode,
  useCallback,
  useRef
} from 'react';
import {
  InitiativeOrder,
  InitiativeOrderInterface
} from '@core/InitiativeOrder';

export interface InitiativeOrderContextModel {
  getInitiativeOrder: () => InitiativeOrderInterface | null;
  setInitiativeOrder: (initiativeOrder: InitiativeOrderInterface | null) => void;
}

const defaultInitiativeOrder: InitiativeOrderContextModel = {
  getInitiativeOrder: () => {
    return new InitiativeOrder();
  },
  setInitiativeOrder: () => {}
};

export const InitiativeOrderContext = createContext<InitiativeOrderContextModel>(defaultInitiativeOrder);

export interface InitiativeOrderContextProviderProps {
  children: ReactNode;
}

export const InitiativeOrderContextProvider = ({
  children
}: InitiativeOrderContextProviderProps) => {
  const initiativeOrderRef = useRef<InitiativeOrderInterface | null>(null);

  const getInitiativeOrder = useCallback((): InitiativeOrderInterface | null => {
    return initiativeOrderRef.current;
  }, []);

  const setInitiativeOrder = useCallback((initiativeOrder: InitiativeOrderInterface | null) => {
    initiativeOrderRef.current = initiativeOrder;
  }, []);

  const contextModel: InitiativeOrderContextModel = {
    getInitiativeOrder,
    setInitiativeOrder
  };

  return (
    <InitiativeOrderContext.Provider value={contextModel}>
      {children}
    </InitiativeOrderContext.Provider>
  );
};
