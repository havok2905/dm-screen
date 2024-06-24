import {
  FocusEvent,
  KeyboardEvent,
  MouseEvent
} from 'react';
import classNames from 'classnames';

import './Button.css';

export interface ButtonProps {
  as?: 'button' | 'a';
  buttonText: string;
  disabled?: boolean;
  href?: string;
  onBlur?: (e: FocusEvent) => void;
  onClick?: (e: MouseEvent) => void;
  onFocus?: (e: FocusEvent) => void;
  onKeyDown?: (e: KeyboardEvent) => void;
  onKeyUp?: (e: KeyboardEvent) => void;
  onMouseEnter?: (e: MouseEvent) => void;
  onMouseLeave?: (e: MouseEvent) => void;
}

export const Button = ({
  as = 'button',
  buttonText,
  disabled = false,
  href,
  onBlur,
  onClick,
  onFocus,
  onKeyDown,
  onKeyUp,
  onMouseEnter,
  onMouseLeave
}: ButtonProps) => {
  const isLinkWithoutHref = as === 'a' && !href;

  const handleOnBlur = (e: FocusEvent) => {
    if (onBlur) {
      onBlur(e);
    }
  };

  const handleOnClick = (e: MouseEvent) => {
    if (isLinkWithoutHref) {
      e.preventDefault();
    }

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
    if (isLinkWithoutHref) {
      e.preventDefault();
    }

    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  const handleOnKeyUp = (e: KeyboardEvent) => {
    if (isLinkWithoutHref) {
      e.preventDefault();
    }

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

  if (as === 'a') {
    const classList = {
      'button': true,
      'button-disabled': disabled
    };

    if (href) {
      return (
        <a
          className={classNames(classList)}
          href={href || undefined}
          onBlur={handleOnBlur}
          onClick={handleOnClick}
          onFocus={handleOnFocus}
          onKeyDown={handleOnKeyDown}
          onKeyUp={handleOnKeyUp}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
          role={href ? undefined : 'button'}
          tabIndex={0}>
          {buttonText}
        </a>
      );
    }

    return (
      <a
        className={classNames(classList)}
        onBlur={handleOnBlur}
        onClick={handleOnClick}
        onFocus={handleOnFocus}
        onKeyDown={handleOnKeyDown}
        onKeyUp={handleOnKeyUp}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        role="button"
        tabIndex={0}>
        {buttonText}
      </a>
    );
  }

  return (
    <button
      className="button"
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
