import { LinkButton } from '@designSystem/components';

export interface InitiativeOrderDmControlsProps {
  handleBootstrapInitiativeClick: () => void;
  handleRemoveInitiativeClick: () => void;
  inInCombat: boolean;
  isPlayer: boolean
}

export const InitiativeOrderDmControls = ({
  handleBootstrapInitiativeClick,
  handleRemoveInitiativeClick,
  inInCombat,
  isPlayer
}: InitiativeOrderDmControlsProps) => {
  if (isPlayer) return null;

  return (
    <div>
      {
        inInCombat ? (
          <LinkButton
            buttonText="End Combat"
            color="red"
            onClick={handleRemoveInitiativeClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleRemoveInitiativeClick();
              }
            }}/>
        ) : (
          <LinkButton
            buttonText="Bootstrap Combat"
            color="green"
            onClick={handleBootstrapInitiativeClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleBootstrapInitiativeClick();
              }
            }}/>
        )
      }
    </div>
  );
}
