import {
  createContext,
  ReactNode,
  useState
} from 'react';
import { Player } from '@core/types';

export interface PlayersContextModel {
  players: Player[];
  setPlayers: (players: Player[]) => void;
}

const defaultPlayers: PlayersContextModel = {
  players: [],
  setPlayers: () => {}
}

export const PlayersContext = createContext<PlayersContextModel>(defaultPlayers);

export interface PlayersContextProviderProps {
  children: ReactNode;
}

export const PlayersContextProvider = ({
  children
}: PlayersContextProviderProps) => {
  const [players, setPlayers] = useState<Player[]>([]);

  const handleSetPlayers = (players: Player[]) => {
    setPlayers(players);
  }

  const contextModel: PlayersContextModel = {
    players,
    setPlayers: handleSetPlayers
  };

  return (
    <PlayersContext.Provider value={contextModel}>
      {children}
    </PlayersContext.Provider>
  );
};
