import {
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  RefObject
} from 'react';
import {ReactNode} from 'react';

import {
  CloseIcon,
  MenuIcon
} from '../Icons';

import './IconButton.css';

export interface IconButtonProps {
  icon: 'close' | 'menu';
  onBlur?: (e: FocusEvent) => void;
  onClick?: (e: MouseEvent) => void;
  onFocus?: (e: FocusEvent) => void;
  onKeyDown?: (e: KeyboardEvent) => void;
  onKeyUp?: (e: KeyboardEvent) => void;
  onMouseEnter?: (e: MouseEvent) => void;
  onMouseLeave?: (e: MouseEvent) => void;
  ref?: RefObject<HTMLButtonElement>;
  tabIndex?: number;
}

export const IconButton = ({
  icon,
  onBlur,
  onClick,
  onFocus,
  onKeyDown,
  onKeyUp,
  onMouseEnter,
  onMouseLeave,
  ref,
  tabIndex = 0
}: IconButtonProps) => {
  const getIcon = (): ReactNode => {
    if (icon === 'close') return <CloseIcon/>;
    if (icon === 'menu') return <MenuIcon/>;
    return null;
  }
  
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

  return (
    <button
      className="dm-screen-design-system-icon-button"
      onBlur={handleOnBlur}
      onClick={handleOnClick}
      onFocus={handleOnFocus}
      onKeyDown={handleOnKeyDown}
      onKeyUp={handleOnKeyUp}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      ref={ref}
      role="button"
      tabIndex={tabIndex}>
      {getIcon()}
    </button>
  );
};
