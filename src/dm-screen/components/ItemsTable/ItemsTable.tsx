import { useState } from 'react';
import {
  Modal,
  Table
} from '@designSystem/components';
import { Markdown } from '../Markdown';
import { adventure } from '../../../core';

export interface ItemsTableProps {
  searchTerm: string;
}

export const ItemsTable = ({
  searchTerm
}: ItemsTableProps) => {
  const [currentItem, setCurrentItem] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setCurrentItem(null);
    setIsOpen(false);
  };

  const filtered = adventure.items.filter((item) => {
    return item.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
  });

  if (!filtered.length) {
    return (
      <div>
        No items found for "{searchTerm}"
      </div>
    );
  }

  return (
    <>
      <Table
        columns={
          [
            { name: 'Item' },
            ...adventure.items[0].metadata.map((item) => {
              return { name: item.name };
            })
          ]
        }
        rows={
          filtered.map((item) => {
            const { id, metadata } = item;

            return {
              data: [
                item.name,
                ...metadata.map((i) => i.value)
              ],
              actions: [
                {
                  name: 'View',
                  onClick() {
                    setIsOpen(true);
                    setCurrentItem(id);
                  },
                }
              ]
            }
          })  
        }
      />
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        portalElement={document.body}
      >
        {
          currentItem ? (
            <Markdown content={
              adventure.items.find((item) => item.id === currentItem)?.content ?? ''
            }/>
          ) : null
        }
      </Modal>
    </>
  )
};
