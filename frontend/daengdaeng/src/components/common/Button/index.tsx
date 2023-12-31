import React from 'react';

import styles from './index.module.scss';

import { PawIcon } from '@/public/icons';
import { white } from '@/src/styles/colors';
import { ssurround } from '@/src/styles/fonts';

type ButtonProps = {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  isDisabled?: boolean;
  size: 'small' | 'medium' | 'large';
  backgroundColor: 'orange' | 'gray';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon: boolean;
};

const Button = ({
  children,
  type,
  isDisabled,
  size,
  backgroundColor,
  onClick,
  icon,
}: ButtonProps) => {
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
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`
          ${styles.Button}
          ${styles[size]}
          ${styles[`bg-${backgroundColor}`]}
          ${isDisabled ? styles.disabled : ''}
          ${ssurround.className}
        `}
    >
      <span>{children}</span>
      {icon && <PawIcon fill={white} width={width} height={height} />}
    </button>
  );
};

export default Button;
