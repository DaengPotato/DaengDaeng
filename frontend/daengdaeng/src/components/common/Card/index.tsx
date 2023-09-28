import React from 'react';

import styles from './index.module.scss';

type CardProps = {
  children: React.ReactNode;
  isSelected: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const Card = ({ children, isSelected, onClick }: CardProps) => {
  return (
    <div
      className={`${styles.Card} ${isSelected ? `${styles.selected}` : ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
