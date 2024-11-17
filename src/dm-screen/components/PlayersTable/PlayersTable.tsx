import { AdventurePlayer } from '@core/types';

import {
  Table
} from '@designSystem/components';

import {
  useCallback,
  useState
} from 'react';

import { ManagePlayersModal } from '../ManagePlayersModal';
import { useDestroyAdventurePlayer } from '../../hooks';

export interface PlayersTableProps {
  adventureId: string;
  players: AdventurePlayer[];
  refetch: () => void;
}

export const PlayersTable = ({
  adventureId,
  players,
  refetch
}: PlayersTableProps) => {
  const [activePlayerId, setActivePlayerId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const onSuccess = useCallback(() => {
    refetch();
  }, [
    refetch
  ]);

  const {
    mutate: destroyAdventurePlayer
  } = useDestroyAdventurePlayer(onSuccess);
  
  if (!players.length) {
    return (
      <p data-test-id="players-missing-text">
        There are no players set for this adventure.
      </p>
    )
  }

  return (
    <>
      <Table
        columns={[
          { name: 'Player' },
          { name: 'Character' },
          { name: 'AC' },
          { name: '' }
        ]}
        rows={
          players.map((player) => {
            return {
              data: [
                player.playername,
                player.charactername,
                player.ac
              ],
              actions: [
                {
                  name: 'Edit',
                  onClick: () => {
                    setActivePlayerId(player.id)
                    setIsModalOpen(true);
                  }
                },
                {
                  name: 'Delete',
                  onClick: () => {
                    destroyAdventurePlayer(player.id);
                  }
                }
              ]
            };
          })
        }
      />
      <ManagePlayersModal
        adventureId={adventureId}
        isOpen={isModalOpen}
        mutateType="update"
        onClose={() => {
          setIsModalOpen(false);
        }}
        player={players.find(p => p.id === activePlayerId)}
        refetch={refetch}
      />
    </>
  );
};
