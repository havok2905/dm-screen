import {
  Button,
  CenteredContainer,
  Container,
  Grid,
  GridRow,
  Input,
  Item,
  Label,
  LinkButton,
  Modal,
  Spinner,
  Table
} from '@designSystem/components';
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState
} from "react-hook-form";
import {
  Handout,
  MarkdownEntity
} from '@core/types';
import {
  Link,
  useNavigate,
  useParams
} from 'react-router-dom';
import {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';

import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

import {
  ADVENTURE_PATH,
  ADVENTURES_PATH,
  EDIT_ADVENTURE_CREATURE_PATH,
  EDIT_ADVENTURE_ITEM_PATH
} from '../../../routes';
import {
  CompendiumNavbar,
  ConfirmationModal,
  HandoutForm,
  ImageForm,
  Markdown
} from '../../../components';
import {
  useAddCreature,
  useAddEquipmentItem,
  useAddHandout,
  useAddImage,
  useAddMagicItem,
  useAdventure,
  useCreatures,
  useDestroyAdventureCreature,
  useDestroyAdventureHandout,
  useDestroyAdventureItem,
  useEquipmentItems,
  useMagicItems,
  useRemoveImage,
  useUpdateAdventure
} from '../../../hooks';

interface EditAdventureFormInputs {
  adventureDescription: string;
  adventureName: string;
  adventureNotes: string;
  adventureSystem: string;
}

enum InputType {
  TEXT = 'text'
}

enum InputId {
  ADVENTURE_DESCRIPTION = 'adventureDescription',
  ADVENTURE_NAME = 'adventureName',
  ADVENTURE_NOTES = 'adventureNotes',
  ADVENTURE_SYSTEM = 'adventureSystem'
}

const editAdventureFormModel = [
  {
    id: InputId.ADVENTURE_NAME,
    label: 'Name',
    rules: {
      minLength: {
        value: 3,
        message: 'A name must be at least 3 characters.'
      },
      required: {
        value: true,
        message: 'A name is required'
      }
    },
    type: InputType.TEXT
  },
  {
    id: InputId.ADVENTURE_DESCRIPTION,
    label: 'Description',
    rules: {
      minLength: {
        value: 3,
        message: 'A description must be at least 3 characters.'
      },
      required: {
        value: true,
        message: 'A description is required'
      }
    },
    type: InputType.TEXT,
  },
  {
    id: InputId.ADVENTURE_SYSTEM,
    label: 'System',
    rules: {
      minLength: {
        value: 3,
        message: 'A system must be at least 3 characters.'
      },
      required: {
        value: true, 
        message: 'A system is required'
      }
    },
    type: InputType.TEXT
  }
];

export const EditAdventurePage = () => {
  const { id: adventureId } = useParams();

  const monacoInstance = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [monacoElement, setMonacoElement] = useState<HTMLDivElement | null>(null);
  const [isAdventureCreatureConfirmModalOpen, setIsAdventureCreatureConfirmModalOpen] = useState<boolean>(false);
  const [isAdventureHandoutConfirmModalOpen, setIsAdventureHandoutConfirmModalOpen] = useState<boolean>(false);
  const [isAdventureItemConfirmModalOpen, setIsAdventureItemConfirmModalOpen] = useState<boolean>(false);
  const [isCreatureCompendiumModalOpen, setIsCreatureCompendiumModalOpen] = useState<boolean>(false);
  const [isHandoutModalOpen, setIsHandoutModalOpen] = useState<boolean>(false);
  const [isSplashImageModalOpen, setIsSplashImageModalOpen] = useState<boolean>(false);
  const [isItemCompendiumModalOpen, setIsItemCompendiumModalOpen] = useState<boolean>(false);
  const [isMagicItemCompendiumModalOpen, setIsMagicItemCompendiumModalOpen] = useState<boolean>(false);
  const [nameSearchTerm, setNameSearchTerm] = useState<string>('');
  const [tagSearchTerm, setTagSearchTerm] = useState<string>('');
  const [currentCreaturesExpanded, setCurrentCreaturesExpanded] = useState<string[]>([]); 
  const [currentItemsExpanded, setCurrentItemsExpanded] = useState<string[]>([]);
  const [currentMarkdownItemsExpanded, setCurrentMarkdownItemsExpanded] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    watch
  } = useForm<EditAdventureFormInputs>({
    mode: 'all'
  });

  const {
    errors,
    isValid
  } = useFormState({ control });

  const watchNotes = watch('adventureNotes', '');

  const {
    data,
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

  const navigate = useNavigate();

  /**
   * When we have an element to inject an editor into, create a
   * new instance of monaco editor and pass the element along to
   * it to inject itself into.
   * 
   * The editor doesn't fire an onchange event when it renders,
   * so, if we don't have content already set to the form, we want
   * to bootstrap the form value with the template value on render
   * to match what is initially passed to monaco.
   */
  useEffect(() => {
    if (
      !monacoInstance.current &&
      monacoElement &&
      data
    ) {
      const editor = monaco.editor.create(monacoElement, {
        value: data?.notes || '',
        language: 'markdown',
        theme: 'vs-dark'
      });

      editor.getModel()?.onDidChangeContent(() => {
        const value = editor.getValue();
        setValue(InputId.ADVENTURE_NOTES, value);
      });

      monacoInstance.current = editor;

      setValue(InputId.ADVENTURE_NOTES, data.notes ?? '');
    }

    return () => {
      monacoInstance.current?.dispose();
      monacoInstance.current = null;
    };
  }, [
    data,
    monacoElement,
    setValue
  ]);

  const onSuccess = useCallback(() => {
    refetch();
  }, [
    refetch
  ]);

  const onUpdateAdventureSuccess = useCallback(() => {
    navigate(ADVENTURE_PATH.replace(':id', adventureId ?? ''));
  }, [
    adventureId,
    navigate
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

  const onAddSplashImageSuccess = useCallback(() => {
    refetch();
    setIsSplashImageModalOpen(false);
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
    mutate: destroyAdventureHandout
  } = useDestroyAdventureHandout(onSuccess);

  const {
    mutate: destroyAdventureItem
  } = useDestroyAdventureItem(onSuccess);

  const {
    isError: addHandoutIsError,
    mutate: addHandout
  } = useAddHandout(onAddHandoutSuccess);

  const {
    mutate: addImage,
    isError: addImageIsError
  } = useAddImage(onAddSplashImageSuccess);

  const {
    mutate: removeImage,
    isError: removeImageIsError
  } = useRemoveImage(onSuccess);

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

  const onAdventureHandoutCancel = useCallback(() => {
    setIsAdventureHandoutConfirmModalOpen(false);
    setActiveId('');
  }, []);

  const onAdventureHandoutOk = useCallback(() => {
    destroyAdventureHandout(activeId);
    setIsAdventureHandoutConfirmModalOpen(false);
    setActiveId('');
  }, [
    activeId,
    destroyAdventureHandout
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

  const {
    mutate: updateAdventure,
    isError: updateAdventureIsError
  } = useUpdateAdventure(onUpdateAdventureSuccess);

  const onSubmit: SubmitHandler<EditAdventureFormInputs> = data => {
    const {
      adventureName,
      adventureNotes,
      adventureDescription,
      adventureSystem
    } = data;

    const payload = {
      description: adventureDescription,
      id,
      name: adventureName,
      notes: adventureNotes,
      system: adventureSystem
    };

    updateAdventure(payload);
  };

  useEffect(() => {
    const {
      description = '',
      name = '',
      notes = '',
      system = ''
    } = data ?? {};

    setValue(InputId.ADVENTURE_NAME, name);
    setValue(InputId.ADVENTURE_NOTES, notes);
    setValue(InputId.ADVENTURE_DESCRIPTION, description);
    setValue(InputId.ADVENTURE_SYSTEM, system);
    trigger();
  }, [
    data,
    setValue,
    trigger
  ]);

  if (
    isLoading ||
    isPending ||
    itemsIsLoading ||
    itemsIsPending ||
    magicItemsIsLoading ||
    magicItemsIsPending ||
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
    splashImgSrc
  } = data ?? {};

  const markdownCreatures = creaturesData as MarkdownEntity[];

  const markdownItems = itemsData as MarkdownEntity[];

  const markdownMagicItems = magicItemsData as MarkdownEntity[];


  const onRemoveImageClick = () => {
    removeImage({
      id,
      entityType: 'adventure-splash-image'
    });
  };

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

  const creatureColumns = [
    { name: 'Id' },
    { name: 'Name'}
  ];

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
          uploadIsError={addHandoutIsError}
        />
      </Modal>
    );
  };

  const getSplashImageModal = (
    isOpen: boolean,
    onClose: () => void
  ) => {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        portalElement={document.body}
      >
        <h2>Upload Splash Image</h2>
        <ImageForm
          entityId={id}
          entityType="adventure-splash-image"
          updateFunction={addImage}
          uploadIsError={addImageIsError}
        />
      </Modal>
    );
  };

  return (
    <>
      <CompendiumNavbar/>
      <Container>
        <h2>Edit Adventure</h2>
        <p>
          <strong>Id:</strong> {id}
        </p>
        <p>
          <Link to={ADVENTURES_PATH}>
            Back to Adventures
          </Link>
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid>
            <GridRow>
            <Item columns={12}> 
                {
                  [
                    editAdventureFormModel[0],
                    editAdventureFormModel[1],
                    editAdventureFormModel[2],
                  ].map((fieldModel, index) => {
                    const error: string = errors[fieldModel.id as InputId]?.message ?? '';

                    return (
                      <fieldset key={index}>
                        <Controller
                          control={control}
                          name={fieldModel.id as InputId}
                          render={({ field }) => {
                            if (fieldModel.type === 'text') {
                              return (
                                <Input
                                  error={error}
                                  full
                                  inputId={fieldModel.id}
                                  inputName={fieldModel.id}
                                  label={fieldModel.label}
                                  required
                                  {...field}
                                />
                              );
                            }
                            
                            if (fieldModel.type === 'textarea') {
                              return (
                                <textarea
                                  id={fieldModel.id}
                                  {...field}
                                />
                              );
                            }
                            
                            return <></>;
                          }}
                          rules={fieldModel.rules}
                        />
                      </fieldset>
                    )
                  })
                }
              </Item>
            </GridRow>
            <GridRow>
              <Item columns={6}>
                <fieldset>
                  <Label
                    inputId="notes"
                    label="Notes"
                  />
                  <div
                    ref={el => setMonacoElement(el) }
                    style={{
                      height: '500px',
                      width: '100%'
                    }}>
                  </div>
                </fieldset>
              </Item>
              <Item columns={6}>
                <Markdown content={watchNotes ?? ''}/>
              </Item>
            </GridRow>
            <GridRow>
              <Item columns={12}>
                {
                  updateAdventureIsError ? (
                    <p>
                      There was a problem updating this adventure
                    </p>
                  ) : null
                }
                <Button
                  buttonText="Save adventure"
                  disabled={!isValid}
                />
              </Item>
            </GridRow>
          </Grid>
        </form>
        <Grid>
          <GridRow>
            <Item columns={12}>
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
              <div className="adventure-page-buttons">
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
              </div>
              <Table
                columns={itemColumns}
                rows={itemRows}
              />
            </Item>
          </GridRow>
        </Grid>
        <Grid>
          <GridRow>
            <Item columns={12}>
               <h3>
                  Splash Image
                </h3>
                <fieldset>
                  <Button
                    buttonText="Add splash image"
                    onClick={() => {
                      setIsSplashImageModalOpen(true);
                    }}
                  />
                </fieldset>
                {
                  splashImgSrc ? (
                    <fieldset>
                      <Button
                        buttonText="Remove image"
                        onClick={onRemoveImageClick}
                      />
                    </fieldset>
                  ) : null
                }
                {
                  removeImageIsError ? (
                    <p>
                      There was a problem removing this image.
                    </p>
                  ) : null
                }
                {
                  splashImgSrc ? (
                    <img
                      src={splashImgSrc}
                      style={{
                        maxWidth: '100%'
                      }}
                    />
                  ) : null
                }
                <h3>
                  Handouts
                </h3>
                <fieldset>
                  <Button
                    buttonText="Add handout"
                    onClick={() => {
                      setIsHandoutModalOpen(true);
                    }}
                  />
                </fieldset>
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
                        <p>
                          {description}
                        </p>
                        <fieldset>
                          <Button
                            buttonText="Copy image path"
                            onClick={() => {
                              navigator.clipboard.writeText(url);
                              alert(`Copied ${url} to clipboard`);
                            }}
                          />
                        </fieldset>
                        <fieldset>
                          <LinkButton
                            buttonText="Remove handout"
                            color="red"
                            onClick={() => {
                              setIsAdventureHandoutConfirmModalOpen(true);
                              setActiveId(id);
                            }}
                          />
                        </fieldset>
                        <img 
                          alt={description}
                          className="adventure-page-handout-image"
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
          </GridRow>
        </Grid>
      </Container>
      {getHandoutsModal(isHandoutModalOpen, () => {
        setIsHandoutModalOpen(false);
      })}
      {getSplashImageModal(isSplashImageModalOpen, () => {
        setIsSplashImageModalOpen(false);
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
      <ConfirmationModal
        isOpen={isAdventureHandoutConfirmModalOpen}
        message="Are you sure you would like to destroy this handout and remove it from the adventure?"
        onCancel={onAdventureHandoutCancel}
        onOk={onAdventureHandoutOk}
      />
    </>
  );
};
