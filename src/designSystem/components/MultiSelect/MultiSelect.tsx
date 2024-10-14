import { useEffect, useRef, useState } from 'react';

import classNames from 'classnames';

import { CheckIcon } from '../Icons';

import './MultiSelect.css';

export interface MultiSelectDataItem {
  displayValues: string[];
  value: string;
}

export interface MultiSelectItemProps {
  dataItem: MultiSelectDataItem;
  selected: boolean;
}

export const MultiSelectItem = ({
  dataItem,
  selected
}: MultiSelectItemProps) => {
  const checkboxStyles = {
    'dm-screen-design-system-multiselect-cell-checkbox-hidden': !selected,
  };

  return (
    <>
      <span className="dm-screen-design-system-multiselect-cell dm-screen-design-system-multiselect-cell-checkbox">
        <div className={classNames(checkboxStyles)}>
          <CheckIcon/>
        </div>
      </span>
      {
        dataItem.displayValues.map((displayValue, index) => {
          return (
            <span
              className="dm-screen-design-system-multiselect-cell"
              key={index}>
              {displayValue}
            </span>
          )
        })
      }
    </>
  );
};

export interface MultiSelectProps {
  dataItems: MultiSelectDataItem[];
  initialSelected?: string[];
  inputId: string;
  maxHeight?: number;
  onChange?: (values: string, el: HTMLInputElement) => void;
  onSelect?: (value: string, dataMultiSelectItem: MultiSelectDataItem, el: HTMLInputElement) => void;
}

export const MultiSelect = ({
  dataItems,
  initialSelected = [],
  inputId,
  maxHeight,
  onSelect
}: MultiSelectProps) => {
  const multiselectRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const mockInputRef = useRef<HTMLInputElement | null>(null);
  const [active, setActive] = useState<number | null>(null);
  const [selected, setSelected] = useState<string[]>(initialSelected);
  const [isOpen, setIsOpen] = useState<boolean>(false)

  /**
   * We want to clean up selected state only when we have a new
   * batch of items. This is a prime example of exhaustive deps
   * being an incorrect rule.
   */
  useEffect(() => {
    const dataItemValues = dataItems.map((item) => item.value);

    const newSelected = selected.filter(value => {
      return dataItemValues.includes(value);
    });
    
    setSelected(newSelected);
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [
    dataItems
  ]);

  useEffect(() => {
    const current = multiselectRef.current;

    const onKeyDown = (e) => {
      e.preventDefault();
  
      /**
       * Cycle active state when we reach the bottom.
       */
      if (e.key === 'ArrowDown') {
        if (active === dataItems.length - 1) {
          setActive(0);
        } else {
          setActive(active! + 1);
        }
      }

      /**
       * Cycle active state when we reach the top.
       */
      if (e.key === 'ArrowUp') {
        if (active === 0) {
          setActive(dataItems.length - 1);
        } else {
          setActive(active! - 1);
        }
      }

      /**
       * When we tab, we are closing the multiselect and
       * refocusing on the parent input, to allow the
       * user to keep tabbing through the form.
       */
      if (e.key === 'Tab') {
        setActive(null); // Reset the active state, since we are closing the form.
        setIsOpen(false);
        inputRef.current?.focus();
      }
    };

    if (current && isOpen) {
      /**
       * If we haven't set focus yet, force focus on the first item in
       * the list and set the first item to active.
       */
      if(current && active === null) {
        const items = current.getElementsByTagName('li');
        if (items.length > 1) {
          setActive(0);
          items[1].focus();
        }
      }

      current.addEventListener('keydown', onKeyDown);
    }

    return () => {
      if (current) {
        current.removeEventListener('keydown', onKeyDown);
      }
    }
  }, [
    active,
    dataItems,
    isOpen,
    setActive
  ]);

  useEffect(() => {
    if(multiselectRef.current && active !== null) {
      const items = multiselectRef.current.getElementsByTagName('li');
      // First LI is multiselect headers
      if (items.length > 1) {
        setActive(active);
        items[active].focus();
      }
    }
  }, [
    active
  ]);

  return (
    <>
      <input
        id={inputId}
        ref={inputRef}
        type='hidden'
        value={selected.join('|')}
      >
      </input>
      <input
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setIsOpen(true);
          }
        }}
        ref={mockInputRef}
        style={{ width: '400px' }}
        type="text"
        value={selected.join('|')}/>
      {
        isOpen ? (
          <div
            className="dm-screen-design-system-multiselect-wrapper"
            ref={multiselectRef}
            style={{
              maxHeight: `${maxHeight}px`,
              width: `${mockInputRef.current?.getBoundingClientRect().width ?? 0}px`
            }}>
            <ul
              className="dm-screen-design-system-multiselect">
              {
                dataItems.map((dataItem, index) => {
                  const isActive = active === index;
                  const isSelected = selected.includes(dataItem.value);
    
                  const rowClassList = {
                    'dm-screen-design-system-multiselect-row': true,
                    'dm-screen-design-system-multiselect-row-active': isActive,
                    'dm-screen-design-system-multiselect-row-selected': isSelected
                  };
    
                  const onItemSelect = () => {
                    const newItems = isSelected
                      ? selected.filter(item => item !== dataItem.value)
                      : [ ...selected, dataItem.value ];
    
                    setSelected(newItems);
                    setActive(index);
    
                    if (onSelect) {
                      onSelect(newItems.join('|'), dataItem, inputRef.current!);
                    }
                  };

                  return (
                    <li
                      className={classNames(rowClassList)}
                      key={index}
                      onClick={onItemSelect}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          onItemSelect();
                        }
                      }}
                      tabIndex={index + 1}
                    >
                      <MultiSelectItem
                        dataItem={dataItem}
                        selected={isSelected}/>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        ) : null
      }
    </>
  );
};