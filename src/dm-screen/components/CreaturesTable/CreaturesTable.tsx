import {
  useContext,
  useState
} from 'react';
import {
  Handout,
  MarkdownEntity
} from '@core/types';
import {
  Modal,
  Table
} from '@designSystem/components';
import { v4 as uuidv4 } from 'uuid';
import { InitiativeOrderContext } from '../InitiativeOrderContext';
import { Markdown } from '../Markdown';


export interface CreaturesTableProps {
  creatures: MarkdownEntity[];
  handleShowHandout: (handout: Handout | null) => void;
  searchTerm: string;
}

export const CreaturesTable = ({
  creatures,
  handleShowHandout,
  searchTerm
}: CreaturesTableProps) => {
  const [currentCreature, setCurrentCreature] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const {
    initiativeOrder: {
      items
    },
    setItems
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
                  onClick(e, rowData) {
                    setItems([
                      ...items,
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
                    ])
                    console.log(id, e, rowData);
                  },
                },
                {
                  name: 'Add Hidden',
                  onClick(e, rowData) {
                    setItems([
                      ...items,
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
                    ])
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
