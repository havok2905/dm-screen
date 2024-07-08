import { ReactNode } from 'react';

import './Footer.css';

export interface FooterProps {
  children: ReactNode;
}

export const Footer = ({
  children
}: FooterProps) => {
  return (
    <footer className="dm-screen-design-system-footer">
      {children}
    </footer>
  )
};
