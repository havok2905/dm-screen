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
  CREATE_ADVENTURE_PATH,
  CREATE_CREATURE_PATH,
  CREATE_EQUIPMENT_ITEM_PATH,
  CREATE_MAGIC_ITEM_PATH,
  CREATE_SPELL_PATH,
  CREATURE_PATH,
  CREATURES_PATH,
  DM_VIEW_PATH,
  EDIT_ADVENTURE_CREATURE_PATH,
  EDIT_ADVENTURE_ITEM_PATH,
  EDIT_ADVENTURE_PATH,
  EDIT_CREATURE_PATH,
  EDIT_EQUIPMENT_ITEM_PATH,
  EDIT_MAGIC_ITEM_PATH,
  EDIT_SPELL_PATH,
  EQUIPMENT_ITEM_PATH,
  EQUIPMENT_ITEMS_PATH,
  IMPORTS_PATH,
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
  CreateCreaturePage,
  CreateEquipmentItemPage,
  CreateMagicItemPage,
  CreateSpellPage,
  CreaturePage,
  CreaturesPage,
  DmView,
  EditAdventureCreaturePage,
  EditAdventureItemPage,
  EditAdventurePage,
  EditCreaturePage,
  EditEquipmentItemPage,
  EditMagicItemPage,
  EditSpellPage,
  EquipmentItemPage,
  EquipmentItemsPage,
  ImportsPage,
  MagicItemPage,
  MagicItemsPage,
  PlayerView,
  SpellPage,
  SpellsPage
} from './dm-screen/pages';

import { InitiativeOrderContextProvider } from './dm-screen/components/InitiativeOrderContext';
import { RouteErrorBoundary } from './dm-screen/components/RouteErrorBoundary';

const router = createBrowserRouter([
  {
    path: DM_VIEW_PATH,
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
    path: ROOT_PATH,
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
    path: CREATE_CREATURE_PATH,
    element: (
      <RouteErrorBoundary>
        <CreateCreaturePage/>
      </RouteErrorBoundary>
    )
  },
  {
    path: CREATE_EQUIPMENT_ITEM_PATH,
    element: (
      <RouteErrorBoundary>
        <CreateEquipmentItemPage/>
      </RouteErrorBoundary>
    )
  },
  {
    path: CREATE_MAGIC_ITEM_PATH,
    element: (
      <RouteErrorBoundary>
        <CreateMagicItemPage/>
      </RouteErrorBoundary>
    )
  },
  {
    path: CREATE_SPELL_PATH,
    element: (
      <RouteErrorBoundary>
        <CreateSpellPage/>
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
    path: EDIT_CREATURE_PATH,
    element: (
      <RouteErrorBoundary>
        <EditCreaturePage/>
      </RouteErrorBoundary>
    )
  },
  {
    path: EDIT_EQUIPMENT_ITEM_PATH,
    element: (
      <RouteErrorBoundary>
        <EditEquipmentItemPage/>
      </RouteErrorBoundary>
    )
  },
  {
    path: EDIT_MAGIC_ITEM_PATH,
    element: (
      <RouteErrorBoundary>
        <EditMagicItemPage/>
      </RouteErrorBoundary>
    )
  },
  {
    path: EDIT_SPELL_PATH,
    element: (
      <RouteErrorBoundary>
        <EditSpellPage/>
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
    path: IMPORTS_PATH,
    element: (
      <RouteErrorBoundary>
        <ImportsPage/>
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
      <InitiativeOrderContextProvider>
        <RouterProvider router={router} />
      </InitiativeOrderContextProvider>
    </QueryClientProvider>
  );
};

export default App
