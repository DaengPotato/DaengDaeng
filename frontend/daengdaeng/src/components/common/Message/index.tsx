import React from 'react';

import { ssurround } from '@/src/styles/fonts';

import styles from './index.module.scss';

type MessageProps = {
  content?: string;
  isVisible?: boolean;
  isWarning?: boolean;
};

const Message = ({ content, isVisible, isWarning }: MessageProps) => {
  return (
    <div
      className={`${styles.MessageText} ${ssurround.className}`}
      style={{
        visibility: isVisible ? 'visible' : 'hidden',
        color: isWarning ? 'red' : 'black',
      }}
    >
      {content}
    </div>
    // <button
    //   type={type}
    //   onClick={onClick}
    //   disabled={isDisabled}
    //   className={`
    //       ${styles.Button}
    //       ${styles[size]}
    //       ${styles[`bg-${backgroundColor}`]}
    //       ${isDisabled ? styles.disabled : ''}
    //       ${ssurround.className}
    //     `}
    // >
    //   <span>{children}</span>
    //   <div className={styles['icon-container']}></div>
    //   {icon && <PawIcon fill={white} width={width} height={height} />}
    // </button>
  );
};

export default Message;
