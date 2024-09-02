import {
  FocusEvent,
  KeyboardEvent,
  MouseEvent
} from 'react';

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
            onBlur,
            onClick,
            onFocus,
            onKeyDown,
            onKeyUp,
            onMouseEnter,
            onMouseLeave
          } = action;

          const handleOnBlur = (e: FocusEvent) => {
            if (onBlur) {
              onBlur(e, rowData);
            }
          };

          const handleOnClick = (e: MouseEvent) => {
            if (onClick) {
              onClick(e, rowData);
            }
          };

          const handleOnFocus = (e: FocusEvent) => {
            if (onFocus) {
              onFocus(e, rowData);
            }
          };

          const handleOnKeyDown = (e: KeyboardEvent) => {
            if (onKeyDown) {
              onKeyDown(e, rowData);
            }
          };

          const handleOnKeyUp = (e: KeyboardEvent) => {
            if (onKeyUp) {
              onKeyUp(e, rowData);
            }
          };

          const handleOnMouseEnter = (e: MouseEvent) => {
            if (onMouseEnter) {
              onMouseEnter(e, rowData);
            }
          };

          const handleOnMouseLeave = (e: MouseEvent) => {
            if (onMouseLeave) {
              onMouseLeave(e, rowData);
            }
          };

          return (
            <LinkButton
              buttonText={name}
              color="green"
              key={index}
              onBlur={handleOnBlur}
              onClick={handleOnClick}
              onFocus={handleOnFocus}
              onKeyDown={handleOnKeyDown}
              onKeyUp={handleOnKeyUp}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
          );
        })
      }
    </td>
  );
};
