import classNames from 'classnames';
import { StatusEffects } from '@rules/enums';

import { StatusAvatar } from "./StatusAvatar";

import './StatusAvatarCollection.css';

export interface StatusAvatarCollectionProps {
  statuses: StatusEffects[];
}

export const StatusAvatarCollection = ({
  statuses
}: StatusAvatarCollectionProps) => {
  const crowdedThreshold = 4;
  const displayedThreshold = 8;
  
  const classList = {
    'status-avatar-collection': true,
    'status-avatar-collection-crowded': statuses.length > crowdedThreshold
  };

  return (
    <div className={classNames(classList)}>
      {
        statuses.map((status, index) => {
          return index < displayedThreshold ? (
            <StatusAvatar
              status={status}
              zIndex={index}
            />
          ) : null;
        })
      }
    </div>
  );
};
