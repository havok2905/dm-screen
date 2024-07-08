import { ReactNode } from 'react';

import './Section.css';

export interface SectionProps {
  children: ReactNode;
  sectionActions?: ReactNode;
  sectionHeaderEl?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  sectionTitle?: string;
}

export const Section = ({
  children,
  sectionActions,
  sectionHeaderEl,
  sectionTitle
}: SectionProps) => {
  const getSectionHeaderEl = (): ReactNode => {
    if (sectionHeaderEl === 'h1') return <h1>{sectionTitle}</h1>;
    if (sectionHeaderEl === 'h2') return <h2>{sectionTitle}</h2>;
    if (sectionHeaderEl === 'h3') return <h3>{sectionTitle}</h3>;
    if (sectionHeaderEl === 'h4') return <h4>{sectionTitle}</h4>;
    if (sectionHeaderEl === 'h5') return <h5>{sectionTitle}</h5>;
    if (sectionHeaderEl === 'h6') return <h6>{sectionTitle}</h6>;
    return <h1>{sectionTitle}</h1>;
  };

  const hasHeader = !!sectionActions || !!sectionTitle;

  return (
    <div className="dm-screen-design-system-section">
      {
        hasHeader ? (
          <div className="dm-screen-design-system-section-header">
            {getSectionHeaderEl()}
            {sectionActions}
          </div>
        ) : null
      }
      <div className="dm-screen-design-system-section-body">
        {children}
      </div>
    </div>
  );
};