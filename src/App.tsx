/* istanbul ignore file */

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
import { PlayersContextProvider } from './dm-screen/components/PlayersContext';
import { PlayerView } from './dm-screen/components/PlayerView';
import { RouteErrorBoundary } from './dm-screen/components/RouteErrorBoundary';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RouteErrorBoundary>
        <DmView/>
      </RouteErrorBoundary>
    ),
  },
  {
    path: "player-view",
    element: (
      <RouteErrorBoundary>
        <PlayerView/>
      </RouteErrorBoundary>
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
