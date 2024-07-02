import { adventure, players } from './core';
import { AdventureContextProvider } from './dm-screen/components/AdventureContext';
import { DmView } from './dm-screen/components/DmView';
import { InitiativeOrderContextProvider } from './dm-screen/components/InitiativeOrderContext';
import { PlayersContextProvider } from './dm-screen/components/PlayersContext';

export const App = () =>  {
  return (
    <AdventureContextProvider value={adventure}>
      <PlayersContextProvider value={players}>
        <InitiativeOrderContextProvider value={{
          currentIndex: 0,
          items: [],
          round: 1
        }}>
          <DmView/>
        </InitiativeOrderContextProvider>
      </PlayersContextProvider>
    </AdventureContextProvider>
  );
};

export default App
