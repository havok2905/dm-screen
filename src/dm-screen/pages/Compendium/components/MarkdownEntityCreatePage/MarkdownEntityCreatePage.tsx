import {
  Button,
  Container,
  Input
} from '@designSystem/components';
import {
  Controller,
  SubmitHandler,
  useForm, 
  useFormState
} from 'react-hook-form';

import {
  MetaData
} from '@core/types';

import { Link } from 'react-router-dom';
import { UseMutateFunction } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';

import { CompendiumNavbar } from '../../../../components';

export interface MarkdownEntityCreatePageProps {
  backToLinkPath: string;
  backToLinkString: string;
  createIsError: boolean;
  createIsErrorText: string;
  initialMetaData: MetaData[];
  saveButtonText: string;
  template: string;
  titleString: string;
  updateFunction: UseMutateFunction<unknown, Error, {
    adventureid?: string;
    content: string;
    id: string;
    image: string;
    metadata: MetaData[];
    name: string;
  }>;
}

export interface CreateMarkdownEntityFormInputs {
  name: string;
}

export const MarkdownEntityCreatePage = ({
  backToLinkPath,
  backToLinkString,
  createIsError,
  createIsErrorText,
  initialMetaData,
  saveButtonText,
  template,
  titleString,
  updateFunction
}: MarkdownEntityCreatePageProps) => {  
  const {
    control,
    handleSubmit
  } = useForm<CreateMarkdownEntityFormInputs>({
    mode: 'all'
  });

  const {
    errors,
    isValid
  } = useFormState({ control });

  const onSubmit: SubmitHandler<CreateMarkdownEntityFormInputs> = data => {
    const {
      name
    } = data;

    const payload = {
      content: template,
      id: uuidv4(),
      image: '',
      metadata: initialMetaData,
      name
    };

    updateFunction(payload);
  }

  return (
    <>
      <CompendiumNavbar/>
      <Container>
        <h2 data-test-id="markdown-entity-create-page-name">
          {titleString}
        </h2>
        <p data-test-id="markdown-entity-create-page-back-to-link">
          <Link to={backToLinkPath}>
            {backToLinkString}
          </Link>
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <Controller
              control={control}
              name="name"
              render={({ field }) => {
                const error: string = errors['name']?.message ?? '';

                return (
                  <Input
                    error={error}
                    full
                    inputId="name"
                    inputName="name"
                    label="Name"
                    required
                    {...field}
                  />
                )
              }}
              rules={{
                minLength: {
                  value: 3,
                  message: 'A name must be at least 3 characters.'
                },
                required: {
                  value: true,
                  message: 'A name is required'
                }
              }}
            />
          </fieldset>
          {
            createIsError ? (
              <p data-test-id="markdown-entity-create-page-error">
                {createIsErrorText}
              </p>
            ) : null
          }
          <Button
            buttonText={saveButtonText}
            disabled={!isValid}
          />
        </form>
      </Container>
    </>
  );
};
