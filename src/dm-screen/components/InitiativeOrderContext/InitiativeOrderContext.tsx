import {
  createContext,
  ReactNode,
  useCallback,
  useRef,
  useState
} from 'react';
import {
  InitiativeOrder,
  InitiativeOrderInterface
} from '@core/InitiativeOrder';
import {
  InitiativeOrderState
} from '@core/types';

export interface InitiativeOrderContextModel {
  getInitiativeOrder: () => InitiativeOrderInterface | null;
  initiativeOrderState: InitiativeOrderState | null;
  setInitiativeOrder: (initiativeOrder: InitiativeOrderInterface) => void;
  setInitiativeOrderState: (initiativeOrderState: InitiativeOrderState) => void;
}

const defaultInitiativeOrder: InitiativeOrderContextModel = {
  getInitiativeOrder: () => {
    return new InitiativeOrder();
  },
  initiativeOrderState: new InitiativeOrder().getState(),
  setInitiativeOrder: () => {},
  setInitiativeOrderState: () => {}
};

export const InitiativeOrderContext = createContext<InitiativeOrderContextModel>(defaultInitiativeOrder);

export interface InitiativeOrderContextProviderProps {
  children: ReactNode;
}

export const InitiativeOrderContextProvider = ({
  children
}: InitiativeOrderContextProviderProps) => {
  const initiativeOrderRef = useRef<InitiativeOrderInterface | null>(null);
  const [initiativeOrderState, setInitiativeOrderState] = useState<InitiativeOrderState | null>(null);

  const getInitiativeOrder = useCallback((): InitiativeOrderInterface | null => {
    return initiativeOrderRef.current;
  }, []);

  const handleSetInitiativeOrderState = useCallback((initiativeOrderState: InitiativeOrderState) => {
    setInitiativeOrderState(initiativeOrderState);
  }, []);

  const setInitiativeOrder = useCallback((initiativeOrder: InitiativeOrderInterface) => {
    initiativeOrderRef.current = initiativeOrder;
  }, []);

  const contextModel: InitiativeOrderContextModel = {
    getInitiativeOrder,
    initiativeOrderState,
    setInitiativeOrder,
    setInitiativeOrderState: handleSetInitiativeOrderState
  };

  return (
    <InitiativeOrderContext.Provider value={contextModel}>
      {children}
    </InitiativeOrderContext.Provider>
  );
};
