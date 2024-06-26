import {
  FocusEvent,
  KeyboardEvent,
  MouseEvent
} from 'react';

export interface Column {
  name: string;
}

export type Columns = Column[];

export interface RowAction {
  name: string;
  onBlur?: (e: FocusEvent) => void;
  onClick?: (e: MouseEvent) => void;
  onFocus?: (e: FocusEvent) => void;
  onKeyDown?: (e: KeyboardEvent) => void;
  onKeyUp?: (e: KeyboardEvent) => void;
  onMouseEnter?: (e: MouseEvent) => void;
  onMouseLeave?: (e: MouseEvent) => void;
}

export interface Row {
  data: string[];
  actions: RowAction[];
}

export type Rows = Row[];
