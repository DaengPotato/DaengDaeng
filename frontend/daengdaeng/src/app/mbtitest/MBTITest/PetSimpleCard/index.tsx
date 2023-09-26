import React from 'react';

import Image from 'next/image';

import styles from './index.module.scss';
import { primaryOrange } from '../../../../styles/colors';

import type { PetDetail } from '../../../../types/pet';

import { PawIcon } from '@/public/icons';

type PetProps = {
  pet: PetDetail;
};

const PetSimpleCard = ({ pet }: PetProps) => {
  return (
    <div className={styles.PetCard}>
      <div className={styles.header}>
        <div className={styles.name}>{pet.name}</div>
        <PawIcon fill={primaryOrange} width={20} />
      </div>
      <div className={styles.petImage}>
        <Image src={pet.image} alt="pet image" width={120} height={120} />
      </div>
    </div>
  );
};

export default PetSimpleCard;
