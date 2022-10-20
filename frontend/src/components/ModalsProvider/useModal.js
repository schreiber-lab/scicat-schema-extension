import { useContext } from 'react';
import { ModalsContext } from './ModalsProvider';

export const useModal = () => {
  const { addModal } = useContext(ModalsContext);

  return {
    openModal: (ModalComponent, props) => {
      return addModal({ ModalComponent, ...props });
    }
  };
};
