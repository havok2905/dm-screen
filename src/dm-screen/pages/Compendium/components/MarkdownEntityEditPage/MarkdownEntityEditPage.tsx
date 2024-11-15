import {
  Button,
  Grid,
  GridRow,
  Input,
  Item,
  Label,
  Modal
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
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';

import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { UseMutateFunction } from '@tanstack/react-query';

import { 
  ImageForm,
  Markdown,
  MetaDataForm
} from '../../../../components';
import {
  useAddImage,
  useRemoveImage
} from '../../../../hooks';

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
  entityType:
    'adventure-creature' |
    'adventure-item' |
    'creature' |
    'magic-item' |
    'equipment-item' |
    'spell';
  item: MarkdownEntity;
  refetch: () => void;
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
  entityType,
  item,
  refetch,
  saveButtonText,
  updateFunction,
  updateIsError,
  updateIsErrorText
}: MarkdownEntityEditPageProps) => {
  const monacoInstance = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [monacoElement, setMonacoElement] = useState<HTMLDivElement | null>(null);
  const [metaDataModel, setMetaDataModel] = useState<MetaData[]>([]);
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);

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

  const onSuccess = useCallback(() => {
    refetch();
    setIsImageModalOpen(false);
  }, [
    refetch
  ]);

  const {
    isError: addImageIsError,
    mutate: addImage
  } = useAddImage(onSuccess);

  const {
    isError: removeImageIsError,
    mutate: removeImage
  } = useRemoveImage(onSuccess);

  const onRemoveImageClick = useCallback(() => {
    if (item) {
      removeImage({
        id: item.id,
        entityType
      });
    }
  }, [
    entityType,
    item,
    removeImage
  ]);

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

  const getImageModal = (
    isOpen: boolean,
    onClose: () => void
  ): ReactNode => {
    const {
      id = ''
    } = item ?? {};

    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        portalElement={document.body}
      >
        <h2>Upload Image</h2>
        <ImageForm
          entityId={id}
          entityType={entityType}
          updateFunction={addImage}
          uploadIsError={addImageIsError}
        />
      </Modal>
    )
  };

  const fieldModel = formModel[0];

  const error: string = errors[fieldModel.id as InputId]?.message ?? '';

  const {
    image,
    name
  } = item;

  return (
    <Grid>
      <GridRow>
        <Item columns={12}>
          <fieldset>
            <Button
              buttonText="Add image"
              onClick={() => {
                setIsImageModalOpen(true);
              }}
            />
          </fieldset>
          {
            image ? (
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
            image ? (
              <img alt={name} src={image}/>
            ) : null
          }
        </Item>
      </GridRow>
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
                <p data-test-id="markdown-entity-edit-page-error">
                  {updateIsErrorText}
                </p>
              ) : null
            }
            <Button
              buttonText={saveButtonText}
              disabled={!isValid}
            />
          </form>
        </Item>
        <Item columns={6}>
          <Markdown content={watchContent}/>
        </Item>
      </GridRow>
      {getImageModal(isImageModalOpen, () => {
        setIsImageModalOpen(false);
      })}
    </Grid>
  );
};
