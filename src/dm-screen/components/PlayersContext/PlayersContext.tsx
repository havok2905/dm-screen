import {
  createContext,
  ReactNode
} from 'react';
import { Player } from '../../../core/types';

const defaultPlayers: Player[] = [];

export const PlayersContext = createContext<Player[]>(defaultPlayers);

export interface PlayersContextProviderProps {
  children: ReactNode;
  value: Player[];
}

export const PlayersContextProvider = ({
  children,
  value
}: PlayersContextProviderProps) => {
  return (
    <PlayersContext.Provider value={value}>
      {children}
    </PlayersContext.Provider>
  );
};
