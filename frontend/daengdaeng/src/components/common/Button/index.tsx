import React from 'react';

import { PawIcon } from '@/public/icons';

import styles from './index.module.scss';

type ButtonProps = {
  children: React.ReactNode;
  isDisabled?: boolean;
  size: 'small' | 'medium' | 'large';
  backgroundColor: 'orange' | 'gray';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon: boolean;
};

const Button = ({
  children,
  isDisabled,
  size,
  backgroundColor,
  onClick,
  icon,
}: ButtonProps) => {
  const white = '#FFFFFF';

  let width = '2.4rem';
  let height = '2.4rem';
  if (size === 'small') {
    width = '1.8rem';
    height = '1.8rem';
  } else if (size === 'large') {
    width = '3.6rem';
    height = '3.6rem';
  }

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`
          ${styles.Button}
          ${styles[size]}
          ${styles[`bg-${backgroundColor}`]}
          ${isDisabled ? styles.disabled : ''}
        `}
    >
      <span>{children}</span>
      <div className={styles['icon-container']}></div>
      {icon && <PawIcon fill={white} width={width} height={height} />}
    </button>
  );
};

export default Button;
