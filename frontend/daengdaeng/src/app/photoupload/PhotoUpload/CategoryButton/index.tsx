import React from 'react';

import { ssurround } from '@/src/styles/fonts';

import styles from './index.module.scss';

type CategoryButtonProps = {
  content: string;
  backgroundColor: 'orange' | 'gray';
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const CategoryButton = ({
  content,
  backgroundColor,
  onClick,
}: CategoryButtonProps) => {
  return (
    <div
      onClick={onClick}
      className={`
          ${styles.Button}
          ${styles[`bg-${backgroundColor}`]}
          ${ssurround.className}
        `}
    >
      {content}
    </div>
  );
};

export default CategoryButton;
