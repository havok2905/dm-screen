import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';

import { ReactNode } from 'react';

import {
  InitiativeOrderContextProvider,
  PlayersContextProvider,
  RouteErrorBoundary
} from '../../src/dm-screen/components';

import '../../src/designSystem/styles/reset.css';
import '../../src/designSystem/styles/variables.css';
import '../../src/designSystem/styles/global.css';

export interface ApplicationBootstrapperProps {
  children: ReactNode;
}

export const ApplicationBootstrapper = ({
  children
}: ApplicationBootstrapperProps) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <PlayersContextProvider>
        <InitiativeOrderContextProvider>
          <RouteErrorBoundary>
            {children}
          </RouteErrorBoundary>
        </InitiativeOrderContextProvider>
      </PlayersContextProvider>
    </QueryClientProvider>
  );
};