import {
  MemoryRouter,
  Route,
  Routes
} from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';

import { ReactNode } from 'react';

import {
  InitiativeOrderContextProvider,
  RouteErrorBoundary
} from '../../src/dm-screen/components';

import '../../src/designSystem/styles/reset.css';
import '../../src/designSystem/styles/variables.css';
import '../../src/designSystem/styles/global.css';

export interface ApplicationBootstrapperProps {
  children: ReactNode;
  path?: string;
  route?: string;
}

export const ApplicationBootstrapper = ({
  children,
  path,
  route
}: ApplicationBootstrapperProps) => {
  const queryClient = new QueryClient();

  if (path && route) {
    return (
      <QueryClientProvider client={queryClient}>
        <InitiativeOrderContextProvider>
          <MemoryRouter initialEntries={[
            path
          ]}>
            <Routes>
              <Route
                element={children}
                path={route}
              />
            </Routes>
          </MemoryRouter>
        </InitiativeOrderContextProvider>
      </QueryClientProvider>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <InitiativeOrderContextProvider>
        <RouteErrorBoundary>
          {children}
        </RouteErrorBoundary>
      </InitiativeOrderContextProvider>
    </QueryClientProvider>
  );
};