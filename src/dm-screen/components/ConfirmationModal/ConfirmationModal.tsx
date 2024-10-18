import {
  Button,
  Modal
} from '@designSystem/components';

import './ConfirmationModal.css';

interface ConfirmationModalProp {
  isOpen: boolean;
  message?: string;
  onCancel: () => void;
  onOk: () => void;
}

export const ConfirmationModal = ({
  isOpen,
  message,
  onCancel,
  onOk
}: ConfirmationModalProp) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onCancel();
      }}
      portalElement={document.body}>
      {
        message ? (
          <p>
            {message}
          </p>
        ) : (
          <p>
            Are you sure you would like to continue?
          </p>
        )
      }
      <div className="confirmation-modal-buttons">
        <Button
          buttonText="Yes"
          onClick={() => {
            onOk();
          }}
        />
        <Button
          buttonText="Cancel"
          onClick={() => {
            onCancel();
          }}
        />
      </div>
    </Modal>
  );
};
