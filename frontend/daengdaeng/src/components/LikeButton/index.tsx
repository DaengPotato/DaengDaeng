import React from 'react';

import styles from './index.module.scss';

import { PawIcon } from '@/public/icons';
import { gray, primaryOrange } from '@/src/styles/colors';

type LikeButtonProps = {
  isLiked: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const LikeButton = ({ isLiked, onClick }: LikeButtonProps) => {
  return (
    <button onClick={onClick} className={styles.LikeButton}>
      {isLiked ? (
        <PawIcon fill={primaryOrange} width={25} height={25} />
      ) : (
        <PawIcon fill={gray} width={25} height={25} />
      )}
    </button>
  );
};

export default LikeButton;
