import { createContext, useCallback, useRef, useState } from 'react';
import { ModalBase } from './ModalBase';

export const ModalsContext = createContext({
  addModal: () => {}
});

export const ModalsProvider = ({ children }) => {
  const modalsCount = useRef(0);
  const [ modals, setModals ] = useState([]);

  const deleteModal = useCallback((modalID) => {
    setModals((modals) => modals.filter((modal) => modal.modalID !== modalID ));
  }, []);

  const addModal = (modal) => {
    setModals((modals) => modals.concat({
      ...modal,

      modalID: modalsCount.current++,
      onModalExited: deleteModal
    }));
  };

//   useEffect(() => {
//     const removeListener = navigate.listen(() => {
//       setModals((modals) => modals.map((modal) => ({ ...modal, open: false })));
//     });

//     return () => {
//       removeListener();
//     };
//   }, []);

  return (
    <ModalsContext.Provider value={{ addModal }}>
      {children}

      {modals.map((modal) => (
        <ModalBase open key={modal.modalID} {...modal} />
      ))}
    </ModalsContext.Provider>
  );
};
