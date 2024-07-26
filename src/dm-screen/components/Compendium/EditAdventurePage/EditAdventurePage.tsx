import {
  Button,
  CenteredContainer,
  Container,
  Grid,
  GridRow,
  Input,
  Item,
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
  useEffect
} from 'react';

import {
  ADVENTURE_PATH,
  ADVENTURES_PATH
} from '../../../routes';
import {
  useAdventure,
  useUpdateAdventure
} from '../../../hooks';

import { Markdown } from '../../Markdown';

interface EditAdventureFormInputs {
  adventureDescription: string;
  adventureName: string;
  adventureNotes: string;
  adventureSystem: string;
}

enum InputType {
  TEXT = 'text',
  TEXTAREA = 'textarea'
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
  },
  {
    id: InputId.ADVENTURE_NOTES,
    label: 'Notes',
    rules: {
      required: {
        value: true, 
        message: 'Adventure notes are required'
      }
    },
    type: InputType.TEXTAREA
  }
];

export const EditAdventurePage = () => {
  const { id: adventureId } = useParams();

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

  const { id } = data ?? {};

  return (
    <Container>
      <h1>Compendium</h1>
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
            <Item columns={6}>
              <fieldset>
                <Controller
                  control={control}
                  name={editAdventureFormModel[3].id as InputId}
                  render={({ field }) => {
                    const fieldModel = editAdventureFormModel[3];
                    const error: string = errors[fieldModel.id as InputId]?.message ?? '';

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
                        <>
                          <label>
                            {fieldModel.label}
                          </label>
                          <textarea
                            id={fieldModel.id}
                            {...field}
                          />
                          {
                            error ? (
                              <p>
                                {error}
                              </p>
                            ) : null
                          }
                        </>
                      );
                    }
                    
                    return <></>;
                  }}
                  rules={editAdventureFormModel[3].rules}
                />
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
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit(onSubmit);
                  }
                }}
              />
            </Item>
          </GridRow>
        </Grid>
      </form>
    </Container>
  );
};
