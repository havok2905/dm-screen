import { ReactNode } from 'react';

export interface Column {
  name: string;
}

export type Columns = Column[];

export type RowData = (string | number | boolean)[];

export interface RowAction {
  name: string;
  onClick?: (rowData: RowData) => void;
  onKeyDown?: (rowData: RowData) => void;
}

export interface Row {
  data: RowData;
  actions: RowAction[];
  collapsibleRenderer?: () => ReactNode;
  isExpanded?: boolean;
}

export type Rows = Row[];
