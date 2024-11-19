import { AdventurePlayer } from '@core/types';

import {
  Modal,
  Table
} from '@designSystem/components';
import {
  useCallback,
  useState
} from 'react';

import { ImageForm } from '../ImageForm';
import { ManagePlayersModal } from '../ManagePlayersModal';

import {
  useAddImage,
  useDestroyAdventurePlayer,
  useRemoveImage
} from '../../hooks';

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
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);

  const onSuccess = useCallback(() => {
    refetch();
  }, [
    refetch
  ]);

  const {
    mutate: destroyAdventurePlayer
  } = useDestroyAdventurePlayer(onSuccess);

  const {
    mutate: addImage,
    isError: addImageIsError
  } = useAddImage(() => {
    setActivePlayerId(null);
    setIsImageModalOpen(false);
    refetch();
  });

  const {
    mutate: removeImage
  } = useRemoveImage(() => {
    refetch();
  });
  
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
          { name: '' },
          { name: 'Player' },
          { name: 'Character' },
          { name: 'AC' },
          { name: '' }
        ]}
        rows={
          players.map((player) => {
            return {
              data: [
                {
                  type: 'table-image-data',
                  image: player.image ?? ''
                },
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
                  name: 'Add Image',
                  onClick: () => {
                    setActivePlayerId(player.id)
                    setIsImageModalOpen(true);
                  }
                },
                {
                  name: 'Remove Image',
                  onClick: () => {
                    removeImage({
                      entityType: 'adventure-player',
                      id: player.id
                    })
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
      <Modal
        isOpen={isImageModalOpen}
        onClose={() => {
          setIsImageModalOpen(false);
          setActivePlayerId(null);
        }}
        portalElement={document.body}
      >
        <h2>Upload Splash Image</h2>
        <ImageForm
          entityId={activePlayerId ?? ''}
          entityType="adventure-player"
          updateFunction={addImage}
          uploadIsError={addImageIsError}
        />
      </Modal>
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
