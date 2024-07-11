import './ErrorDisplay.css';

export interface ErrorDisplayProps {
  errorTitle?: string;
  message?: string;
}

export const ErrorDisplay = ({
  errorTitle,
  message,
}: ErrorDisplayProps) => {
  return (
    <div className="dm-screen-design-system-error-display">
      <h2>
        {errorTitle ?? 'An error ocurred'}
      </h2>
      {
        message ? (
          <p>
            {message}
          </p>
        ) : null
      }
    </div>
  )
}