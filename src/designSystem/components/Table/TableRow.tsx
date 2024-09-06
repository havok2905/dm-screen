import { Row } from './types';
import { TableCell } from './TableCell';
import { TableRowActions } from './TableRowActions';

export interface TableRowProps {
  row: Row;
}

export const TableRow = ({
  row
}: TableRowProps) => {
  return (
    <>
      <tr
        className="dm-screen-design-system-table-row"
        data-test-id="dm-screen-design-system-table-row"
      >
          {
            row.data.map((value, index) => <TableCell key={index} value={value}/>)
          }
          <TableRowActions
            actions={row.actions}
            rowData={row.data}/>
      </tr>
      {
        row.isExpanded && row.collapsibleRenderer ? (
          <tr className="dm-screen-design-system-table-row">
            <td className="dm-screen-design-system-table-cell" colSpan={100}>
              { row.collapsibleRenderer() }
            </td>
          </tr>
        ) : null
      }
    </>
  );
};
