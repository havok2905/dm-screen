import { ReactNode } from 'react';

import './Grid.css';

export interface GridProps {
  children: ReactNode;
}

export const Grid = ({
  children
}: GridProps) => {
  return (
    <div className="dm-screen-design-system-grid">
      {children}
    </div>
  )
};
