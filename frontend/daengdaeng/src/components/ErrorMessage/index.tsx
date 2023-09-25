import React from 'react';

import styles from './index.module.scss';

const ErrorMessage = ({ children }: { children: any }) => {
  return <div className={styles.ErrorMessage}>{children}</div>;
};

export default ErrorMessage;
