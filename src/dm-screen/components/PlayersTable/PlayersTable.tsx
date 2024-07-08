import { Table } from '@designSystem/components';
import { useContext } from 'react';

import { PlayersContext } from '../PlayersContext';

export const PlayersTable = () => {
  const { players, setPlayers } = useContext(PlayersContext);

  if (!players.length) {
    return (
      <p>There are no players set for this adventure.</p>
    )
  }

  return (
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
              player.name,
              player.characterName,
              player.ac
            ],
            actions: [
              {
                name: 'Remove',
                onClick: () => {
                  setPlayers(players.filter((p) => p.id !== player.id))
                }
              }
            ]
          };
        })
      }
    />
  );
};
