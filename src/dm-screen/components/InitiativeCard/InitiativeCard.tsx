import { useCallback, useState } from 'react';
import { CircleBadgeForm } from '@designSystem/components';

import './InitiativeCard.css';

export interface InitiativeCardProps {
  ac: number;
  hp: number;
  imageSrc?: string;
  initiativeRoll: number;
  characterName: string;
}

export const InitiativeCard = ({
  ac,
  hp,
  imageSrc,
  initiativeRoll,
  characterName
}: InitiativeCardProps) => {
  const [currentAc, setCurrentAc] = useState<number>(ac);
  const [currentHp, setCurrentHp] = useState<number>(hp);
  const [currentInitiativeRoll, setCurrentInitiativeRoll] = useState<number>(initiativeRoll);

  const isNum = useCallback((value: string): boolean => {
    const asNum = Number(value);
    return !Number.isNaN(asNum);
  }, []);

  const styles = imageSrc ? (
    {
      backgroundImage: `url("${imageSrc}")`
    }
  ) : undefined;

  return (
    <div
      className="initiative-card"
      style={styles}>
      <div className="initiative-card-initiative-roll">
        <CircleBadgeForm
          color="orange"
          onChange={(value) => {
            if (!value) {
              setCurrentInitiativeRoll(0);
            } else {
              setCurrentInitiativeRoll(Number(value));
            }
          }}
          onValidate={isNum}
          value={String(currentInitiativeRoll)}
        />
      </div>
      <div className="initiative-card-ac">
        <CircleBadgeForm
          color="blue"
          onChange={(value) => {
            if (!value) {
              setCurrentAc(0);
            } else {
              setCurrentAc(Number(value));
            }
          }}
          onValidate={isNum}
          value={String(currentAc)}
        />
      </div>
      <div className="initiative-card-hp">
        <CircleBadgeForm
          color="green"
          onChange={(value) => {
            if (!value) {
              setCurrentHp(0);
            } else {
              setCurrentHp(Number(value));
            }
          }}
          onValidate={isNum}
          value={String(currentHp)}
        />
      </div>
      <p className="initiative-card-character-name">
        {characterName}
      </p>
    </div>
  );
};
