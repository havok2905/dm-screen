import {
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  useEffect,
  useRef,
  useState
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
  preserveScroll: boolean;
}

export const SideDrawer = ({
  children,
  isOpen,
  onClose,
  portalElement,
  preserveScroll
}: SideDrawerProps) => {
  console.log('hello');
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const sideDrawerRef = useRef<HTMLDivElement>(null);

  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    if (isOpen) {
      if (closeButtonRef.current) {
        document.body.setAttribute('style', 'overflow: hidden');
        closeButtonRef.current.focus();
      }

      if (preserveScroll && sideDrawerRef.current) {
        sideDrawerRef.current.scrollTo(0, scrollPosition);
      }
    } else {
      if (closeButtonRef.current) {
        document.body.setAttribute('style', '');
        closeButtonRef.current.blur();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const current = sideDrawerRef.current;
    
    const debounce = (fn, timeout = 300) => {
      let timer;

      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { fn.apply(this, args); }, timeout);
      };
    };

    const scrollEvent = debounce((e) => {
      if (isOpen) {
        setScrollPosition(current?.scrollTop ?? 0);
      }
    }, 100);

    if (preserveScroll && current) {
      current.addEventListener('scroll', scrollEvent);
    }

    return () => {
      if (preserveScroll && current) {
        current.removeEventListener('scroll', scrollEvent);
      }
    }
  }, [
    isOpen
  ]);

  const handleOnCloseClick = () => {
    onClose();
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
      <div
        className={classNames(classList)}
        ref={sideDrawerRef}
      >
        <div
          className="dm-screen-design-system-side-drawer-header"
          data-test-id="dm-screen-design-system-side-drawer-header"
        >
          <IconButton
            icon="close"
            onClick={handleOnCloseClick}
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
