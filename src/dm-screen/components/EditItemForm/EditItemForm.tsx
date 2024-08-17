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
  ADVENTURE_ITEM_CONTENT = 'adventureItemContent',
  ADVENTURE_ITEM_NAME = 'adventureItemName',
}

enum InputType {
  TEXT = 'text',
  TEXTAREA = 'textarea'
}

export interface EditAdventureItemFormInputs {
  adventureItemName: string;
  adventureItemContent: string;
}

const editAdventureItemFormModel = [
  {
    id: InputId.ADVENTURE_ITEM_NAME,
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
    id: InputId.ADVENTURE_ITEM_CONTENT,
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

export interface EditItemFormProps {
  adventureItem: any;
  updateAdventureItem: UseMutateFunction<any, Error, {
    adventureid: string;
    content: string;
    id: string;
    image: string;
    metadata: MetaData;
    name: string;
  }>;
  updateAdventureItemIsError?: boolean;
}

export const EditItemForm = ({
  adventureItem,
  updateAdventureItem,
  updateAdventureItemIsError
}: EditItemFormProps) => {
  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    watch
  } = useForm<EditAdventureItemFormInputs>({
    mode: 'all'
  });

  const {
    errors,
    isValid
  } = useFormState({ control });

  const watchContent = watch('adventureItemContent', '');

  const onSubmit: SubmitHandler<EditAdventureItemFormInputs> = data => {
    const {
      adventureItemName,
      adventureItemContent,
    } = data;

    const payload = {
      adventureid: adventureItem.adventureid,
      content: adventureItemContent,
      id: adventureItem.id,
      image: adventureItem.image,
      metadata: adventureItem.metadata,
      name: adventureItemName,
    };

    updateAdventureItem(payload);
  };

  useEffect(() => {
    const {
      name = '',
      content = '',
    } = adventureItem ?? {};

    setValue(InputId.ADVENTURE_ITEM_NAME, name);
    setValue(InputId.ADVENTURE_ITEM_CONTENT, content);
    trigger();
  }, [
    adventureItem,
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
                editAdventureItemFormModel[0],
                editAdventureItemFormModel[1]
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
              updateAdventureItemIsError ? (
                <p>
                  There was a problem updating this adventure item
                </p>
              ) : null
            }
            <Button
              buttonText="Save adventure item"
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
