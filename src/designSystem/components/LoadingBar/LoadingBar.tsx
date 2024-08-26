import classNames from 'classnames';

import './LoadingBar.css';

export interface LoadingBarProps {
  isLoading: boolean;
  isSuccess: boolean;
}

export const LoadingBar = ({
  isLoading,
  isSuccess
}: LoadingBarProps) => {
  const classList = {
    'loading-bar': true,
    'loading-bar-is-loading': isLoading,
    'loading-bar-is-success': isSuccess
  };

  return (
    <div className="loading-bar-container">
      <div className={classNames(classList)}>
      </div>
    </div>
  )
};
