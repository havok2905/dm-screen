import { ReactNode } from 'react';

import './Grid.css';

export interface GridRowProps {
  children: ReactNode;
}

export const GridRow = ({
  children
}: GridRowProps) => {
  return (
    <div className="dm-screen-design-system-row">
      {children}
    </div>
  );
};
