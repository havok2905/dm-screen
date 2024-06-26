export interface TableCellProps {
  value: string;
}

export const TableCell = ({
  value
}: TableCellProps) => {
  return (
    <td className="dm-screen-design-system-table-cell">
      {value}
    </td>
  );
};
