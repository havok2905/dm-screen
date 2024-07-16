/* istanbul ignore file */

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

import {
  AdventurePage,
  AdventuresPage,
  CompendiumPage
} from './dm-screen/components/Compendium';

import {
  ADVENTURE_PATH,
  ADVENTURES_PATH,
  COMPENDIUM_PATH,
  PLAYER_VIEW_PATH,
  ROOT_PATH
} from './dm-screen/routes';

import { DmView } from './dm-screen/components/DmView';
import { InitiativeOrderContextProvider } from './dm-screen/components/InitiativeOrderContext';
import { PlayersContextProvider } from './dm-screen/components/PlayersContext';
import { PlayerView } from './dm-screen/components/PlayerView';
import { RouteErrorBoundary } from './dm-screen/components/RouteErrorBoundary';

const router = createBrowserRouter([
  {
    path: ROOT_PATH,
    element: (
      <RouteErrorBoundary>
        <DmView/>
      </RouteErrorBoundary>
    ),
  },
  {
    path: PLAYER_VIEW_PATH,
    element: (
      <RouteErrorBoundary>
        <PlayerView/>
      </RouteErrorBoundary>
    ),
  },
  {
    path: COMPENDIUM_PATH,
    element: (
      <RouteErrorBoundary>
        <CompendiumPage/>
      </RouteErrorBoundary>
    )
  },
  {
    path: ADVENTURE_PATH,
    element: (
      <RouteErrorBoundary>
        <AdventurePage/>
      </RouteErrorBoundary>
    )
  },
  {
    path: ADVENTURES_PATH,
    element: (
      <RouteErrorBoundary>
        <AdventuresPage/>
      </RouteErrorBoundary>
    )
  }
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
