import { Columns, Rows } from './types';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';

import './Table.css';

export interface TableProps {
  columns: Columns;
  rows: Rows;
}

export const Table = ({
  columns,
  rows
}: TableProps) => {
  return (
    <table className="dm-screen-design-system-table">
      <thead>
        <TableHeader columns={columns} />
      </thead>
      <tbody>
        {rows.map((row, index) => <TableRow key={index} row={row}/>)}
      </tbody>
    </table>
  );
};
