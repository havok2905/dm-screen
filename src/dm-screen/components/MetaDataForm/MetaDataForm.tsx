import {
  ChangeEvent,
  useCallback,
  useEffect,
  useReducer
} from 'react';
import {
  IconButton,
  LinkButton
} from '@designSystem/components';
import {
  MetaData,
  MetaDataType,
  MetaDataValue
} from '@core/types';

import { MetaDataField } from './MetaDataField';

import './MetaDataForm.css';

enum ReducerActionType {
  ADD = 'add',
  SET_ALL = 'set-all',
  REMOVE = 'remove',
  UPDATE_NAME = 'update-name',
  UPDATE_TYPE = 'update-type',
  UPDATE_VALUE = 'update-value'
}

interface ReducerAddAction {
  type: ReducerActionType.ADD;
}

interface ReducerRemoveAction {
  payload: {
    index: number;
  };
  type: ReducerActionType.REMOVE;
}

interface ReducerSetAllAction {
  payload: {
    metaData: MetaData[];
  };
  type: ReducerActionType.SET_ALL;
}

interface ReducerUpdateNameAction {
  payload: {
    index: number;
    name: string;
  };
  type: ReducerActionType.UPDATE_NAME;
}

interface ReducerUpdateTypeAction {
  payload: {
    index: number;
    type: MetaDataType;
  };
  type: ReducerActionType.UPDATE_TYPE;
}

interface ReducerUpdateValueAction {
  payload: {
    index: number;
    value: MetaDataValue;
  };
  type: ReducerActionType.UPDATE_VALUE;
}

type ReducerAction =
  ReducerAddAction |
  ReducerSetAllAction |
  ReducerRemoveAction |
  ReducerUpdateNameAction |
  ReducerUpdateTypeAction | 
  ReducerUpdateValueAction;

interface ReducerState {
  metaData: MetaData[];
}

const reducer = (state: ReducerState, action: ReducerAction) => {
  if (action.type === ReducerActionType.ADD) {
    const metaData: MetaData[] = [
      ...state.metaData,
      {
        name: '',
        type: 'string',
        value: ''
      }
    ];

    return { metaData };
  }

  if (action.type === ReducerActionType.SET_ALL) {
    return {
      metaData: JSON.parse(JSON.stringify(action.payload.metaData))
    };
  }

  if (action.type === ReducerActionType.UPDATE_NAME) {
    const { index, name } = action.payload;
    const metaData = [ ...state.metaData ];

    metaData[index].name = name;

    return { metaData };
  }

  if (action.type === ReducerActionType.REMOVE) {
    const { index } = action.payload;
    const metaData = state.metaData.filter((_item, itemIndex) => itemIndex !== index);

    return { metaData };
  }

  if (action.type === ReducerActionType.UPDATE_TYPE) {
    const { index, type } = action.payload;

    let value: MetaDataValue;

    if (type === 'boolean') {
      value = false;
    }

    if (type === 'number') {
      value = 0;
    }

    if (type === 'string') {
      value = '';
    }

    const metaData = [ ...state.metaData ];

    metaData[index].type = type;
    metaData[index].value = value!;

    return { metaData };
  }

  if (action.type === ReducerActionType.UPDATE_VALUE) {
    const { index, value } = action.payload;
    const metaData = [ ...state.metaData ];

    metaData[index].value = value;

    return { metaData };
  }

  throw Error('Unknown action.');
}

export interface MetaDataFormProps {
  initialMetaData: MetaData[];
  onChange: (m: MetaData[]) => void;
}

export const MetaDataForm = ({
  initialMetaData,
  onChange
}: MetaDataFormProps) => {
  const [state, dispatch] = useReducer(reducer, {
    metaData: JSON.parse(JSON.stringify(initialMetaData))
  });

  const {
    metaData
  } = state as ReducerState;

  useEffect(() => {
    onChange(metaData);
  }, [
    metaData,
    onChange
  ]);

  useEffect(() => {
    if (initialMetaData) {
      dispatch({
        type: ReducerActionType.SET_ALL,
        payload: {
          metaData: initialMetaData
        }
      });
    }
  }, [
    initialMetaData
  ]);

  const handleMetaDataNameChange = useCallback((event: ChangeEvent<HTMLInputElement>, index: number) => {
    dispatch({
      type: ReducerActionType.UPDATE_NAME,
      payload: {
        index,
        name: event.target.value
      }
    });
  }, []);

  const handleMetaDataTypeChange = useCallback((event: ChangeEvent<HTMLSelectElement>, index: number) => {
    dispatch({
      type: ReducerActionType.UPDATE_TYPE,
      payload: {
        index,
        type: event.target.value as MetaDataType
      }
    });
  }, []);

  const handleMetaDataValueChange = useCallback((event: ChangeEvent<HTMLInputElement>, index: number) => {
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
        index,
        value: value!
      }
    });
  }, []);

  const handleMetaDataAdd = useCallback(() => {
    dispatch({
      type: ReducerActionType.ADD
    });
  }, []);

  const handleMetaDataRemove = useCallback((index: number) => {
    dispatch({
      type: ReducerActionType.REMOVE,
      payload: {
        index
      }
    });
  }, []);

  return (
    <div className="metadata-form">
      <div className="metadata-fields">
        {
          metaData.map((item, index) => {
            return (
              <div
                className="metadata-field"
                data-test-id="metadata-field"
                key={index}
              >
                <MetaDataField
                  name={item.name}
                  onNameChange={(e: ChangeEvent<HTMLInputElement>) => {
                    handleMetaDataNameChange(e, index);
                  }}
                  onTypeChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    handleMetaDataTypeChange(e, index);
                  }}
                  onValueChange={(e: ChangeEvent<HTMLInputElement>) => {
                    handleMetaDataValueChange(e, index);
                  }}
                  type={item.type}
                  value={item.value}
                />
                <IconButton
                  icon="close"
                  onClick={() => {
                    handleMetaDataRemove(index);
                  }}
                />
              </div>
            );
          })
        }
      </div>
      <LinkButton
        buttonText="Add new metadata"
        color="green"
        onClick={handleMetaDataAdd}/>
    </div>
  );
};