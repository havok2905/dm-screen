import {
  Button,
  Container,
  Grid,
  GridRow,
  Input,
  Item,
  Label
} from '@designSystem/components';
import {
  Controller,
  SubmitHandler,
  useForm, 
  useFormState
} from 'react-hook-form';
import {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';

import {
  MetaData
} from '@core/types';

import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { Link } from 'react-router-dom';
import { UseMutateFunction } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';

import {
  CompendiumNavbar,
  Markdown
} from '../../../../components';

import {
  MetaDataForm
} from '../../../../components/MetaDataForm';

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
  content: string;
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
  const monacoInstance = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoElement = useRef(null);

  const [metaDataModel, setMetaDataModel] = useState<MetaData[]>(
    initialMetaData
  );

  const {
    control,
    handleSubmit,
    setValue,
    watch
  } = useForm<CreateMarkdownEntityFormInputs>({
    mode: 'all'
  });

  const {
    errors,
    isValid
  } = useFormState({ control });

  const watchContent = watch('content', '');

  const onSubmit: SubmitHandler<CreateMarkdownEntityFormInputs> = data => {
    const {
      content,
      name
    } = data;

    const payload = {
      content,
      id: uuidv4(),
      image: '',
      metadata: metaDataModel,
      name
    };

    updateFunction(payload);
  }

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
      monacoElement.current
    ) {
      const editor = monaco.editor.create(monacoElement.current, {
        value: template,
        language: 'markdown',
        theme: 'vs-dark'
      });

      editor.getModel()?.onDidChangeContent(() => {
        const value = editor.getValue();
        setValue('content', value);
      });

      monacoInstance.current = editor;

      setValue('content', template);
    }

    return () => {
      monacoInstance.current?.dispose();
      monacoInstance.current = null;
    };
  }, [
    setValue,
    template
  ]);

  const onChange = useCallback((m: MetaData[]) => {
    setMetaDataModel(m);
  }, []);

  return (
    <>
      <CompendiumNavbar/>
      <Container>
        <h2>
          {titleString}
        </h2>
        <p>
          <Link to={backToLinkPath}>
            {backToLinkString}
          </Link>
        </p>
        <Grid>
          <GridRow>
            <Item columns={6}>
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
                <fieldset>
                  <Label
                    inputId="metadata"
                    label="MetaData"
                  />
                  <MetaDataForm
                    initialMetaData={metaDataModel}
                    onChange={onChange}
                  />
                </fieldset>
                <fieldset>
                  <Label
                    inputId="content"
                    label="Content"
                  />
                  <div
                    ref={monacoElement}
                    style={{
                      height: '500px',
                      width: '100%',

                    }}>
                  </div>
                </fieldset>
                {
                  createIsError ? (
                    <p>
                      {createIsErrorText}
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
      </Container>
    </>
  );
};
