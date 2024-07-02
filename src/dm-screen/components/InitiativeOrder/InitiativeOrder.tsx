import {
  Button,
  LinkButton
} from '@designSystem/components';
import { InitiativeCard } from '../InitiativeCard';
import './InitiativeOrder.css';

export const InitiativeOrder = () => {
  return (
    <div className="initiative-order">
      <div className="initiative-order-card-list">
        <InitiativeCard
          ac={10}
          characterName="Victoria Faerith"
          hp={39}
          initiativeRoll={12}
        />
        <InitiativeCard
          ac={10}
          characterName="Victoria Faerith"
          hp={39}
          initiativeRoll={12}
        />
        <InitiativeCard
          ac={10}
          characterName="Victoria Faerith"
          hp={39}
          initiativeRoll={12}
        />
        <InitiativeCard
          ac={10}
          characterName="Victoria Faerith"
          hp={39}
          initiativeRoll={12}
        />
        <InitiativeCard
          ac={10}
          characterName="Victoria Faerith"
          hp={39}
          initiativeRoll={12}
        />
        <InitiativeCard
          ac={10}
          characterName="Victoria Faerith"
          hp={39}
          initiativeRoll={12}
        />
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
