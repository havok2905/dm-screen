import {
  KeyboardEvent,
  MouseEvent
} from 'react';

import './Button.css';

export interface ButtonProps {
  as?: 'button' | 'a';
  buttonText: string;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
  onKeyDown?: () => void;
}

export const Button = ({
  buttonText,
  disabled = false,
  onClick,
  onKeyDown,
}: ButtonProps) => {
  const handleOnClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleOnKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (onKeyDown) {
        onKeyDown();
      } else {
        if (onClick) {
          onClick();
        }
      }
    }
  };

  return (
    <button
      className="dm-screen-design-system-button"
      data-test-id="dm-screen-design-system-button"
      disabled={disabled}
      onClick={handleOnClick}
      onKeyDown={handleOnKeyDown}
      role="button">
      {buttonText}
    </button>
  );
};
