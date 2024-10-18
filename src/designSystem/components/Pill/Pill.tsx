import classNames from 'classnames';

import { IconButton } from '@designSystem/components';

import "./Pill.css";

export interface PillProps {
  color: 'black-50',
  closeFunc?: () => void;
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

  const handleClose = () => {
    if (closeFunc) {
      closeFunc();
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
        />
      </span>
    </span>
  );
}