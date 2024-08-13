import {
  Adventure,
  Handout,
  MarkdownEntity
} from '@core/types';
import {
  CenteredContainer,
  Container,
  Grid,
  GridRow,
  Item,
  Spinner,
  Table
} from '@designSystem/components';
import {
  Link,
  useParams
} from 'react-router-dom';
import {
  useCallback,
  useState
} from 'react';

import {
  ConfirmationModal,
  Markdown
} from '../../../components';
import {
  useAdventure,
  useDestroyAdventureCreature,
  useDestroyAdventureItem
} from '../../../hooks';

import { ADVENTURES_PATH } from '../../../routes';

export const AdventurePage = () => {
  const { id: adventureId } = useParams();
  const [activeId, setActiveId] = useState<string>('');
  const [currentCreaturesExpanded, setCurrentCreaturesExpanded] = useState<string[]>([]); 
  const [currentItemsExpanded, setCurrentItemsExpanded] = useState<string[]>([]);
  const [isAdventureCreatureConfirmModalOpen, setIsAdventureCreatureConfirmModalOpen] = useState<boolean>(false);
  const [isAdventureItemConfirmModalOpen, setIsAdventureItemConfirmModalOpen] = useState<boolean>(false);

  const {
    data,
    isFetching,
    isLoading,
    isPending,
    refetch
  } = useAdventure(adventureId ?? '');

  const onSuccess = useCallback(() => {
    refetch();
  }, [
    refetch
  ]);

  const {
    mutate: destroyAdventureCreature
  } = useDestroyAdventureCreature(onSuccess);

  const {
    mutate: destroyAdventureItem
  } = useDestroyAdventureItem(onSuccess);

  const onAdventureCreatureCancel = useCallback(() => {
    setIsAdventureCreatureConfirmModalOpen(false);
    setActiveId('');
  }, []);

  const onAdventureCreatureOk = useCallback(() => {
    destroyAdventureCreature(activeId);
    setIsAdventureCreatureConfirmModalOpen(false);
    setActiveId('');
  }, [
    activeId,
    destroyAdventureCreature
  ]);

  const onAdventureItemCancel = useCallback(() => {
    setIsAdventureItemConfirmModalOpen(false);
    setActiveId('');
  }, []);

  const onAdventureItemOk = useCallback(() => {
    destroyAdventureItem(activeId);
    setIsAdventureItemConfirmModalOpen(false);
    setActiveId('');
  }, [
    activeId,
    destroyAdventureItem
  ]);

  if (
    isFetching ||
    isLoading ||
    isPending
  ) return (
    <CenteredContainer>
      <Spinner/>
    </CenteredContainer>
  );

  const {
    creatures,
    id,
    items,
    handouts,
    name,
    notes,
    system
  } = data ?? {} as Adventure;

  const creatureColumns = [
    { name: 'Id' },
    { name: 'Name'}
  ];

  const toggleItem = (
    id: string,
    isExpanded: boolean
  ) => {
    if (isExpanded) {
      setCurrentItemsExpanded(currentItemsExpanded.filter((i) => {
        return i !== id;
      }));
    } else {
      setCurrentItemsExpanded([
        ...currentItemsExpanded,
        id
      ]);
    }
  };

  const toggleCreature = (
    id: string,
    isExpanded: boolean
  ) => {
    if (isExpanded) {
      setCurrentCreaturesExpanded(currentCreaturesExpanded.filter((c) => {
        return c !== id;
      }));
    } else {
      setCurrentCreaturesExpanded([
        ...currentCreaturesExpanded,
        id
      ]);
    }
  };

  const creatureRows = creatures?.map((creature: MarkdownEntity) => {
    const {
      content,
      id,
      image,
      metadata,
      name
    } = creature;

    const isExpanded = currentCreaturesExpanded.includes(id);

    return {
      data: [id, name],
      actions: [
        {
          name: isExpanded ? 'Collapse' : 'Expand',
          onClick: () => {
            toggleCreature(id, isExpanded);
          }
        },
        {
          name: 'Edit'
        },
        {
          name: 'Remove',
          onClick: () => {
            setIsAdventureCreatureConfirmModalOpen(true);
            setActiveId(id);
          }
        }
      ],
      collapsibleRenderer: () => {
        return (
          <div>
            {
              metadata.map((m, index) => {
                return (
                  <p key={index}>
                    {m.name}: {m.value}
                  </p>
                );
              })
            }
            {
              image ? <img alt={name} src={image}/> : null
            }
            <Markdown content={content} />
          </div>
        )
      },
      isExpanded
    };
  });

  const itemColumns = [
    { name: 'Id' },
    { name: 'Name'}
  ];

  const itemRows = items?.map((item: MarkdownEntity) => {
    const {
      content,
      id,
      image,
      metadata,
      name
    } = item;

    const isExpanded = currentItemsExpanded.includes(id);

    return {
      data: [id, name],
      actions: [
        {
          name: isExpanded ? 'Collapse' : 'Expand',
          onClick: () => {
            toggleItem(id, isExpanded);
          }
        },
        {
          name: 'Edit'
        },
        {
          name: 'Remove',
          onClick: () => {
            setIsAdventureItemConfirmModalOpen(true);
            setActiveId(id);
          }
        }
      ],
      collapsibleRenderer: () => {
        return (
          <div>
            {
              metadata.map((m, index) => {
                return (
                  <p key={index}>
                    {m.name}: {m.value}
                  </p>
                );
              })
            }
            {
              image ? <img alt={name} src={image} style={{ maxWidth: '100%' }}/> : null
            }
            <Markdown content={content} />
          </div>
        )
      },
      isExpanded
    };
  });

  const adventureContent = data ? (
    <>
      <h2>
        {name}
      </h2>
      <p>
        <strong>ID:</strong> {id}
      </p>
      <p>
        <strong>System:</strong> {system}
      </p>
      <hr/>
      <Grid>
        <GridRow>
          <Item columns={6}>
            <h3>
              Creatures
            </h3>
            <Table
              columns={creatureColumns}
              rows={creatureRows}
            />
            <h3>
              Items
            </h3>
            <Table
              columns={itemColumns}
              rows={itemRows}
            />
            <h3>
              Handouts
            </h3>
            {
              handouts.map((handout: Handout) => {
                const {
                  description,
                  id,
                  name,
                  url
                } = handout;
                return (
                  <>
                    <h4>
                      {name}
                    </h4>
                    <img 
                      alt={description}
                      key={id}
                      src={url}
                      style={{
                        maxWidth: '100%'
                      }}
                    />
                  </>
                )
              })
            }
          </Item>
          <Item columns={6}>
            <Markdown content={notes ?? ''}/>
          </Item>
        </GridRow>
      </Grid>
    </>
  ) : (
    <p>
      No adventure could be found for {adventureId}.
    </p>
  );

  return (
    <>
      <Container>
        <h1>
          Compendium
        </h1>
        <p>
          <Link to={ADVENTURES_PATH}>
            Back to Adventures
          </Link>
        </p>
        {
          adventureContent
        }
      </Container>
      <ConfirmationModal
        isOpen={isAdventureCreatureConfirmModalOpen}
        message="Are you sure you would like to destroy this creature and remove it from the adventure?"
        onCancel={onAdventureCreatureCancel}
        onOk={onAdventureCreatureOk}
      />
      <ConfirmationModal
        isOpen={isAdventureItemConfirmModalOpen}
        message="Are you sure you would like to destroy this item and remove it from the adventure?"
        onCancel={onAdventureItemCancel}
        onOk={onAdventureItemOk}
      />
    </>
  );
};
