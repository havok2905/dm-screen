import { useCallback, useEffect, useRef, useState } from 'react';

import classNames from 'classnames';

import { CheckIcon } from '../Icons';
import { Pill } from '../Pill';

import './MultiSelect.css';

export interface MultiSelectDataItem {
  displayValue: string;
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
      <span className="dm-screen-design-system-multiselect-cell">
        {dataItem.displayValue}
      </span>
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
  width?: string;
}

export const MultiSelect = ({
  dataItems,
  initialSelected = [],
  inputId,
  maxHeight,
  onSelect,
  width = '400px'
}: MultiSelectProps) => {
  const multiselectRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const pillInputRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<number | null>(null);
  const [selected, setSelected] = useState<string[]>(initialSelected);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const closeField = useCallback(() => {
    setActive(null);
    setIsOpen(false);
    pillInputRef.current?.focus();
  }, []);

  const focusFirstItem = useCallback(() => {
    if(multiselectRef.current && active === null) {
      const items = multiselectRef.current.getElementsByTagName('li');
      if (items.length > 1) {
        setActive(0);
        items[1].focus();
      }
    }
  }, [
    active
  ]);

  const navigateDown = useCallback(() => {
    if (active === dataItems.length - 1) {
      setActive(0);
    } else {
      setActive(active! + 1);
    }
  }, [
    active,
    dataItems
  ]);

  const navigateUp = useCallback(() => {
    if (active === 0) {
      setActive(dataItems.length - 1);
    } else {
      setActive(active! - 1);
    }
  }, [
    active,
    dataItems
  ]);

  /**
   * We want to clean up selected state only when we have a new
   * batch of items. This is a prime example of exhaustive deps
   * being an incorrect rule.
   * 
   * Selected as an exhaustive dependency here would proc
   * an infinite loop that we don't want, as the result of
   * newSelected would always be a new instance of an Array
   * object.
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

  /**
   * Register events on the multiselect field
   * and tear them down on teardown of the component.
   */
  useEffect(() => {
    const current = multiselectRef.current;

    const onKeyDown = (e) => {
      e.preventDefault();
      if (e.key === 'ArrowDown') navigateDown();
      if (e.key === 'ArrowUp') navigateUp();
      if (e.key === 'Tab') closeField();
    };

    if (current && isOpen) {
      focusFirstItem();
      current.addEventListener('keydown', onKeyDown);
    }

    return () => {
      if (current) {
        current.removeEventListener('keydown', onKeyDown);
      }
    }
  }, [
    closeField,
    focusFirstItem,
    isOpen,
    navigateDown,
    navigateUp
  ]);

  /**
   * When a new item is designated as active we want to
   * force focus on that element. This is normally handled
   * by tabbing, but movement through the list is handled
   * by up/down keys here, so focus needs to be managed
   * manually.
   */
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
    <div className="dm-screen-design-system-multiselect">
      <input
        id={inputId}
        ref={inputRef}
        type='hidden'
        value={selected.join('|')}
      >
      </input>
      <div
        className="dm-screen-design-system-multiselect-input"
        onClick={() => {
          isOpen ? closeField() : setIsOpen(true);
        }}
        onKeyDown={(e) => {
          /**
           * We don't need to handle a closing state here, as focus is
           * forced to the first list item. A KeyDown tab event there
           * would close the dropdown and reset focus here.
           */
          if (e.key === 'Enter') {
            setIsOpen(true);
          }
        }}
        ref={pillInputRef}
        style={{ width }}
        tabIndex={0}
      >
        {
          selected.map((value) => {
            const onClose = () => {
              const dataItem = dataItems.find((item) => item.value === value) as MultiSelectDataItem;
              const newItems = selected.filter(item => item !== value);
              
              setSelected(newItems);

              if (onSelect) {
                onSelect(newItems.join('|'), dataItem, inputRef.current!);
              }
            };

            const item = dataItems.find((dataItem) => dataItem.value === value);

            return (
              <Pill
                closeFunc={onClose}
                color="black-50"
                key={value}
                text={item?.displayValue ?? ''}/>
            )
          })
        }
      </div>
      {
        isOpen ? (
          <div
            className="dm-screen-design-system-multiselect-wrapper"
            ref={multiselectRef}
            style={{
              maxHeight: `${maxHeight}px`,
              width: `${pillInputRef.current?.getBoundingClientRect().width ?? 0}px`
            }}>
            <ul
              className="dm-screen-design-system-multiselect-list">
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
    </div>
  );
};