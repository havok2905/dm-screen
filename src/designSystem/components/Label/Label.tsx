import classNames from 'classnames';

import './Label.css';

export interface LabelProps {
  error?: string;
  inputId: string;
  label?: string;
  required?: boolean;
}

export const Label = ({
  error,
  inputId,
  label,
  required
}: LabelProps) => {
  const classList = {
    'dm-screen-design-system-label': true,
    'dm-screen-design-system-label-error': error,
    'dm-screen-design-system-label-required': required
  }

  if (!label) return null;

  return (
    <label
      className={classNames(classList)}
      htmlFor={inputId}>
      {label}
    </label>
  );
};
