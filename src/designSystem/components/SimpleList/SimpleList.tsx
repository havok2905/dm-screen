import { ReactNode, useState } from 'react';

import './SimpleList.css';

export interface SimpleListItem {
  hiddenContentRenderer?: () => ReactNode;
  label: string;
}

export interface SimpleListItemProps {
  item: SimpleListItem;
}

export const SimpleListItem = ({
  item
}: SimpleListItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    if (item.hiddenContentRenderer) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <li
      className="dm-screen-design-system-simple-list-item"
      onClick={onClick}>
      {item.label}
      {
        item.hiddenContentRenderer && isOpen ? (
          <div className="dm-screen-design-system-simple-list-content">
            {item.hiddenContentRenderer()}
          </div>
        ) : null
      }
    </li>
  );
};

export interface SimpleListProps {
  items: SimpleListItem[]; 
}

export const SimpleList = ({
  items
}: SimpleListProps) => {
  if (!items.length) {
    return (
      <p>
        There are not items.
      </p>
    )
  }

  return (
    <ul className="dm-screen-design-system-simple-list">
      {
        items.map((item) => {
          return (
            <SimpleListItem
              item={item}
              key={item.label}
            />
          );
        })
      }
    </ul>
  );
};
