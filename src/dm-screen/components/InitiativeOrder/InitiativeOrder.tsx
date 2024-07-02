import { useContext } from 'react';
import {
  Button,
  LinkButton
} from '@designSystem/components';
import { InitiativeCard } from '../InitiativeCard';
import { InitiativeOrderContext } from '../InitiativeOrderContext';
import './InitiativeOrder.css';

export const InitiativeOrder = () => {
  const initiativeOrder = useContext(InitiativeOrderContext);

  return (
    <div className="initiative-order">
      <div className="initiative-order-card-list">
        {
          initiativeOrder.items.map((item) => {
            return (
              <InitiativeCard
                ac={item.resourceA}
                characterName={item.name}
                hp={item.resourceB}
                initiativeRoll={item.sortValue}
              />
            );
          })
        }
      </div>
      <div className="initiative-order-card-button-container">
        <div>
          <Button buttonText="Prev"/>
          <Button buttonText="Next"/>
          <Button buttonText="Sort"/>
        </div>
        <div>
          <LinkButton
            buttonText="Start New Combat"
            color="green"/>
        </div>
      </div>
    </div>
  )
};
