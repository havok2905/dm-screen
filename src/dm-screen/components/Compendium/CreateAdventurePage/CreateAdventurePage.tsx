import {
  Button,
  Container,
  Grid,
  GridRow,
  Input,
  Item
} from '@designSystem/components';
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState
} from "react-hook-form";
import {
  Link,
  useNavigate
} from 'react-router-dom';

import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ADVENTURES_PATH } from '../../../routes';
import { useCreateAdventure } from '../../../hooks';


interface CreateAdventureFormInputs {
  adventureDescription: string;
  adventureName: string;
  adventureSystem: string;
}

type InputId =
  'adventureDescription' |
  'adventureName' |
  'adventureSystem';

const createAdventureFormModel = [
  {
    id: 'adventureName',
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
    }
  },
  {
    id: 'adventureDescription',
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
    }
  },
  {
    id: 'adventureSystem',
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
    }
  }
];

export const CreateAdventurePage = () => {
  const {
    control,
    handleSubmit
  } = useForm<CreateAdventureFormInputs>({
    mode: 'all'
  });

  const {
    errors,
    isValid
  } = useFormState({ control });

  const navigate = useNavigate();

  const onSuccess = useCallback(() => {
    navigate(ADVENTURES_PATH);
  }, [navigate]);

  const {
    mutate: createAdventure,
    isError: createAdventureIsError
  } = useCreateAdventure(onSuccess);

  const onSubmit: SubmitHandler<CreateAdventureFormInputs> = data => {
    const {
      adventureName,
      adventureDescription,
      adventureSystem
    } = data;

    const payload = {
      description: adventureDescription,
      id: uuidv4(),
      name: adventureName,
      system: adventureSystem
    };

    createAdventure(payload);
  };

  return(
    <Container>
      <h1>Compendium</h1>
      <h2>Create New Adventure</h2>
      <p>
        <Link to={ADVENTURES_PATH}>
          Back to Adventures
        </Link>
      </p>
      <Grid>
        <GridRow>
          <Item columns={6}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {
                createAdventureFormModel.map((fieldModel, index) => {
                  const error: string = errors[fieldModel.id as InputId]?.message ?? '';

                  return (
                    <fieldset key={index}>
                      <Controller
                        control={control}
                        name={fieldModel.id as InputId}
                        render={({ field }) => {
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
                        }}
                        rules={fieldModel.rules}
                      />
                    </fieldset>
                  )
                })
              }
              {
                createAdventureIsError ? (
                  <p>
                    There was a problem creating this adventure
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
            </form>
          </Item>
        </GridRow>
      </Grid>
    </Container>
  );
};
