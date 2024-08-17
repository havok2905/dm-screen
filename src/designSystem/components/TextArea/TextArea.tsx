import React, {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  RefCallback
} from 'react';

import classNames from 'classnames';

import { Label } from '../Label';

import './TextArea.css';

export interface TextAreaProps {
  error?: string;
  full?: boolean;
  inputId: string;
  inputName: string;
  label?: string;
  onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: FocusEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  onKeyUp?: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  passedRef?: RefCallback<HTMLTextAreaElement>;
  required?: boolean;
  value?: string;
}

// TODO: Something to hush the react warning in the console :(
// because we are using the ref that is passed down in props,
// not the ref created in forwardRef.
// If we remove forwardRef here, the warnings are worse. (3x!)
export const TextArea = React.forwardRef(({
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
  value,
  passedRef,
}: TextAreaProps) => {
  const handleOnBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
    if (onBlur) {
      onBlur(e);
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  const handleOnFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleOnKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  const handleOnKeyUp = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (onKeyUp) {
      onKeyUp(e);
    }
  };

  const classList = {
    'dm-screen-design-system-text-area': true,
    'dm-screen-design-system-text-area-error': error,
    'dm-screen-design-system-text-area-full': full
  }

  return (
    <>
      <Label
        error={error}
        inputId={inputId}
        label={label}
        required={required}
      />
      <textarea
        className={classNames(classList)}
        id={inputId}
        name={inputName}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
        onFocus={handleOnFocus}
        onKeyDown={handleOnKeyDown}
        onKeyUp={handleOnKeyUp}
        ref={passedRef}
        required={required}
        value={value}
      ></textarea>
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

TextArea.displayName = "TextArea";