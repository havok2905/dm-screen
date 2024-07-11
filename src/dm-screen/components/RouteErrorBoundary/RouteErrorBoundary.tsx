import { ErrorBoundary } from "react-error-boundary";
import { ErrorDisplay } from '@designSystem/components';
import { ReactNode } from 'react';

export interface RouteErrorBoundaryProps {
  children: ReactNode
}

export const RouteErrorBoundary = ({
  children
}: RouteErrorBoundaryProps) => {
  return (
    <ErrorBoundary fallbackRender={({ error }) => {
      return (
        <ErrorDisplay
          message={error.message}
        />
      )
    }}>
      {children}
    </ErrorBoundary>
  )
};
