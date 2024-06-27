import {
  FocusEvent,
  KeyboardEvent,
  MouseEvent
} from 'react';

export interface Column {
  name: string;
}

export type Columns = Column[];

export type RowData = (string | number | boolean)[];

export interface RowAction {
  name: string;
  onBlur?: (e: FocusEvent, rowData: RowData) => void;
  onClick?: (e: MouseEvent, rowData: RowData) => void;
  onFocus?: (e: FocusEvent, rowData: RowData) => void;
  onKeyDown?: (e: KeyboardEvent, rowData: RowData) => void;
  onKeyUp?: (e: KeyboardEvent, rowData: RowData) => void;
  onMouseEnter?: (e: MouseEvent, rowData: RowData) => void;
  onMouseLeave?: (e: MouseEvent, rowData: RowData) => void;
}

export interface Row {
  data: RowData;
  actions: RowAction[];
}

export type Rows = Row[];
