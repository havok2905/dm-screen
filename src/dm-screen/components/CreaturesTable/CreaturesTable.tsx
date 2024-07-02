import { useState } from 'react';
import {
  Modal,
  Table
} from '@designSystem/components';
import { Markdown } from '../Markdown';
import { adventure } from '../../../core';

export interface CreaturesTableProps {
  searchTerm: string;
}

export const CreaturesTable = ({
  searchTerm
}: CreaturesTableProps) => {
  const [currentCreature, setCurrentCreature] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setCurrentCreature(null);
    setIsOpen(false);
  };

  const filtered = adventure.creatures.filter((creature) => {
    return creature.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
  });

  if (!filtered.length) {
    return (
      <div>
        No creatures found for "{searchTerm}"
      </div>
    );
  }

  return (
    <>
      <Table
        columns={
          [
            { name: 'Creature' },
            ...adventure.creatures[0].metadata.map((item) => {
              return { name: item.name };
            })
          ]
        }
        rows={
          filtered.map((creature) => {
            const { id, metadata } = creature;

            return {
              data: [
                creature.name,
                ...metadata.map((item) => item.value)
              ],
              actions: [
                {
                  name: 'View',
                  onClick() {
                    setIsOpen(true);
                    setCurrentCreature(id);
                  },
                },
                {
                  name: 'Show',
                  onClick(e, rowData) {
                    console.log(id, e, rowData);
                  },
                },
                {
                  name: 'Add',
                  onClick(e, rowData) {
                    console.log(id, e, rowData);
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
          currentCreature ? (
            <Markdown content={
              adventure.creatures.find((creature) => creature.id === currentCreature)?.content ?? ''
            }/>
          ) : null
        }
      </Modal>
    </>
  )
};
