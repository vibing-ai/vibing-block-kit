import React, { useState, createContext, useContext } from 'react';
import { BlockModal } from './BlockModal';

interface ModalContextType {
  openModal: (props: ModalProps) => void;
  closeModal: () => void;
}

interface ModalProps {
  title?: string;
  content: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  position?: 'center' | 'top' | 'right' | 'bottom' | 'left';
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalContainer');
  }
  return context;
};

/**
 * Container for managing modal state and rendering
 */
export const ModalContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    props: ModalProps | null;
  }>({
    isOpen: false,
    props: null,
  });

  const openModal = (props: ModalProps) => {
    setModalState({
      isOpen: true,
      props,
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      props: null,
    });
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modalState.props && (
        <BlockModal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          title={modalState.props.title}
          size={modalState.props.size}
          position={modalState.props.position}
        >
          {modalState.props.content}
        </BlockModal>
      )}
    </ModalContext.Provider>
  );
}; 