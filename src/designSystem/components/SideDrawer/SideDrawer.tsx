import {
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  useEffect,
  useRef
} from 'react';

import classNames from 'classnames';
import { createPortal } from 'react-dom';

import { IconButton } from '../IconButton';

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
  const closeButtonRef = useRef<HTMLButtonElement>(null);

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
        <div
          className="dm-screen-design-system-side-drawer-header"
          data-test-id="dm-screen-design-system-side-drawer-header"
        >
          <IconButton
            icon="close"
            onClick={handleOnCloseClick}
            onKeyDown={handleOnCloseKeyboard}
            ref={closeButtonRef}
            tabIndex={isOpen ? 0 : -1}
          />
        </div>
        {
          isOpen ? (
            <div data-test-id="dm-screen-design-system-side-drawer-content">
              {children}
            </div>
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
