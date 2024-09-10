import {
  Button,
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
} from "react-hook-form";
import {
  MarkdownEntity,
  MetaData
} from '@core/types';
import {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';

import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { UseMutateFunction } from '@tanstack/react-query';

import { Markdown } from '../../../../components/Markdown';
import { MetaDataForm } from '../../../../components/MetaDataForm';

enum InputId {
  CONTENT = 'content',
  NAME = 'name',
}

enum InputType {
  TEXT = 'text'
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
  }
];

export interface MarkdownEntityEditPageProps {
  item: MarkdownEntity;
  saveButtonText: string;
  updateFunction: UseMutateFunction<unknown, Error, {
    adventureid?: string;
    content: string;
    id: string;
    image: string;
    metadata: MetaData[];
    name: string;
  }>;
  updateIsError?: boolean;
  updateIsErrorText: string;
}

export const MarkdownEntityEditPage = ({
  item,
  saveButtonText,
  updateFunction,
  updateIsError,
  updateIsErrorText
}: MarkdownEntityEditPageProps) => {
  const monacoInstance = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [monacoElement, setMonacoElement] = useState<HTMLDivElement | null>(null);
  const [metaDataModel, setMetaDataModel] = useState<MetaData[]>([]);

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
      item
    ) {
      const editor = monaco.editor.create(monacoElement, {
        value: item?.content || '',
        language: 'markdown',
        theme: 'vs-dark'
      });

      editor.getModel()?.onDidChangeContent(() => {
        const value = editor.getValue();
        setValue(InputId.CONTENT, value);
      });

      monacoInstance.current = editor;

      setValue(InputId.CONTENT, item.content ?? '');
    }

    return () => {
      monacoInstance.current?.dispose();
      monacoInstance.current = null;
    };
  }, [
    item,
    monacoElement,
    setValue
  ]);

  const onSubmit: SubmitHandler<EditMarkdownEntityFormInputs> = data => {
    const {
      name,
      content,
    } = data;

    const payload = {
      content,
      id: item.id,
      image: item.image ?? '',
      metadata: metaDataModel,
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

  const onChange = useCallback((m: MetaData[]) => {
    setMetaDataModel(m);
  }, []);

  useEffect(() => {
    const {
      name = '',
      content = '',
      metadata
    } = item ?? {};

    setMetaDataModel(metadata);
    setValue(InputId.NAME, name);
    setValue(InputId.CONTENT, content);
    trigger();
  }, [
    item,
    setValue,
    trigger
  ]);

  const fieldModel = formModel[0];

  const error: string = errors[fieldModel.id as InputId]?.message ?? '';

  return (
    <Grid>
      <GridRow>
        <Item columns={6}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
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
            <fieldset>
              <Label
                inputId="metadata"
                label="MetaData"
              />
              <MetaDataForm
                initialMetaData={item?.metadata ?? []}
                onChange={onChange}
              />
            </fieldset>
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
