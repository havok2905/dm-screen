export interface TableCellProps {
  value: string | number | boolean | null;
}

export const TableCell = ({
  value
}: TableCellProps) => {
  const getStringValue = (): string => {
    if (typeof value === 'string') {
      return value;
    }

    if (
      typeof value === 'boolean' ||
      typeof value === 'number'
    ) {
      return String(value);
    }

    return '';
  }
  
  return (
    <td className="dm-screen-design-system-table-cell">
      {getStringValue()}
    </td>
  );
};
