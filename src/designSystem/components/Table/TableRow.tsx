
import { Row } from './types';
import { TableCell } from './TableCell';
import {TableRowActions} from './TableRowActions';

export interface TableRowProps {
  row: Row;
}

export const TableRow = ({
  row
}: TableRowProps) => {
  return (
    <tr className="dm-screen-design-system-table-row">
      {
        row.data.map((value, index) => <TableCell key={index} value={value}/>)
      }
      <TableRowActions actions={row.actions}/>
    </tr>
  );
};
