import {
  Adventure,
  Handout,
  MarkdownEntity
} from '@core/types';
import {
  Button,
  CenteredContainer,
  Container,
  Grid,
  GridRow,
  Input,
  Item,
  LinkButton,
  Modal,
  Spinner,
  Table
} from '@designSystem/components';
import {
  Link,
  useNavigate,
  useParams
} from 'react-router-dom';
import {
  ReactNode,
  useCallback,
  useState
} from 'react';

import {
  ADVENTURES_PATH,
  EDIT_ADVENTURE_CREATURE_PATH,
  EDIT_ADVENTURE_ITEM_PATH
} from '../../../routes';
import {
  CompendiumNavbar,
  ConfirmationModal,
  HandoutForm,
  Markdown
} from '../../../components';
import {
  useAddCreature,
  useAddEquipmentItem,
  useAddHandout,
  useAddMagicItem,
  useAdventure,
  useCreatures,
  useDestroyAdventureCreature,
  useDestroyAdventureItem,
  useEquipmentItems,
  useMagicItems
} from '../../../hooks';

export const AdventurePage = () => {
  const { id: adventureId } = useParams();
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState<string>('');
  const [currentCreaturesExpanded, setCurrentCreaturesExpanded] = useState<string[]>([]); 
  const [currentItemsExpanded, setCurrentItemsExpanded] = useState<string[]>([]);
  const [currentMarkdownItemsExpanded, setCurrentMarkdownItemsExpanded] = useState<string[]>([]);
  const [nameSearchTerm, setNameSearchTerm] = useState<string>('');
  const [tagSearchTerm, setTagSearchTerm] = useState<string>('');
  const [isAdventureCreatureConfirmModalOpen, setIsAdventureCreatureConfirmModalOpen] = useState<boolean>(false);
  const [isAdventureItemConfirmModalOpen, setIsAdventureItemConfirmModalOpen] = useState<boolean>(false);
  const [isCreatureCompendiumModalOpen, setIsCreatureCompendiumModalOpen] = useState<boolean>(false);
  const [isHandoutModalOpen, setIsHandoutModalOpen] = useState<boolean>(false);
  const [isItemCompendiumModalOpen, setIsItemCompendiumModalOpen] = useState<boolean>(false);
  const [isMagicItemCompendiumModalOpen, setIsMagicItemCompendiumModalOpen] = useState<boolean>(false);

  const {
    data,
    isFetching,
    isLoading,
    isPending,
    refetch
  } = useAdventure(adventureId ?? '');

  const {
    data: creaturesData,
    isFetching: creaturesIsFetching,
    isLoading: creaturesIsLoading,
    isPending: creaturesIsPending
  } = useCreatures();

  const {
    data: itemsData,
    isFetching: itemsIsFetching,
    isLoading: itemsIsLoading,
    isPending: itemsIsPending
  } = useEquipmentItems();

  const {
    data: magicItemsData,
    isFetching: magicItemsIsFetching,
    isLoading: magicItemsIsLoading,
    isPending: magicItemsIsPending
  } = useMagicItems();

  const onSuccess = useCallback(() => {
    refetch();
  }, [
    refetch
  ]);

  const onAddItemSuccess = useCallback(() => {
    refetch();
    setCurrentMarkdownItemsExpanded([]);
    setNameSearchTerm('');
    setTagSearchTerm('');
    setIsItemCompendiumModalOpen(false);
    setIsMagicItemCompendiumModalOpen(false);
  }, [
    refetch
  ]);

  const onAddCreatureSuccess = useCallback(() => {
    refetch();
    setCurrentMarkdownItemsExpanded([]);
    setNameSearchTerm('');
    setTagSearchTerm('');
    setIsCreatureCompendiumModalOpen(false);
  }, [
    refetch
  ]);

  const onAddHandoutSuccess = useCallback(() => {
    refetch();
    setIsHandoutModalOpen(false);
  }, [
    refetch
  ]);

  const {
    mutate: addCreature
  } = useAddCreature(onAddCreatureSuccess);

  const {
    mutate: addEquipmentItem
  } = useAddEquipmentItem(onAddItemSuccess);

  const {
    mutate: addMagicItem
  } = useAddMagicItem(onAddItemSuccess);

  const {
    mutate: destroyAdventureCreature
  } = useDestroyAdventureCreature(onSuccess);

  const {
    mutate: destroyAdventureItem
  } = useDestroyAdventureItem(onSuccess);

  const {
    mutate: addHandout
  } = useAddHandout(onAddHandoutSuccess);

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
    isPending ||
    itemsIsFetching ||
    itemsIsLoading ||
    itemsIsPending ||
    magicItemsIsFetching ||
    magicItemsIsLoading ||
    magicItemsIsPending ||
    creaturesIsFetching ||
    creaturesIsLoading ||
    creaturesIsPending
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

  const markdownCreatures = creaturesData as MarkdownEntity[];

  const markdownItems = itemsData as MarkdownEntity[];

  const markdownMagicItems = magicItemsData as MarkdownEntity[];

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

  const toggleMarkdownItem = (
    id: string,
    isExpanded: boolean
  ) => {
    if (isExpanded) {
      setCurrentMarkdownItemsExpanded(currentMarkdownItemsExpanded.filter((i) => {
        return i !== id;
      }));
    } else {
      setCurrentMarkdownItemsExpanded([
        ...currentMarkdownItemsExpanded,
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
          name: 'Edit',
          onClick: () => {
            navigate(EDIT_ADVENTURE_CREATURE_PATH.replace(':id', id))
          }
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
          name: 'Edit',
          onClick: () => {
            navigate(EDIT_ADVENTURE_ITEM_PATH.replace(':id', id))
          }
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
            <Button
              buttonText="Add creature from compendium"
              onClick={() => {
                setIsCreatureCompendiumModalOpen(true);
              }} />
            <Table
              columns={creatureColumns}
              rows={creatureRows}
            />
            <h3>
              Items
            </h3>
            <Button
              buttonText="Add equipment from compendium"
              onClick={() => {
                setIsItemCompendiumModalOpen(true);
              }} />
            <Button
              buttonText="Add magic item from compendium"
              onClick={() => {
                setIsMagicItemCompendiumModalOpen(true);
              }} />
            <Table
              columns={itemColumns}
              rows={itemRows}
            />
            <h3>
              Handouts
            </h3>
            <Button
              buttonText="Add handout"
              onClick={() => {
                setIsHandoutModalOpen(true);
              }}
            />
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

  const getItemsModal = (
    collection: MarkdownEntity[],
    isOpen: boolean,
    onClose: () => void,
    onAdd: (id: string, itemId: string) => void
  ): ReactNode => (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      portalElement={document.body}>
        <h2>Add from compendium</h2>
        <Input
          full
          inputId="add-item-name-filter"
          inputName="add-item-name-filter"
          label="Name"
          onChange={(e) => {
            setNameSearchTerm(e.target.value ?? '');
          }}
        />
        <Input
          full
          inputId="add-item-tag-filter"
          inputName="add-item-tag-filter"
          label="Tag"
          onChange={(e) => {
            setTagSearchTerm(e.target.value ?? '');
          }}
        />
        <table>
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Metadata</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              collection
                .filter((item) => {
                  if (!nameSearchTerm && !tagSearchTerm) return true;

                  const name = item.name.toLocaleLowerCase().trim();
                  const nameSearch = nameSearchTerm.toLocaleLowerCase().trim();
                  const tagSearch = tagSearchTerm.toLocaleLowerCase().trim();

                  const isNameMatch = name.includes(nameSearch);

                  const isMetadataMatch = !!item.metadata.find((md) => {
                    const val = md.value.toString().toLocaleLowerCase().trim();
                    return val.includes(tagSearch);
                  });

                  return isNameMatch && isMetadataMatch;
                })
                .map((item) => {
                  const { content, id, image, metadata, name } = item;

                  const isExpanded = currentMarkdownItemsExpanded.includes(id);

                  return (
                    <>
                      <tr key={id}>
                        <td>
                          {name}
                        </td>
                        <td>
                          {
                            metadata.map((md, index) => {
                              return (
                                <span key={index}>
                                  <strong>{md.name}</strong>: {md.value}{' '}
                                </span>
                              )
                            })
                          }
                        </td>
                        <td>
                          <LinkButton
                            buttonText={isExpanded ? 'Collapse' : 'Expand'}
                            color="green"
                            onClick={() => {
                              toggleMarkdownItem(id, isExpanded);
                            }}/>
                          <LinkButton
                            buttonText="Add"
                            color="green"
                            onClick={() => {
                              onAdd(
                                adventureId ?? '',
                                id ?? ''
                              )
                            }}/>
                        </td>
                      </tr>
                      <tr>
                        {
                          isExpanded ? (
                            <td colSpan={100}>
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
                            </td>
                          ) : null
                        }
                      </tr>
                    </>
                  )
                })
            }
          </tbody>
        </table>
    </Modal>
  );

  const getHandoutsModal = (
    isOpen: boolean,
    onClose: () => void
  ): ReactNode => {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        portalElement={document.body}
      >
        <h2>Upload Handout</h2>
        <HandoutForm
          adventureId={id}
          updateFunction={addHandout}
        />
      </Modal>
    )
  };

  return (
    <>
      <CompendiumNavbar/>
      <Container>
        <p>
          <Link to={ADVENTURES_PATH}>
            Back to Adventures
          </Link>
        </p>
        {
          adventureContent
        }
      </Container>
      {getHandoutsModal(isHandoutModalOpen, () => {
        setIsHandoutModalOpen(false);
      })}
      {getItemsModal(markdownItems, isItemCompendiumModalOpen, () => {
        setNameSearchTerm('');
        setTagSearchTerm('');
        setCurrentMarkdownItemsExpanded([]);
        setIsItemCompendiumModalOpen(false);
      }, (id, itemId) => {
        addEquipmentItem({ id, itemId });
      })}
      {getItemsModal(markdownMagicItems, isMagicItemCompendiumModalOpen, () => {
        setNameSearchTerm('');
        setTagSearchTerm('');
        setCurrentMarkdownItemsExpanded([]);
        setIsMagicItemCompendiumModalOpen(false);
      }, (id, itemId) => {
        addMagicItem({ id, itemId });
      })}
      {getItemsModal(markdownCreatures, isCreatureCompendiumModalOpen, () => {
        setNameSearchTerm('');
        setTagSearchTerm('');
        setCurrentMarkdownItemsExpanded([]);
        setIsCreatureCompendiumModalOpen(false);
      }, (id, creatureId) => {
        addCreature({ id, creatureId });
      })}
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
