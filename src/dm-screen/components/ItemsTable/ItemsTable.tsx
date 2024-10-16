import {
  Handout,
  MarkdownEntity
} from '@core/types';
import {
  Modal,
  Table
} from '@designSystem/components';

import { useState } from 'react';

import { Markdown } from '../Markdown';


export interface ItemsTableProps {
  handleShowHandout: (handout: Handout | null) => void;
  items: MarkdownEntity[];
  searchTerm: string;
}

export const ItemsTable = ({
  handleShowHandout,
  items,
  searchTerm
}: ItemsTableProps) => {
  const [currentItem, setCurrentItem] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setCurrentItem(null);
    setIsOpen(false);
  };

  const currentItemEntity =  items.find((item) => item.id === currentItem);

  const filtered = items.filter((item) => {
    return item.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
  });

  if (!filtered.length) {
    return (
      <div data-test-id="no-items-found-text">
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
            { name: 'Tags' }
          ]
        }
        rows={
          filtered.map((item) => {
            const { id, metadata } = item;

            const tags = metadata.map((item) => {
              return `${item.name}: ${item.value}`
            }).join(', ');

            return {
              data: [
                item.name,
                tags
              ],
              actions: [
                {
                  name: 'View',
                  onClick() {
                    setIsOpen(true);
                    setCurrentItem(id);
                  },
                },
                {
                  name: 'Show',
                  onClick() {
                    handleShowHandout({
                      description: item.name,
                      id: '',
                      name: item.name,
                      url: item.image ?? ''
                    });
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
          !!currentItemEntity?.image && (
            <img
              alt={currentItemEntity.name}
              src={currentItemEntity.image}
              style={{ maxWidth: "100%" }}/>
          )
        }
        {
          currentItem ? (
            <Markdown content={
              currentItemEntity?.content ?? ''
            }/>
          ) : null
        }
      </Modal>
    </>
  )
};
