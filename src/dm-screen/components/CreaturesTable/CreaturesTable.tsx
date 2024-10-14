import {
  EntityType,
  Handout,
  MarkdownEntity,
  MetaData,
  VisibilityState
} from '@core/types';
import {
  Modal,
  Table
} from '@designSystem/components';
import {
  useContext,
  useMemo,
  useState
} from 'react';

import { v4 as uuidv4 } from 'uuid';

import { InitiativeOrderContext } from '../InitiativeOrderContext';
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

  const { getInitiativeOrder } = useContext(InitiativeOrderContext);

  const columns = useMemo(() => {
    const columns: string[] = [];

    creatures.forEach((creature) => {
      const { metadata } = creature;

      metadata.forEach((data) => {
        if (!columns.includes(data.name)) {
          columns.push(data.name);
        }
      });
    });

    columns.sort((a, b) => {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    });

    return columns.map(column => {
      return { name: column };
    });
  }, [
    creatures
  ]);

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
      <div data-test-id="no-creatures-found-text">
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
            ...columns
          ]
        }
        rows={
          filtered.map((creature) => {
            const { id, metadata } = creature;

            const rowData: MetaData[] = [];

            columns.forEach((column) => {
              const metaDataItem = metadata.find((m) => {
                return m.name === column.name;
              });

              if (metaDataItem) {
                rowData.push(metaDataItem);
              } else {
                rowData.push({
                  name: '',
                  type: 'string',
                  value: ''
                });
              }
            });

            return {
              data: [
                creature.name,
                ...rowData.map((item) => item.value)
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
                          entityType: EntityType.CREATURE,
                          gmOnly: false,
                          id: uuidv4(),
                          imageSrc: creature.image ?? '',
                          name: creature.name,
                          resourceA: creature.metadata.find((meta) => meta.name === 'AC')?.value as number ?? 0,
                          resourceB: creature.metadata.find((meta) => meta.name === 'HP')?.value as number ?? 0,
                          sortValue: 0,
                          visibilityState: VisibilityState.ON
                        }
                      ]);

                      handleUpdateInitiativeOrder();
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
                          entityType: EntityType.CREATURE,
                          gmOnly: false,
                          id: uuidv4(),
                          imageSrc: creature.image ?? '',
                          name: creature.name,
                          resourceA: creature.metadata.find((meta) => meta.name === 'AC')?.value as number ?? 0,
                          resourceB: creature.metadata.find((meta) => meta.name === 'HP')?.value as number ?? 0,
                          sortValue: 0,
                          visibilityState: VisibilityState.HIDDEN
                        }
                      ]);

                      handleUpdateInitiativeOrder();
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
