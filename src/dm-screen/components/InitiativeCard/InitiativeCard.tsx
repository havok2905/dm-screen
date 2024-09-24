import { CircleBadgeForm } from '@designSystem/components';
import classNames from 'classnames';
import { StatusEffects } from '@rules/enums';
import { useCallback } from 'react';
import { VisibilityState } from '@core/types';

import { StatusAvatarCollection } from '../StatusAvatar/StatusAvatarCollection';

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
  statuses: StatusEffects[];
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
  statuses,
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

  const internalOnDoubleClick = () => {
    if (!playerView) {
      onDoubleClick();
    }
  };

  return (
    <div
      className={classNames(classList)}
      data-test-id="initiative-card"
      onDoubleClick={internalOnDoubleClick}
      style={styles}>
      {
        statuses.length ? (
          <div className="initiative-card-statuses">
            <StatusAvatarCollection statuses={statuses}/>
          </div>
        ) : null
      }
      <div className="initiative-card-resource-bubbles">
        <CircleBadgeForm
          color="orange"
          onChange={(value) => {
            onSortValueChange(Number(value) ?? 0);
          }}
          onValidate={isNum}
          value={String(sortValue)}
        />
        <CircleBadgeForm
          color="green"
          onChange={(value) => {
            onResourceBChange(Number(value) ?? 0);
          }}
          onValidate={isNum}
          value={String(resourceB)}
        />
        <CircleBadgeForm
          color="blue"
          onChange={(value) => {
            onResourceAChange(Number(value) ?? 0);
          }}
          onValidate={isNum}
          value={String(resourceA)}
        />
      </div>
      <p className="initiative-card-character-name">
        {name}
      </p>
    </div>
  );
};
