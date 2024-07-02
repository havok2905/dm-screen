import { useContext } from 'react';
import { Table } from '@designSystem/components';
import { PlayersContext } from '../PlayersContext';

export const PlayersTable = () => {
  const { players } = useContext(PlayersContext);

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
                onClick: () => {}
              }
            ]
          };
        })
      }
    />
  );
};
