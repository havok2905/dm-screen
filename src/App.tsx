import { adventure } from './core';
import { AdventureContextProvider } from './dm-screen/components/AdventureContext/AdventureContext';
import { DmView } from './dm-screen/components/DmView';

export const App = () =>  {
  return (
    <AdventureContextProvider value={adventure}>
      <DmView/>
    </AdventureContextProvider>
  );
};

export default App
