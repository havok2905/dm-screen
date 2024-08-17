import {
  Button,
  Grid,
  GridRow,
  Input,
  Item,
  TextArea
} from '@designSystem/components';
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState
} from "react-hook-form";

import { MetaData } from '@core/types';
import { useEffect } from 'react';
import { UseMutateFunction } from '@tanstack/react-query';

import { Markdown } from '../Markdown';

enum InputId {
  ADVENTURE_CREATURE_CONTENT = 'adventureCreatureContent',
  ADVENTURE_CREATURE_NAME = 'adventureCreatureName',
}

enum InputType {
  TEXT = 'text',
  TEXTAREA = 'textarea'
}

export interface EditAdventureCreatureFormInputs {
  adventureCreatureName: string;
  adventureCreatureContent: string;
}

const editAdventureCreatureFormModel = [
  {
    id: InputId.ADVENTURE_CREATURE_NAME,
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
    id: InputId.ADVENTURE_CREATURE_CONTENT,
    label: 'Content',
    rules: {
      required: {
        value: true, 
        message: 'Adventure content are required'
      }
    },
    type: InputType.TEXTAREA
  }
];

export interface EditCreatureFormProps {
  adventureCreature: any;
  updateAdventureCreature: UseMutateFunction<any, Error, {
    adventureid: string;
    content: string;
    id: string;
    image: string;
    metadata: MetaData;
    name: string;
  }>;
  updateAdventureCreatureIsError?: boolean;
}

export const EditCreatureForm = ({
  adventureCreature,
  updateAdventureCreature,
  updateAdventureCreatureIsError
}: EditCreatureFormProps) => {
  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    watch
  } = useForm<EditAdventureCreatureFormInputs>({
    mode: 'all'
  });

  const {
    errors,
    isValid
  } = useFormState({ control });

  const watchContent = watch('adventureCreatureContent', '');

  const onSubmit: SubmitHandler<EditAdventureCreatureFormInputs> = data => {
    const {
      adventureCreatureName,
      adventureCreatureContent,
    } = data;

    const payload = {
      adventureid: adventureCreature.adventureid,
      content: adventureCreatureContent,
      id: adventureCreature.id,
      image: adventureCreature.image,
      metadata: adventureCreature.metadata,
      name: adventureCreatureName,
    };

    updateAdventureCreature(payload);
  };

  useEffect(() => {
    const {
      name = '',
      content = '',
    } = adventureCreature ?? {};

    setValue(InputId.ADVENTURE_CREATURE_NAME, name);
    setValue(InputId.ADVENTURE_CREATURE_CONTENT, content);
    trigger();
  }, [
    adventureCreature,
    setValue,
    trigger
  ]);

  return (
    <Grid>
      <GridRow>
        <Item columns={6}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {
              [
                editAdventureCreatureFormModel[0],
                editAdventureCreatureFormModel[1]
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
                            <div>
                              <TextArea
                                error={error}
                                full
                                inputId={fieldModel.id}
                                inputName={fieldModel.id}
                                label={fieldModel.label}
                                {...field}
                              />
                            </div>
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
            {
              updateAdventureCreatureIsError ? (
                <p>
                  There was a problem updating this adventure creature
                </p>
              ) : null
            }
            <Button
              buttonText="Save adventure creature"
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
        <Item columns={6}>
          <Markdown content={watchContent}/>
        </Item>
      </GridRow>
    </Grid>
  );
};
