import {
  MouseEvent,
  ReactNode,
  useEffect
} from 'react';

import classNames from 'classnames';

import { createPortal, } from 'react-dom';

import './Modal.css';

export interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  portalElement: HTMLElement;
  isShowcaseView?: boolean;
}

export const Modal = ({
  children,
  isOpen,
  onClose,
  portalElement,
  isShowcaseView
}: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.setAttribute('style', 'overflow: hidden');
    } else {
      document.body.setAttribute('style', '');
    }
  }, [isOpen])

  const handleOnCloseClick = () => {
    onClose();
  }

  const handleBackgroundClick = (e: MouseEvent) => {
    e.stopPropagation();
    handleOnCloseClick();
  };

  const classList = {
    'dm-screen-design-system-modal': true,
    'showcase': isShowcaseView
  };

  const modal = (
    <>
      <div
        className={classNames(classList)}
        data-test-id="dm-screen-design-system-modal"
      >
        {children}
      </div>
      <div
        className="dm-screen-design-system-modal-backdrop"
        data-test-id="dm-screen-design-system-modal-backdrop"
        onClick={handleBackgroundClick}
      />
    </>
  );

  if (!isOpen) return null;
  
  return createPortal(
    modal,
    portalElement
  );
};
