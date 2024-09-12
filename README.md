# dm-screen

**THIS PROJECT IS IN ACTIVE DEVELOPMENT AND NOT READY FOR USE**

## Current Node Versions

- Node: v22.3.0
- NPM: 10.8.1

## Setup

1. Clone this repository
2. Run `npm install`
3. Fetch a copy of the `.env` file from a contributor and place it in the root of the project. Reference `.env.example` for what this should look like.
4. Create empty `dist` and `dist-server` directories in the root of the project.
5. Run `npm run compile:server`. This will run the Typescript build for the API project and drop the build in `dist-server`.
6. Run `npm run db:migrate`. This will run the SQL to generate the Sqlite database in the root of this project.
7. Run `npm run db:reset`. This will remove the database, remigrate, and reseed.
7. Run `npm run db:seed`. This will populate the database with the test adventure data.
9. Run `npm run run:server` to start the API server.
10. In a new terminal run `npm run dev-client` to start the development client server.
11. Open the client app at the root route to see the app.
11. Open a new tab of the client app and navigate to `/player-view` to see the player's page.

## Important Commands

### Client Commands

| Command | Description |
| ------- | ----------- |
| dev-client | Runs a development instance of the client app. |
| storybook | Runs an instance of storybook. |

### Server Commands

| Command | Description |
| ------- | ----------- |
| compile:server | Runs a generic typescript compile on the server code |
| data:populate-all | populates db with all records from 5e api | 
| data:populate-creatures | populates db with creature data fetched from 5e api | 
| data:populate-equipment-items | populates db with equipment items data fetched from 5e api | 
| data:populate-magic-items | populates db with magic items data fetched from 5e api | 
| data:populate-spells | populates db with magic items data fetched from 5e api | 
| db:destroy | Removes the sqlite database from the project. |
| db:migrate | Runs database migrations and generates a sqlite database in the root fo the project. |
| db:reset | Destroys database, migrates, and seeds. |
| db:seed | Generates test data for the app. |
| run:server | Runs the typescript project in /dist-server |

### Test Commands

| Command | Description |
| ------- | ----------- |
| coverage | Runs Jest unit tests and generates files with coverage statistics. |
| eslint | Runs eslint against the project. |
| stylelint | Runs stylelint against the project. |
| test    | Runs Jest unit tests against the project with in-line coverage data. |

## Building a React Component

Frontend code for this project lives in the `src` directory and are broken into three modules.

- **core:** utility functions and types
- **designSystem:** shared React components that can be used to construct any kind of application.
- **dm-screen:** React components specific to managing ttrpg sessions.

When creating a new component, setup the directory like so:

- MyComponentName/
  - index.ts ( public exports )
  - MyComponentName.css
  - MyComponentName.stories.ts ( Optional )
  - MyComponentName.test.tsx
  - MyComponentName.tsx
  - MyChildComponentNameA.tsx
  - MyChildComponentNameA.test.tsx
  - MyChildComponentNameB.tsx
  - MyChildComponentNameB.test.tsx

## Contributing to the API project

The server component is still in flight and I am still establishing development patterns on that front. Expect conflicts and for there to be a lot of movement in that portion of the codebase

### Upcoming Architectural Changes

- Move from custom DB scripts to use Sequalize's more robust migration and CLI tooling.
- Shared code between server and client. This will need to happen for sharing websocket event strings, responses, and requests.
- SQLlite as a database. This is in place as a development tool for now. I don't know what database I want to use for this.
- Automatic data mapping for DB responses to API responses.
- Express exception catching middleware.
- Unit testing.
- Develop against up to date node version. ( Currently on 18.X )

## Auto Generated Vite Documentation

### React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## How Initiative Tracker Works

### Initiative Order Class

Initiative state is not something we can store in a TypeScript literal. As such, we can't simply store it in a useState variable. There may also be cases in the future of wanting to reuse initiative order logic outside of the context of react ( encounter simulations on the server end for example ).

`core/InitiativeOrder` captures this logic and returns its current state with `getState`.

Running initiative state change outside of react also leaves out potential issues with batch state changes not working properly. React is good about batching state change, but not perfect. For example, you may need to deal with the following:

```Typescript
initiativeOrder.next();
initiativeOrder.hide();
initiativeOrder.setResourceA(a);
initiativeOrder.setResourceB(b);
initiativeOrder.sort();

// Update data on the backend and proc a refetch of data. React updates accordingly with the single state update.
updateInitiativeOrderMutation(initiativeOrder.getState);
```

### Working with Initiative Order Components

At the page level we need to import the Initiative Order context. This will make our Initiative Order Typescript class available to all other sub components.

**Set up at the page level:**

```Typescript
import { InitiativeOrderContext } from '../InitiativeOrderContext';

const {
  getInitiativeOrder,
  setInitiativeOrder
} = useContext(InitiativeOrderContext);

useEffect(() => {
  // Initialize initiative order if it does't already exist
  const initiativeOrder = getInitiativeOrder() ?? new InitiativeOrder();

  // If we have data, populate the InitiativeOrder class instance
  if (initiativeData) {
    initiativeOrder.setCurrentId(initiativeData.initiativeOrderState.currentId);
    initiativeOrder.setItems(initiativeData.initiativeOrderState.items);
    initiativeOrder.setRound(initiativeData.initiativeOrderState.round);
  }

  // Set the current InitiativeOrder instance on the context
  setInitiativeOrder(initiativeOrder);
}, [
  initiativeData,
  getInitiativeOrder,
  setInitiativeOrder
]);
```

**Change Initiative State:**

```TypeScript
const handleUpdateInitiativeOrder = () => {
  // Get the InitiativeOrder instance on the context
  const initiativeOrder = getInitiativeOrder();

  if (initiativeData && initiativeOrder) {
    updateInitiative({
      id: initiativeData.id,
      // grab state from the InitiativeOrderInstance and use it to make an API call
      initiativeOrderState: JSON.stringify(initiativeOrder.getState())
    });

    // refetch initiative order state from API
    initiativeDataRefetch();
  }
};
```

**Proc initiative order event:**

```TypeScript
useEffect(() => {
  if (initiativeData) {
    socketRef.current?.emit('initiative:dispatch');
  }
}, [
  initiativeData
]);
```

**Listen on initiative order event:**

```TypeScript
  useEffect(() => {
    const ws = socketRef.current;

    // Listen on initiative item update event
    ws?.on('initiative:receive', () => {
      // Refetch data
      initiativeDataRefetch();
    });
  }, [
    initiativeDataRefetch
  ]);
```