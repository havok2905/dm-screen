import classNames from 'classnames';

import {
  KeyboardEvent,
  MouseEvent
} from "react";

import { IconButton } from '@designSystem/components';

import "./Pill.css";

export interface PillProps {
  color: 'black-50',
  closeFunc?: (e: MouseEvent | KeyboardEvent) => void;
  text: string;
}

export const Pill = ({
  color,
  closeFunc,
  text
}: PillProps) => {
  const classList = {
    'dm-screen-design-system-pill': true,
    'dm-screen-design-system-pill-black-50': color === 'black-50'
  };

  const handleClose = (e: MouseEvent | KeyboardEvent) => {
    e.preventDefault();

    // Prevent click from bubbling up to main click, if we have an interaction there.
    e.stopPropagation();

    if (closeFunc) {
      closeFunc(e);
    }
  }

  return (
    <span className={classNames(classList)}>
      {text}
      <span
        className="dm-screen-design-system-pill-closeButton"
        onClick={handleClose}>
        <IconButton
          icon="close"
          onClick={handleClose}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleClose(e);
            }
          }} />
      </span>
    </span>
  );
}