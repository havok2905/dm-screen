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
  ADVENTURE_PATH,
  ADVENTURES_PATH,
  COMPENDIUM_PATH,
  CREATE_ADVENTURE_PATH,
  CREATURE_PATH,
  CREATURES_PATH,
  EDIT_ADVENTURE_CREATURE_PATH,
  EDIT_ADVENTURE_ITEM_PATH,
  EDIT_ADVENTURE_PATH,
  EQUIPMENT_ITEM_PATH,
  EQUIPMENT_ITEMS_PATH,
  MAGIC_ITEM_PATH,
  MAGIC_ITEMS_PATH,
  PLAYER_VIEW_PATH,
  ROOT_PATH,
  SPELL_PATH,
  SPELLS_PATH
} from './dm-screen/routes';
import {
  AdventurePage,
  AdventuresPage,
  CompendiumPage,
  CreateAdventurePage,
  CreaturePage,
  CreaturesPage,
  DmView,
  EditAdventureCreaturePage,
  EditAdventureItemPage,
  EditAdventurePage,
  EquipmentItemPage,
  EquipmentItemsPage,
  MagicItemPage,
  MagicItemsPage,
  PlayerView,
  SpellPage,
  SpellsPage
} from './dm-screen/pages';

import { InitiativeOrderContextProvider } from './dm-screen/components/InitiativeOrderContext';
import { PlayersContextProvider } from './dm-screen/components/PlayersContext';
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
  },
  {
    path: CREATE_ADVENTURE_PATH,
    element: (
      <RouteErrorBoundary>
        <CreateAdventurePage/>
      </RouteErrorBoundary>
    )
  },
  {
    path: CREATURE_PATH,
    element: (
      <RouteErrorBoundary>
        <CreaturePage/>
      </RouteErrorBoundary>
    )
  },
  {
    path: CREATURES_PATH,
    element: (
      <RouteErrorBoundary>
        <CreaturesPage/>
      </RouteErrorBoundary>
    )
  },
  {
    path: EDIT_ADVENTURE_CREATURE_PATH,
    element: (
      <RouteErrorBoundary>
        <EditAdventureCreaturePage/>
      </RouteErrorBoundary>
    )
  },
  {
    path: EDIT_ADVENTURE_ITEM_PATH,
    element: (
      <RouteErrorBoundary>
        <EditAdventureItemPage/>
      </RouteErrorBoundary>
    )
  },
  {
    path: EDIT_ADVENTURE_PATH,
    element: (
      <RouteErrorBoundary>
        <EditAdventurePage/>
      </RouteErrorBoundary>
    )
  },
  {
    path: EQUIPMENT_ITEM_PATH,
    element: (
      <RouteErrorBoundary>
        <EquipmentItemPage/>
      </RouteErrorBoundary>
    )
  },
  {
    path: EQUIPMENT_ITEMS_PATH,
    element: (
      <RouteErrorBoundary>
        <EquipmentItemsPage/>
      </RouteErrorBoundary>
    )
  },
  {
    path: MAGIC_ITEM_PATH,
    element: (
      <RouteErrorBoundary>
        <MagicItemPage/>
      </RouteErrorBoundary>
    )
  },
  {
    path: MAGIC_ITEMS_PATH,
    element: (
      <RouteErrorBoundary>
        <MagicItemsPage/>
      </RouteErrorBoundary>
    )
  },
  {
    path: SPELL_PATH,
    element: (
      <RouteErrorBoundary>
        <SpellPage/>
      </RouteErrorBoundary>
    )
  },
  {
    path: SPELLS_PATH,
    element: (
      <RouteErrorBoundary>
        <SpellsPage/>
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
