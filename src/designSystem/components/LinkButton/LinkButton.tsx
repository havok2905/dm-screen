import classNames from 'classnames';
import { KeyboardEvent } from 'react';

import './LinkButton.css';

export interface LinkButtonProps {
  buttonText: string;
  color: 'green' | 'red';
  disabled?: boolean;
  onClick?: () => void;
  onKeyDown?: () => void;
}

export const LinkButton = ({
  buttonText,
  color,
  disabled = false,
  onClick,
  onKeyDown
}: LinkButtonProps) => {
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

  const classList = {
    'dm-screen-design-system-link-button': true,
    'dm-screen-design-system-link-button-green': color === 'green',
    'dm-screen-design-system-link-button-red': color === 'red'
  };

  return (
    <button
      className={classNames(classList)}
      data-test-id="dm-screen-design-system-link-button"
      disabled={disabled}
      onClick={handleOnClick}
      onKeyDown={handleOnKeyDown}
      role="button">
      {buttonText}
    </button>
  );
};
