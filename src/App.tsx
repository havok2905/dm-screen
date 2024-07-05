import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import { adventure } from './core';
import { AdventureContextProvider } from './dm-screen/components/AdventureContext';
import { DmView } from './dm-screen/components/DmView';
import { InitiativeOrderContextProvider } from './dm-screen/components/InitiativeOrderContext';
import { PlayerView } from './dm-screen/components/PlayerView';
import { PlayersContextProvider } from './dm-screen/components/PlayersContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <DmView/>
    ),
  },
  {
    path: "player-view",
    element: (
      <PlayerView/>
    ),
  },
]);

export const App = () =>  {
  return (
    <AdventureContextProvider value={adventure}>
      <PlayersContextProvider>
        <InitiativeOrderContextProvider>
          <RouterProvider router={router} />
        </InitiativeOrderContextProvider>
      </PlayersContextProvider>
    </AdventureContextProvider>
  );
};

export default App
