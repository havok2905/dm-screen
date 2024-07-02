import {ReactNode} from 'react';
import './Container.css';

export interface ContainerProps {
  children: ReactNode;
}

export const Container = ({
  children
}: ContainerProps) => {
  return (
    <div className="dm-screen-design-system-container">
      {children}
    </div>
  )
};
