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
import {
  MarkdownEntity,
  MetaData
} from '@core/types';

import { useEffect } from 'react';
import { UseMutateFunction } from '@tanstack/react-query';

import { Markdown } from '../Markdown';

enum InputId {
  CONTENT = 'content',
  NAME = 'name',
}

enum InputType {
  TEXT = 'text',
  TEXTAREA = 'textarea'
}

export interface EditMarkdownEntityFormInputs {
  name: string;
  content: string;
}

const formModel = [
  {
    id: InputId.NAME,
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
    id: InputId.CONTENT,
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

export interface EditMarkdownEntityFormProps {
  item: MarkdownEntity;
  saveButtonText: string;
  updateFunction: UseMutateFunction<unknown, Error, {
    adventureid?: string;
    content: string;
    id: string;
    image: string;
    metadata: MetaData;
    name: string;
  }>;
  updateIsError?: boolean;
  updateIsErrorText: string;
}

export const EditMarkdownEntityForm = ({
  item,
  saveButtonText,
  updateFunction,
  updateIsError,
  updateIsErrorText
}: EditMarkdownEntityFormProps) => {
  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    watch
  } = useForm<EditMarkdownEntityFormInputs>({
    mode: 'all'
  });

  const {
    errors,
    isValid
  } = useFormState({ control });

  const watchContent = watch('content', '');

  const onSubmit: SubmitHandler<EditMarkdownEntityFormInputs> = data => {
    const {
      name,
      content,
    } = data;

    const payload = {
      content,
      id: item.id,
      image: item.image,
      metadata: item.metadata,
      name
    };

    /**
     * This should allow for handling of both markdown entities
     * attached to an adventure and compendium level items.
     */
    if (item.adventureid) {
      payload.adventureid = item.adventureid
    }

    updateFunction(payload);
  };

  useEffect(() => {
    const {
      name = '',
      content = '',
    } = item ?? {};

    setValue(InputId.NAME, name);
    setValue(InputId.CONTENT, content);
    trigger();
  }, [
    item,
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
                formModel[0],
                formModel[1]
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
              updateIsError ? (
                <p>
                  {updateIsErrorText}
                </p>
              ) : null
            }
            <Button
              buttonText={saveButtonText}
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
