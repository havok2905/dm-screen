import {
  ReactNode,
  useContext,
  useEffect
} from 'react';

import { InitiativeOrder } from '@core/InitiativeOrder';
import { InitiativeOrderState } from '@core/types';

import { InitiativeOrderContext } from '../../src/dm-screen/components/InitiativeOrderContext';

export const MountInitiativeOrder = ({
  children,
  initiativeOrderState
}: {
  children: ReactNode
  initiativeOrderState?: InitiativeOrderState
}) => {
  const { setInitiativeOrder } = useContext(InitiativeOrderContext);

  useEffect(() => {
    const initiativeOrder = new InitiativeOrder();

    if (initiativeOrderState) {
      initiativeOrder.setCurrentId(initiativeOrderState.currentId);
      initiativeOrder.setItems(initiativeOrderState.items);
      initiativeOrder.setRound(initiativeOrderState.round);
    }

    setInitiativeOrder(initiativeOrder);
  }, []);

  return (
    <>
      {children}
    </>
  )
};
