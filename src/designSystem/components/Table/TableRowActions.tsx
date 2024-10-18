import { LinkButton } from '../LinkButton';

import { RowAction, RowData } from './types';

export interface TableRowActionsProps {
  actions: RowAction[];
  rowData: RowData;
}

export const TableRowActions = ({
  actions,
  rowData
}: TableRowActionsProps) => {
  return (
    <td
      className="dm-screen-design-system-table-cell dm-screen-design-system-table-cell-actions"
      data-test-id="dm-screen-design-system-table-cell"
    >
      {
        actions.map((action, index) => {
          const {
            name,
            onClick,
            onKeyDown
          } = action;

          const handleOnClick = () => {
            if (onClick) {
              onClick(rowData);
            }
          };

          const handleOnKeyDown = onKeyDown ? () => {
            onKeyDown(rowData);
          } : undefined;

          return (
            <LinkButton
              buttonText={name}
              color="green"
              key={index}
              onClick={handleOnClick}
              onKeyDown={handleOnKeyDown}
            />
          );
        })
      }
    </td>
  );
};
