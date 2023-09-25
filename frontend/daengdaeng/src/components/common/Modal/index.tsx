import React from 'react';

import styles from './index.module.scss';

const Modal = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.Modal}>{children}</div>;
};

export default Modal;
