import { Button } from '@designSystem/components';

export interface InitiativeOrderDmNavControlsProps {
  isDisabled: boolean;
  isPlayer: boolean;
  next: () => void;
  prev: () => void;
  sort: () => void;
}

export const InitiativeOrderDmNavControls = ({
  isDisabled,
  isPlayer,
  next,
  prev,
  sort
}: InitiativeOrderDmNavControlsProps) => {
  if (isPlayer) return null;

  return (
    <div>
      <Button
        buttonText="Prev"
        disabled={isDisabled}
        onClick={() => {
          prev();
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            prev();
          }
        }}/>
      <Button
        buttonText="Next"
        disabled={isDisabled}
        onClick={() => {
          next();
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            next();
          }
        }}/>
      <Button
        buttonText="Sort"
        disabled={isDisabled}
        onClick={() => {
          sort();
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            sort();
          }
        }}/>
    </div>
  );
};
