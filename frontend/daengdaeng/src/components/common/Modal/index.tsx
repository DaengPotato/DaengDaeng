import React from 'react';

import styles from './index.module.scss';

type ModalProps = {
  children: React.ReactNode;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal = ({ children, setIsOpen }: ModalProps) => {
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className={styles.background} onClick={handleCloseModal}></div>
      <div className={styles.Modal}>{children}</div>
    </>
  );
};

export default Modal;
