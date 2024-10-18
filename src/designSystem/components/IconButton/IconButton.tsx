import {
  forwardRef,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  RefObject
} from 'react';

import {
  BookIcon,
  CloseIcon,
  MenuIcon,
  MoonIcon
} from '../Icons';

import './IconButton.css';

export interface IconButtonProps {
  icon: 'book' | 'close' | 'menu' | 'moon' | null;
  onClick?: () => void;
  onKeyDown?: () => void;
  tabIndex?: number;
}

export const IconButton = forwardRef(({
  icon,
  onClick,
  onKeyDown,
  tabIndex = 0
}: IconButtonProps, ref) => {
  const getIcon = (): ReactNode => {
    if (icon === 'book') return <BookIcon/>;
    if (icon === 'close') return <CloseIcon/>;
    if (icon === 'menu') return <MenuIcon/>;
    if (icon === 'moon') return <MoonIcon/>;
    return null;
  }

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
          handleOnClick();
        }
      }
    }
  };

  return (
    <button
      className="dm-screen-design-system-icon-button"
      data-test-id="dm-screen-design-system-icon-button"
      onClick={handleOnClick}
      onKeyDown={handleOnKeyDown}
      ref={ref as RefObject<HTMLButtonElement>}
      role="button"
      tabIndex={tabIndex}>
      {getIcon()}
    </button>
  );
});

IconButton.displayName = 'IconButton';
