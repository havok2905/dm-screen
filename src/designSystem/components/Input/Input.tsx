import {
  ChangeEvent,
  FocusEvent
} from 'react';

import './Input.css';

export interface InputProps {
  inputId: string;
  inputName: string;
  onBlur?: (e: FocusEvent) => void;
  onChange?: (e: ChangeEvent) => void;
  onFocus?: (e: FocusEvent) => void;
  value?: string;
}

export const Input = ({
  inputId,
  inputName,
  onBlur,
  onChange,
  onFocus,
  value = ''
}: InputProps) => {
  const handleOnBlur = (e: FocusEvent) => {
    if (onBlur) {
      onBlur(e);
    }
  };

  const handleOnChange = (e: ChangeEvent) => {
    if (onChange) {
      onChange(e);
    }
  };

  const handleOnFocus = (e: FocusEvent) => {
    if (onFocus) {
      onFocus(e);
    }
  };

  return (
    <input
      className="dm-screen-design-system-input"
      id={inputId}
      name={inputName}
      onBlur={handleOnBlur}
      onChange={handleOnChange}
      onFocus={handleOnFocus}
      type="text"
      value={value}
    />
  )
};
