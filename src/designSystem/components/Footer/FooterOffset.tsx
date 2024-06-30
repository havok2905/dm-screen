import { ReactNode } from 'react';
import './Footer.css';

export interface FooterOffsetProps {
  children: ReactNode;
}

export const FooterOffset = ({
  children
}: FooterOffsetProps) => {
  return (
    <footer className="dm-screen-design-system-footer-offset">
      {children}
    </footer>
  )
};
