import classNames from 'classnames';
import { KeyboardEvent, ReactNode, useEffect, useRef } from 'react';
import { createPortal, } from 'react-dom';

import { CloseIcon } from '../Icons';

import './SideDrawer.css';

export interface SideDrawerProps {
  children: ReactNode
  isOpen: boolean;
  onClose: () => void;
  portalElement: HTMLElement;
}

export const SideDrawer = ({
  children,
  isOpen,
  onClose,
  portalElement
}: SideDrawerProps) => {
  const closeButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (closeButtonRef.current) {
        document.body.setAttribute('style', 'overflow: hidden');
        closeButtonRef.current.focus();
      }
    } else {
      if (closeButtonRef.current) {
        document.body.setAttribute('style', '');
        closeButtonRef.current.blur();
      }
    }
  }, [isOpen])

  const handleOnCloseClick = () => {
    onClose();
  }

  const handleOnCloseKeyboard = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onClose();
    }
  }

  const handleBackgroundClick = (e: MouseEvent) => {
    e.stopPropagation();
    handleOnCloseClick();
  };

  const classList = {
    'dm-screen-design-system-side-drawer': true,
    'dm-screen-design-system-side-drawer-open': isOpen
  };

  const sideDrawer = (
    <>
      <div className={classNames(classList)}>
        <div className="dm-screen-design-system-side-drawer-header">
          <div
            className="dm-screen-design-system-side-drawer-header-close-button"
            onClick={handleOnCloseClick}
            onKeyDown={handleOnCloseKeyboard}
            ref={closeButtonRef}
            role="button"
            tabIndex={isOpen ? 0 : -1}>
            <CloseIcon/>
          </div>
        </div>
        {
          isOpen ? (
            <>
              {children}
            </>
          ) : null
        }
      </div>
      {
        isOpen ? (
          <div
            className="dm-screen-design-system-side-drawer-backdrop"
            onClick={handleBackgroundClick}
          />
        ) : null
      }
    </>
  );

  return createPortal(
    sideDrawer,
    portalElement
  );
};
