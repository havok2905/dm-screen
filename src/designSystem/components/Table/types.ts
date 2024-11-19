import { ReactNode } from 'react';

export interface Column {
  name: string;
}

export type Columns = Column[];

export interface TableImageData {
  image: string;
  type: 'table-image-data'
}

export type RowData = (string | number | boolean | TableImageData)[];

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
