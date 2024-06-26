import { Button } from '../Button';
import { RowAction } from './types';

export interface TableRowActionsProps {
  actions: RowAction[];
}

export const TableRowActions = ({
  actions
}: TableRowActionsProps) => {
  return (
    <td className="dm-screen-design-system-table-cell dm-screen-design-system-table-cell-actions">
      {
        actions.map((action, index) => {
          const {
            name,
            onBlur,
            onClick,
            onFocus,
            onKeyDown,
            onKeyUp,
            onMouseEnter,
            onMouseLeave
          } = action;

          return (
            <Button
              buttonText={name}
              key={index}
              onBlur={onBlur}
              onClick={onClick}
              onFocus={onFocus}
              onKeyDown={onKeyDown}
              onKeyUp={onKeyUp}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            />
          );
        })
      }
    </td>
  );
};
