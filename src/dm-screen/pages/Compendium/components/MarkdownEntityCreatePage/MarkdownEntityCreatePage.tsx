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
  ChangeEventHandler,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState
} from 'react';
import {
  Controller,
  SubmitHandler,
  useForm, 
  useFormState
} from 'react-hook-form';
import {
  MetaData,
  MetaDataType,
  MetaDataValue
} from '@core/types';

import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { Link } from 'react-router-dom';

// import { UseMutateFunction } from '@tanstack/react-query';

import {
  CompendiumNavbar,
  Markdown
} from '../../../../components';

export interface MarkdownEntityCreatePageProps {
  backToLinkPath: string;
  backToLinkString: string;
  createIsError: boolean;
  createIsErrorText: string;
  saveButtonText: string;
  template: string;
  titleString: string;
  /*updateFunction: UseMutateFunction<unknown, Error, {
    adventureid?: string;
    content: string;
    id: string;
    image: string;
    metadata: MetaData;
    name: string;
  }>;*/
}

export interface CreateMarkdownEntityFormInputs {
  name: string;
  content: string;
}

enum ReducerActionType {
  UPDATE_NAME = 'update-name',
  UPDATE_TYPE = 'update-type',
  UPDATE_VALUE = 'update-value'
}

interface ReducerUpdateNameAction {
  payload: {
    metaDataName: string;
  };
  type: ReducerActionType.UPDATE_NAME;
}

interface ReducerUpdateTypeAction {
  payload: {
    metaDataType: MetaDataType;
  };
  type: ReducerActionType.UPDATE_TYPE;
}

interface ReducerUpdateValueAction {
  payload: {
    metaDataValue: MetaDataValue;
  };
  type: ReducerActionType.UPDATE_VALUE;
}

type ReducerAction = ReducerUpdateNameAction | ReducerUpdateTypeAction | ReducerUpdateValueAction;

interface ReducerState {
  metaDataName: string;
  metaDataType: MetaDataType,
  metaDataValue: MetaDataValue;
}

const reducer = (state: ReducerState, action: ReducerAction) => {
  if (action.type === ReducerActionType.UPDATE_NAME) {
    const metaDataName = action.payload.metaDataName;

    return {
      ...state,
      metaDataName
    };
  }

  if (action.type === ReducerActionType.UPDATE_TYPE) {
    const metaDataType = action.payload.metaDataType;
    let metaDataValue: MetaDataValue;

    if (metaDataType === 'boolean') {
      metaDataValue = false;
    }

    if (metaDataType === 'number') {
      metaDataValue = 0;
    }

    if (metaDataType === 'string') {
      metaDataValue = '';
    }

    return {
      ...state,
      metaDataType,
      metaDataValue: metaDataValue!
    };
  }

  if (action.type === ReducerActionType.UPDATE_VALUE) {
    const metaDataValue = action.payload.metaDataValue;

    return {
      ...state,
      metaDataValue
    };
  }

  throw Error('Unknown action.');
}

interface MetaDataFieldProps {
  initialName: string;
  initialType: MetaDataType;
  initialValue: MetaDataValue;
  onChange: (m: MetaData) => void;
}

