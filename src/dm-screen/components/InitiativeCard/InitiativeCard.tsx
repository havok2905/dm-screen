import { CircleBadgeForm } from '@designSystem/components';
import classNames from 'classnames';
import { useCallback } from 'react';
import { VisibilityState } from '@core/types';

import './InitiativeCard.css';

export interface InitiativeCardProps {
  active?: boolean;
  gmOnly?: boolean;
  imageSrc?: string;
  name: string;
  onDoubleClick: () => void;
  onResourceAChange: (value: number) => void;
  onResourceBChange: (value: number) => void;
  onSortValueChange: (value: number) => void;
  playerView?: boolean;
  resourceA: number;
  resourceB: number;
  sortValue: number;
  visibilityState: VisibilityState;
}

export const InitiativeCard = ({
  active,
  gmOnly,
  imageSrc,
  name,
  onDoubleClick,
  onResourceAChange,
  onResourceBChange,
  onSortValueChange,
  playerView,
  resourceA,
  resourceB,
  sortValue,
  visibilityState
}: InitiativeCardProps) => {
  const isNum = useCallback((value: string): boolean => {
    const asNum = Number(value);
    return !Number.isNaN(asNum);
  }, []);

  const styles = imageSrc ? (
    {
      backgroundImage: `url("${imageSrc}")`
    }
  ) : undefined;

  const classList = {
    'initiative-card': true,
    'initiative-card-active': active,
    'initiative-card-gm-only': gmOnly,
    'initiative-card-hidden': visibilityState === 'hidden',
    'initiative-card-removed': visibilityState === 'removed' || ( gmOnly && playerView )
  };

  return (
    <div
      className={classNames(classList)}
      onDoubleClick={onDoubleClick}
      style={styles}>
      <div className="initiative-card-initiative-roll">
        <CircleBadgeForm
          color="orange"
          onChange={(value) => {
            onSortValueChange(Number(value) ?? 0);
          }}
          onValidate={isNum}
          value={String(sortValue)}
        />
      </div>
      <div className="initiative-card-ac">
        <CircleBadgeForm
          color="blue"
          onChange={(value) => {
            onResourceAChange(Number(value) ?? 0);
          }}
          onValidate={isNum}
          value={String(resourceA)}
        />
      </div>
      <div className="initiative-card-hp">
        <CircleBadgeForm
          color="green"
          onChange={(value) => {
            onResourceBChange(Number(value) ?? 0);
          }}
          onValidate={isNum}
          value={String(resourceB)}
        />
      </div>
      <p className="initiative-card-character-name">
        {name}
      </p>
    </div>
  );
};
