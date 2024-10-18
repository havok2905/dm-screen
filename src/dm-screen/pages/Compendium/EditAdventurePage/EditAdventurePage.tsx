import {
  Button,
  CenteredContainer,
  Container,
  Grid,
  GridRow,
  Input,
  Item,
  Label,
  Spinner
} from '@designSystem/components';
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState
} from "react-hook-form";
import {
  Link,
  useNavigate,
  useParams
} from 'react-router-dom';
import {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';

import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

import {
  ADVENTURE_PATH,
  ADVENTURES_PATH
} from '../../../routes';
import {
  CompendiumNavbar,
  Markdown
} from '../../../components';
import {
  useAdventure,
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
    isFetching,
    isLoading,
    isPending
  } = useAdventure(adventureId ?? '');

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
    navigate(ADVENTURE_PATH.replace(':id', adventureId ?? ''));
  }, [
    adventureId,
    navigate
  ]);

  const {
    mutate: updateAdventure,
    isError: updateAdventureIsError
  } = useUpdateAdventure(onSuccess);

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
    isFetching ||
    isLoading ||
    isPending
  ) return (
    <CenteredContainer>
      <Spinner/>
    </CenteredContainer>
  );

  const {
    id,
    handouts
  } = data ?? {};

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
              <Item columns={6}> 
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
              <Item columns={12}>
                {
                  handouts.map((handout, index) => {
                    const onClick = () => {
                      navigator.clipboard.writeText(handout.url);
                      alert(`Copied ${handout.url} to clipboard`);
                    };

                    return (
                      <img
                        alt={handout.description}
                        key={index}
                        onClick={onClick}
                        src={handout.url}
                        style={{
                          cursor: 'pointer',
                          maxWidth: '200px'
                        }}
                      />
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
                  onClick={handleSubmit(onSubmit)}
                />
              </Item>
            </GridRow>
          </Grid>
        </form>
      </Container>
    </>
  );
};