const MetaDataField = ({
  initialName,
  initialType,
  initialValue,
  onChange
}: MetaDataFieldProps) => {
  const [state, dispatch] = useReducer(reducer, {
    metaDataName: initialName,
    metaDataType: initialType,
    metaDataValue: initialValue
  });

  const {
    metaDataName,
    metaDataType,
    metaDataValue
  } = state;

  const handleMetaDataNameChange: ChangeEventHandler<HTMLInputElement>= useCallback((event) => {
    dispatch({
      type: ReducerActionType.UPDATE_NAME,
      payload: {
        metaDataName: event.target.value
      }
    });
  }, []);

  const handleMetaDataTypeChange: ChangeEventHandler<HTMLSelectElement> = useCallback((event) => {
    dispatch({
      type: ReducerActionType.UPDATE_TYPE,
      payload: {
        metaDataType: event.target.value as MetaDataType
      }
    });
  }, []);

  const handleMetaDataValueChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    const type = event.target.type;
    let value: MetaDataValue;

    switch(type) {
      case 'checkbox':
        value = event.target.checked;
        break;
      case 'number':
        value = Number(event.target.value);
        break;
      case 'text':
        value = event.target.value;
        break;
      default:
        break;
    }

    dispatch({
      type: ReducerActionType.UPDATE_VALUE,
      payload: {
        metaDataValue: value!
      }
    });
  }, []);

  const internalOnChange = useCallback(() => {
    const metadata: MetaData = {
      name: metaDataName,
      type: metaDataType,
      value: metaDataValue
    };

    onChange(metadata);
  }, [
    metaDataName,
    metaDataType,
    metaDataValue,
    onChange
  ]);

  useEffect(() => {
    internalOnChange();
  }, [
    internalOnChange
  ]);

  const getValueField = () => {
    if (metaDataType === 'boolean') {
      return (
        <input
          checked={metaDataValue as boolean}
          onChange={handleMetaDataValueChange}
          type="checkbox"/>
      );
    }

    if (metaDataType === 'number') {
      return (
        <input  
          onChange={handleMetaDataValueChange}
          type="number"
          value={metaDataValue as number}/>
      );
    }

    if (metaDataType === 'string') {
      return (
        <input
          onChange={handleMetaDataValueChange}
          type="text"
          value={metaDataValue as string}/>
      );
    }
  };

  return (
    <div>
      <input
        onChange={handleMetaDataNameChange}
        type="text"
        value={metaDataName}/>
      <select
        onChange={handleMetaDataTypeChange}
        value={metaDataType}>
        <option value="boolean">
          Boolean
        </option>
        <option value="number">
          Number
        </option>
        <option value="string">
          String
        </option>
      </select>
      {getValueField()}
    </div>
  )
};

interface MetaDataCollectionFormProps {
  metaDataModel: MetaData[];
  onChange: (m: MetaData[]) => void;
  onRemove: (m: MetaData[]) => void;
}

const MetaDataCollectionForm = ({
  metaDataModel,
  onChange,
  onRemove
}: MetaDataCollectionFormProps) => {
  const internalOnChange = useCallback((index: number, metaData: MetaData) => {
    if (
      metaData.name !== metaDataModel[index].name ||
      metaData.type !== metaDataModel[index].type ||
      metaData.value !== metaDataModel[index].value
    ) {
      const newMetaDataModel = [
        ...metaDataModel
      ];

      newMetaDataModel[index] = metaData;

      onChange(newMetaDataModel);
    }
  }, [
    metaDataModel,
    onChange
  ]);

  const internalOnRemove = useCallback((index: number) => {
    const newMetaDataModel = [
      ...metaDataModel
    ];
    
    newMetaDataModel.splice(index, 1);

    onRemove(newMetaDataModel);
  }, [
    metaDataModel,
    onRemove
  ]);

  return (
    <>
      {
        metaDataModel.map((item, index) => {
          return (
            <div key={item.name}>
              <MetaDataField
                initialName={item.name}
                initialType={item.type}
                initialValue={item.value}
                onChange={(metaData) => {
                  internalOnChange(index, metaData);
                }}/>
                <button onClick={() => {
                  internalOnRemove(index);
                }}>
                  Remove
                </button>
            </div>
          );
        })
      }
    </>
  );
};

export const MarkdownEntityCreatePage = ({
  backToLinkPath,
  backToLinkString,
  createIsError,
  createIsErrorText,
  saveButtonText,
  template,
  titleString,
  //updateFunction
}: MarkdownEntityCreatePageProps) => {  
  const monacoInstance = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoElement = useRef(null);
  const [metaDataModel, setMetaDataModel] = useState<MetaData[]>([
    {
      name: 'AC',
      type: 'number',
      value: 0
    },
    {
      name: 'CR',
      type: 'string',
      value: '0'
    },
    {
      name: 'HP',
      type: 'number',
      value: 0
    },
    {
      name: 'Type',
      type: 'string',
      value: 'Beast'
    }
  ]);

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

  const onSubmit: SubmitHandler<CreateMarkdownEntityFormInputs> = (data: unknown) => {
    console.log({ data });
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
    console.log({ m });
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
                  <MetaDataCollectionForm
                    metaDataModel={metaDataModel}
                    onChange={onChange}
                    onRemove={onChange}
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
