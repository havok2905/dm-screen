import {
  ChangeEvent,
  FocusEvent
} from 'react';
import classNames from 'classnames';
import './Input.css';

export interface InputProps {
  full?: boolean;
  inputId: string;
  inputName: string;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  value?: string;
}

export const Input = ({
  full = false,
  inputId,
  inputName,
  onBlur,
  onChange,
  onFocus,
  value = ''
}: InputProps) => {
  const handleOnBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(e);
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  const handleOnFocus = (e: FocusEvent<HTMLInputElement>) => {
    if (onFocus) {
      onFocus(e);
    }
  };

  const classList = {
    'dm-screen-design-system-input': true,
    'dm-screen-design-system-input-full': full
  }

  return (
    <input
      className={classNames(classList)}
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
