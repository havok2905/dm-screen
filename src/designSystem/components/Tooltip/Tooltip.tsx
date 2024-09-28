import {
  ReactNode,
  useCallback,
  useMemo,
  useEffect,
  useRef,
  useState
} from 'react';

import classNames from 'classnames';

import './Tooltip.css';

export type TooltipOrientation =
  'bottom' |
  'bottom-left' |
  'bottom-right' |
  'left' |
  'right' |
  'top' |
  'top-left' |
  'top-right';

export interface TooltipProps {
  children: ReactNode;
  content: string;
  orientation: TooltipOrientation;
}

export interface TooltipContentProps {
  orientation: TooltipOrientation;
  content: string;
  controlRect: DOMRect | null;
}

export const TooltipContent = ({
  content,
  controlRect,
  orientation
}: TooltipContentProps) => {
  const [tooltipEl, setTooltipEl] = useState<HTMLDivElement | null>(null);

  const arrowClassList = {
    'dm-screen-design-system-tooltip-arrow': true,
    'dm-screen-design-system-tooltip-arrow-down': orientation === 'top',
    'dm-screen-design-system-tooltip-arrow-down-left': orientation === 'top-right',
    'dm-screen-design-system-tooltip-arrow-down-right': orientation === 'top-left',
    'dm-screen-design-system-tooltip-arrow-left': orientation === 'right',
    'dm-screen-design-system-tooltip-arrow-right': orientation === 'left',
    'dm-screen-design-system-tooltip-arrow-up': orientation === 'bottom',
    'dm-screen-design-system-tooltip-arrow-up-left': orientation === 'bottom-right',
    'dm-screen-design-system-tooltip-arrow-up-right': orientation === 'bottom-left'
  };

  const smallArrowClassList = {
    'dm-screen-design-system-tooltip-arrow-small': true,
    'dm-screen-design-system-tooltip-arrow-small-down': orientation === 'top',
    'dm-screen-design-system-tooltip-arrow-small-down-left': orientation === 'top-right',
    'dm-screen-design-system-tooltip-arrow-small-down-right': orientation === 'top-left',
    'dm-screen-design-system-tooltip-arrow-small-left': orientation === 'right',
    'dm-screen-design-system-tooltip-arrow-small-right': orientation === 'left',
    'dm-screen-design-system-tooltip-arrow-small-up': orientation === 'bottom',
    'dm-screen-design-system-tooltip-arrow-small-up-left': orientation === 'bottom-right',
    'dm-screen-design-system-tooltip-arrow-small-up-right': orientation === 'bottom-left'
  }

  const tooltipPosition = useMemo(() => {
    if (!controlRect || !tooltipEl) {
      return;
    }

    const tooltipRect = tooltipEl.getBoundingClientRect();

    const arrowSize = 8;
    
    const controlHeight = controlRect.height;
    const controlWidth = controlRect.width;
    
    const halfControlHeight = controlRect.height/ 2;
    const halfControlWidth = controlRect.width/ 2;
    const halfTooltipHeight = tooltipRect.height / 2;
    const halfTooltipWidth = tooltipRect.width / 2;

    const tooltipHeight = tooltipRect.height;
    const tooltipWidth = tooltipRect.width;
    
    const x = controlRect.left;
    const y = controlRect.top;
    
    const smallSpacing = 10;
    const arrowSpacingOffset = 8;

    if (orientation === 'bottom') {
      return {
        left: x + halfControlWidth - halfTooltipWidth,
        top: y + controlHeight + arrowSize + smallSpacing
      };
    }

    if (orientation === 'bottom-left') {
      return {
        left: x - tooltipWidth + halfControlWidth + arrowSize + arrowSpacingOffset,
        top: y + controlHeight + arrowSize + smallSpacing
      };
    }

    if (orientation === 'bottom-right') {
      return {
        left: x + halfControlWidth - arrowSize - arrowSpacingOffset,
        top: y + controlHeight + arrowSize + smallSpacing
      };
    }

    if (orientation === 'left') {
      return {
        left: x - tooltipWidth - arrowSize - smallSpacing,
        top: controlRect.y - halfTooltipHeight + halfControlHeight
      };
    }

    if (orientation === 'right') {
      return {
        left: x + controlWidth + arrowSize + smallSpacing,
        top: controlRect.y - halfTooltipHeight + halfControlHeight
      };
    }

    if (orientation === 'top') {
      return {
        left: x + halfControlWidth - halfTooltipWidth,
        top: controlRect.y - tooltipHeight - arrowSize - smallSpacing
      };
    }

    if (orientation === 'top-left') {
      return {
        left: x - tooltipWidth + halfControlWidth + arrowSize + arrowSpacingOffset,
        top: controlRect.y - tooltipHeight - arrowSize - smallSpacing
      };
    }

    if (orientation === 'top-right') {
      return {
        left: x + halfControlWidth - arrowSize - arrowSpacingOffset,
        top: controlRect.y - tooltipHeight - arrowSize - smallSpacing
      };
    }
  }, [
    controlRect,
    orientation,
    tooltipEl
  ]);

  return (
    <div
      className="dm-screen-design-system-tooltip"
      ref={(el) => setTooltipEl(el)}
      style={tooltipPosition}
    >
      <div className={classNames(smallArrowClassList)}></div>
      <div className={classNames(arrowClassList)}></div>
      <div
        className="dm-screen-design-system-tooltip-content">
        <p>
          {content}
        </p>
      </div>
    </div>
  );
};

export const Tooltip = ({
  children,
  content,
  orientation,
}: TooltipProps) => {
  const controlRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<any>(null);
  const [controlRect, setControlRect] = useState<DOMRect | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const internalOnMouseEnter = useCallback(() => {
    if (controlRef.current) {
      const rect = controlRef.current.getBoundingClientRect();

      /**
       * This forces a commit to hover by the user instead of
       * firing the tooltip as they idly move their mouse
       * across the screen. The delay is short enough to not
       * be too noticeable.
       */
      timeoutRef.current = setTimeout(() => {
        setControlRect(rect);
        setIsOpen(true);
      }, 300);
    }
  }, []);

  const internalOnMouseLeave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setControlRect(null);
    setIsOpen(false);
  }, []);

  useEffect(() => {
    /**
     * Force a cleanup of timeouts as the component tears
     * down. We don't want async code executing after the
     * component unmounts.
     */
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [])

  return (
    <>
      <span
        onMouseEnter={internalOnMouseEnter}
        onMouseLeave={internalOnMouseLeave}
        ref={controlRef}
      >
        {children}
      </span>
      {
        isOpen ? (
          <TooltipContent
            content={content}
            controlRect={controlRect}
            orientation={orientation}
          />
        ) : null
      }
    </>
  );
};
