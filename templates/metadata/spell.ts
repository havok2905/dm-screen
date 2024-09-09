import {MetaDataType} from '@core/types';

export const SPELL_METADATA = [
  {
    name: 'Concentration',
    type: 'boolean' as MetaDataType,
    value: false
  },
  {
    name: 'Level',
    type: 'number' as MetaDataType,
    value: 0
  },
  {
    name: 'Ritual',
    type: 'boolean' as MetaDataType,
    value: false
  },
  {
    name: 'School',
    type: 'string' as MetaDataType,
    value: 'Evocation'
  }
];
