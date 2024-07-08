import { ReactNode } from 'react';

import classNames from 'classnames';

import './Grid.css';

export interface ItemProps {
  children: ReactNode;
  columns: number
}

export const Item = ({
  children,
  columns
}: ItemProps) => {
  const classList = {
    'dm-screen-design-system-item-1': columns === 1,
    'dm-screen-design-system-item-2': columns === 2,
    'dm-screen-design-system-item-3': columns === 3,
    'dm-screen-design-system-item-4': columns === 4,
    'dm-screen-design-system-item-5': columns === 5,
    'dm-screen-design-system-item-6': columns === 6,
    'dm-screen-design-system-item-7': columns === 7,
    'dm-screen-design-system-item-8': columns === 8,
    'dm-screen-design-system-item-9': columns === 9,
    'dm-screen-design-system-item-10': columns === 10,
    'dm-screen-design-system-item-11': columns === 11,
    'dm-screen-design-system-item-12': columns === 12
  };

  return (
    <div className={classNames(classList)}>
      {children}
    </div>
  );
};
