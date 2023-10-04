import React from 'react';

import styles from './index.module.scss';

type ModalProps = {
  children: React.ReactNode;
  closeModal: () => void;
};

const Modal = ({ children, closeModal }: ModalProps) => {
  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <>
      <div className={styles.background} onClick={handleCloseModal}></div>
      <div className={styles.Modal}>{children}</div>
    </>
  );
};

export default Modal;
