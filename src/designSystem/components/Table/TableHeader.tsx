import { Columns } from './types';

export interface TableHeaderProps {
  columns: Columns
}

export const TableHeader = ({
  columns
}: TableHeaderProps) => {
  return (
    <tr>
      {
        columns.map(((col, index) => {
          return (
            <th
              className="dm-screen-design-system-table-header"
              data-test-id="dm-screen-design-system-table-header"
              key={index}
              scope="col">
              {col.name}
            </th>
          )
        }))
      }
    </tr>
  );
};
