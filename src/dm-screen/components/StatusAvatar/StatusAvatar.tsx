import './StatusAvatar.css';
import { StatusEffects } from '@rules/enums';
import { Tooltip } from '@designSystem/components';

export interface StatusAvatarProps {
  status: StatusEffects,
  zIndex: number,
}

export const StatusAvatar = ({
  status,
  zIndex
}: StatusAvatarProps) => {
  const getImage = () => {
    switch(status) {
      case StatusEffects.BLINDED:
        return <>🙈</>;
      case StatusEffects.CHARMED:
        return <>🤩</>;
      case StatusEffects.DEAD:
        return <>💀</>;
      case StatusEffects.DEAFENED:
        return <>🙉</>;
      case StatusEffects.EXHAUSTION:
        return <>🥱</>;
      case StatusEffects.FRIGHTENED:
        return <>😧</>;
      case StatusEffects.GRAPPLED:
        return <>🤼‍♂️</>;
      case StatusEffects.INCAPACITATED:
        return <>😬</>;
      case StatusEffects.INVISIBLE:
        return <>👻</>;
      case StatusEffects.PARALYZED:
        return <>⚡</>;
      case StatusEffects.PETRIFIED:
        return <>👤</>;
      case StatusEffects.POISONED:
        return <>🤢</>;
      case StatusEffects.PRONE:
        return <>🦶</>;
      case StatusEffects.RESTRAINED:
        return <>💪</>;
      case StatusEffects.STUNNED:
        return <>😵</>;
      case StatusEffects.UNCONSCIOUS:
        return <>😴</>;
    }
  };

  return (
    <div
      className="status-avatar"
      style={{ zIndex }}
    >
      <Tooltip
        content={status}
        orientation="bottom-right"
      >
        {getImage()}
      </Tooltip>
    </div>
  );
};
