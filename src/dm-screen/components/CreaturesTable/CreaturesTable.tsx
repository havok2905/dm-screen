import {
  Handout,
  MarkdownEntity
} from '@core/types';
import {
  Modal,
  Table
} from '@designSystem/components';
import {
  useContext,
  useState
} from 'react';

import { InitiativeOrderContext } from '../InitiativeOrderContext';
import { v4 as uuidv4 } from 'uuid';

import { Markdown } from '../Markdown';

export interface CreaturesTableProps {
  creatures: MarkdownEntity[];
  handleShowHandout: (handout: Handout | null) => void;
  handleUpdateInitiativeOrder: () => void;
  searchTerm: string;
}

export const CreaturesTable = ({
  creatures,
  handleShowHandout,
  handleUpdateInitiativeOrder,
  searchTerm
}: CreaturesTableProps) => {
  const [currentCreature, setCurrentCreature] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const {
    getInitiativeOrder,
    setInitiativeOrderState
  } = useContext(InitiativeOrderContext);

  const handleClose = () => {
    setCurrentCreature(null);
    setIsOpen(false);
  };

  const filtered = creatures.filter((creature) => {
    return creature.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
  });

  const currentCreatureEntity = creatures.find((creature) => creature.id === currentCreature);

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
            ...creatures[0].metadata.map((item) => {
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
                  onClick() {
                    handleShowHandout({
                      description: creature.name,
                      id: '',
                      name: creature.name,
                      url: creature.image ?? ''
                    });
                  },
                },
                {
                  name: 'Add',
                  onClick() {
                    const initiativeOrder = getInitiativeOrder();
                    
                    if (initiativeOrder) {
                      initiativeOrder.setItems([
                        ...initiativeOrder.getItems(),
                        {
                          entityId: creature.id,
                          entityType: 'creature',
                          id: uuidv4(),
                          imageSrc: creature.image ?? '',
                          name: creature.name,
                          resourceA: creature.metadata.find((meta) => meta.name === 'AC')?.value as number ?? 0,
                          resourceB: creature.metadata.find((meta) => meta.name === 'HP')?.value as number ?? 0,
                          sortValue: 0,
                          visibilityState: 'on'
                        }
                      ]);

                      handleUpdateInitiativeOrder();
                      setInitiativeOrderState(initiativeOrder.getState());
                    }
                  },
                },
                {
                  name: 'Add Hidden',
                  onClick() {
                    const initiativeOrder = getInitiativeOrder();

                    if (initiativeOrder) {
                      initiativeOrder.setItems([
                        ...initiativeOrder.getItems(),
                        {
                          entityId: creature.id,
                          entityType: 'creature',
                          id: uuidv4(),
                          imageSrc: creature.image ?? '',
                          name: creature.name,
                          resourceA: creature.metadata.find((meta) => meta.name === 'AC')?.value as number ?? 0,
                          resourceB: creature.metadata.find((meta) => meta.name === 'HP')?.value as number ?? 0,
                          sortValue: 0,
                          visibilityState: 'hidden'
                        }
                      ]);

                      handleUpdateInitiativeOrder();
                      setInitiativeOrderState(initiativeOrder.getState());
                    }
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
          !!currentCreatureEntity?.image && (
            <img
              alt={currentCreatureEntity.name}
              src={currentCreatureEntity.image}
              style={{ maxWidth: "100%" }}/>
          )
        }
        {
          currentCreature ? (
            <Markdown content={
              currentCreatureEntity?.content ?? ''
            }/>
          ) : null
        }
      </Modal>
    </>
  )
};
