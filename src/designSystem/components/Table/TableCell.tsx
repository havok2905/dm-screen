import { ReactNode } from 'react';

import { TableImageData } from './types';

export interface TableCellProps {
  value: TableImageData | string | number | boolean | null;
}

export const TableCell = ({
  value
}: TableCellProps) => {
  const getStringValue = (): string | ReactNode => {
    if (typeof value === 'string') {
      return value;
    }

    if (
      typeof value === 'boolean' ||
      typeof value === 'number'
    ) {
      return String(value);
    }

    if (value?.type === 'table-image-data') {
      return (
        <>
          <img
            src={value.image}
            style={{ height: '100%' }}
          />
        </>
      );
    }

    return '';
  }
  
  return (
    <td
      className="dm-screen-design-system-table-cell"
      data-test-id="dm-screen-design-system-table-cell"
    >
      {getStringValue()}
    </td>
  );
};
