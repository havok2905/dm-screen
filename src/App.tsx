import { adventure, players } from './core';
import { AdventureContextProvider } from './dm-screen/components/AdventureContext';
import { DmView } from './dm-screen/components/DmView';
import { PlayersContextProvider } from './dm-screen/components/PlayersContext';

export const App = () =>  {
  return (
    <AdventureContextProvider value={adventure}>
      <PlayersContextProvider value={players}>
        <DmView/>
      </PlayersContextProvider>
    </AdventureContextProvider>
  );
};

export default App
