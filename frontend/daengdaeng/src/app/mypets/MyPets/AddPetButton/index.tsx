import React from 'react';

import styles from './index.module.scss';

import { AddIcon } from '@/public/icons';
import { white } from '@/src/styles/colors';

type AddPetButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const AddPetButton = ({ onClick }: AddPetButtonProps) => {
  return (
    <button className={styles.AddPetButton} onClick={onClick}>
      <AddIcon width={20} height={20} fill={white} />
    </button>
  );
};

export default AddPetButton;
