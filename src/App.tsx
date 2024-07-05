import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

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

const queryClient = new QueryClient();

export const App = () =>  {
  return (
    <QueryClientProvider client={queryClient}>
      <PlayersContextProvider>
        <InitiativeOrderContextProvider>
          <RouterProvider router={router} />
        </InitiativeOrderContextProvider>
      </PlayersContextProvider>
    </QueryClientProvider>
  );
};

export default App
