import {
  MetaDataType,
  MetaDataValue
} from '@core/types';

import {ChangeEvent} from 'react';

export interface MetaDataFieldProps {
  name: string;
  onNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onTypeChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onValueChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type: MetaDataType;
  value: MetaDataValue;
}

export const MetaDataField = ({
  name,
  onNameChange,
  onTypeChange,
  onValueChange,
  type,
  value
}: MetaDataFieldProps) => {
  const getValueField = () => {
    if (type === 'boolean') {
      return (
        <input
          checked={value as boolean}
          onChange={onValueChange}
          type="checkbox"/>
      );
    }

    if (type === 'number') {
      return (
        <input  
          onChange={onValueChange}
          type="number"
          value={value as number}/>
      );
    }

    if (type === 'string') {
      return (
        <input
          onChange={onValueChange}
          type="text"
          value={value as string}/>
      );
    }
  };

  return (
    <span>
      <input
        onChange={onNameChange}
        type="text"
        value={name}/>
      <select
        onChange={onTypeChange}
        value={type}>
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
    </span>
  )
};
