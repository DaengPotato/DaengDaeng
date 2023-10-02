import React, { useState } from 'react';

import Image from 'next/image';

import styles from './index.module.scss';
import { gray, primaryOrange } from '../../../../styles/colors';

import type { PetDetail } from '../../../../types/pet';

import { PawIcon } from '@/public/icons';

type PetProps = {
  pet: PetDetail;
};

const PetSimpleCard = ({ pet }: PetProps) => {
  const [imgError, setImgError] = useState<boolean>(false);

  return (
    <div className={styles.PetCard}>
      <div className={styles.header}>
        <div className={styles.name}>{pet.name}</div>
        <PawIcon fill={primaryOrange} width={20} height={20} />
      </div>
      <div className={styles.petImage}>
        {!imgError && typeof pet.image === 'string' ? (
          <Image
            src={pet.image}
            alt="pet img"
            fill={true}
            blurDataURL={pet.image}
            placeholder="blur"
            onError={() => setImgError(true)}
          />
        ) : (
          <PawIcon fill={gray} width={100} height={100} />
        )}
      </div>
    </div>
  );
};

export default PetSimpleCard;
