import { ReactNode } from 'react';

import './Grid.css';

export interface RowProps {
  children: ReactNode;
}

export const Row = ({
  children
}: RowProps) => {
  return (
    <div className="dm-screen-design-system-row">
      {children}
    </div>
  );
};
