import React from 'react'

import { PawIcon } from '@/public/icons'

import styles from './Button.module.scss'

type ButtonProps = {
  children: React.ReactNode
  isDisabled?: boolean
  size: 'small' | 'medium' | 'large'
  backgroundColor: 'orange' | 'gray'
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  icon: boolean
}

const Button = ({
  children,
  isDisabled,
  size,
  backgroundColor,
  onClick,
  icon,
}: ButtonProps) => {
  const white = '#FFFFFF'

  let width = '2rem'
  let height = '2rem'
  if (size === 'small') {
    width = '1.7rem'
    height = '1.7rem'
  } else if (size === 'medium') {
    width = '2rem'
    height = '2rem'
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
  )
}

export default Button
