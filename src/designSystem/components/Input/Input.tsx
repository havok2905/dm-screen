import React, {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  RefCallback
} from 'react';

import classNames from 'classnames';

import { Label } from '../Label';

import './Input.css';

export interface InputProps {
  error?: string;
  full?: boolean;
  inputId: string;
  inputName: string;
  label?: string;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => void;
  passedRef?: RefCallback<HTMLInputElement>;
  required?: boolean;
  type?: 'text' | 'number';
  value?: string | number;
}

// TODO: Something to hush the react warning in the console :(
// because we are using the ref that is passed down in props,
// not the ref created in forwardRef.
// If we remove forwardRef here, the warnings are worse. (3x!)
export const Input = React.forwardRef(({
  error,
  full = false,
  inputId,
  inputName,
  label,
  onBlur,
  onChange,
  onFocus,
  onKeyDown,
  onKeyUp,
  required,
  type = 'text',
  value,
  passedRef,
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

  const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  const handleOnKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (onKeyUp) {
      onKeyUp(e);
    }
  };

  const classList = {
    'dm-screen-design-system-input': true,
    'dm-screen-design-system-input-error': error,
    'dm-screen-design-system-input-full': full
  }

  return (
    <>
      <Label
        error={error}
        inputId={inputId}
        label={label}
        required={required}
      />
      <input
        className={classNames(classList)}
        data-test-id="dm-screen-design-system-input"
        id={inputId}
        name={inputName}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
        onFocus={handleOnFocus}
        onKeyDown={handleOnKeyDown}
        onKeyUp={handleOnKeyUp}
        ref={passedRef}
        required={required}
        type={type}
        value={value}
      />
      {
        error ? (
          <p
            className="dm-screen-design-system-input-error-message"
            role="alert">
            {error}
          </p>
        ): null
      }
    </>
  )
});

Input.displayName = "Input";