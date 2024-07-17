import { ReactNode } from 'react';

import './CenteredContainer.css';

export interface CenteredContainerProps {
  children: ReactNode;
}

export const CenteredContainer = ({
  children
}: CenteredContainerProps) => {
  return (
    <div className="dm-screen-design-system-centered-container">
      {children}
    </div>
  )
};
