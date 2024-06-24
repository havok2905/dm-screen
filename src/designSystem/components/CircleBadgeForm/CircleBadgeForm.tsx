import { ChangeEvent } from 'react';
import classNames from 'classnames';

import './CircleBadgeForm.css';

export interface CircleBadgeFormProps {
  color: 'blue' | 'green' | 'orange';
  onChange: (value: string | null) => void;
  onValidate: (value: string) => boolean;
  value: string;
}

export const CircleBadgeForm = ({
  color,
  onChange,
  onValidate,
  value
}: CircleBadgeFormProps) => {
  const classList = {
    'dm-screen-design-system-circle-badge-form': true,
    'dm-screen-design-system-circle-badge-form-stroke-blue': color === 'blue',
    'dm-screen-design-system-circle-badge-form-stroke-green': color === 'green',
    'dm-screen-design-system-circle-badge-form-stroke-orange': color === 'orange'
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;
    const isValid = onValidate(value);
    onChange(isValid ? value : null);
  }

  return (
    <div
      className={classNames(classList)}>
      <input
        onChange={handleOnChange}
        type="text"
        value={value}>
      </input>
    </div>
  );
};