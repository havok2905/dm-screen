import classNames from 'classnames';

import {
  FocusEvent,
  KeyboardEvent,
  MouseEvent
} from 'react';

import './LinkButton.css';

export interface LinkButtonProps {
  buttonText: string;
  color: 'green' | 'red';
  disabled?: boolean;
  onBlur?: (e: FocusEvent) => void;
  onClick?: (e: MouseEvent) => void;
  onFocus?: (e: FocusEvent) => void;
  onKeyDown?: (e: KeyboardEvent) => void;
  onKeyUp?: (e: KeyboardEvent) => void;
  onMouseEnter?: (e: MouseEvent) => void;
  onMouseLeave?: (e: MouseEvent) => void;
}

export const LinkButton = ({
  buttonText,
  color,
  disabled = false,
  onBlur,
  onClick,
  onFocus,
  onKeyDown,
  onKeyUp,
  onMouseEnter,
  onMouseLeave
}: LinkButtonProps) => {
  const handleOnBlur = (e: FocusEvent) => {
    if (onBlur) {
      onBlur(e);
    }
  };

  const handleOnClick = (e: MouseEvent) => {
    if (onClick) {
      onClick(e);
    }
  };

  const handleOnFocus = (e: FocusEvent) => {
    if (onFocus) {
      onFocus(e);
    }
  };


  const handleOnKeyDown = (e: KeyboardEvent) => {
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  const handleOnKeyUp = (e: KeyboardEvent) => {
    if (onKeyUp) {
      onKeyUp(e);
    }
  };

  const handleOnMouseEnter = (e: MouseEvent) => {
    if(onMouseEnter) {
      onMouseEnter(e);
    }
  };

  const handleOnMouseLeave = (e: MouseEvent) => {
    if(onMouseLeave) {
      onMouseLeave(e);
    }
  };

  const classList = {
    'dm-screen-design-system-link-button': true,
    'dm-screen-design-system-link-button-green': color === 'green',
    'dm-screen-design-system-link-button-red': color === 'red'
  };

  return (
    <button
      className={classNames(classList)}
      disabled={disabled}
      onBlur={handleOnBlur}
      onClick={handleOnClick}
      onFocus={handleOnFocus}
      onKeyDown={handleOnKeyDown}
      onKeyUp={handleOnKeyUp}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      role="button">
      {buttonText}
    </button>
  );
};
