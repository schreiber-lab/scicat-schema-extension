import { useEffect, useState } from 'react';
import { ErrorBoundary } from '../ErrorBoundary';

export const ModalBase = ({
  modalID,
  open,
  payload = {},
  ModalComponent,
  DialogProps,
  onModalResolved = () => {},
  onModalRejected = () => {},
  onModalExited
}) => {
  const [ isModalOpen, setIsModalOpen ] = useState(open);
  const [ isModalEntered, setIsModalEntered ] = useState(false);

  const handleModalEntered = () => {
    setIsModalEntered(true);
  };

  const handleModalExited = () => {
    onModalExited(modalID);
  };

  const handleModalResolve = (payload) => {
    setIsModalOpen(false);
    onModalResolved(payload);
  };

  const handleModalReject = (reason) => {
    setIsModalOpen(false);
    onModalRejected(reason);
  };

  useEffect(() => {
    setIsModalOpen(open);
  }, [ open ]);

  return (
    <ErrorBoundary>
      <ModalComponent
        isModalEntered={isModalEntered}
        payload={payload}
        DialogProps={{
          fullWidth: true,

          ...DialogProps,

          open: isModalOpen,
          onClose: handleModalReject,
          onExited: handleModalExited,
          onEntered: handleModalEntered
        }}
        handleModalResolve={handleModalResolve}
        handleModalReject={handleModalReject}
      />
    </ErrorBoundary>
  );
};
