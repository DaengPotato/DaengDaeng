'use client';
import React from 'react';

import Image from 'next/image';

import { EditIcon } from '@/public/icons';
import Button from '@/src/components/common/Button';

import styles from './index.module.scss';

import type { PetDetail } from '@/src/types/pet';

type PetCardProps = {
  pet: PetDetail;
};

// TODO: mbti, 나이, 성별 변환 후 출력
const PetCard = ({ pet }: PetCardProps) => {
  const handleEditClick = () => {
    console.log(pet);
  };

  return (
    <div className={styles.PetCard} onClick={handleEditClick}>
      <button className={styles.editIcon}>
        <EditIcon fill={'#000000'} width={20} height={20} />
      </button>
      <div className={styles.petName}>{pet.name}</div>
      <div className={styles.petMbti}>{pet.mbtiId}</div>
      <div className={styles.petImg}>
        <Image src={pet.image} alt="pet img" fill={true} />
      </div>
      <div className={styles.petDetail}>
        {pet.birth} | {pet.gender} | {pet.weight}
      </div>
      <div className={styles.petPlaceBtn}>
        <Button size="small" backgroundColor="orange" icon={true}>
          맞춤 여행지 추천
        </Button>
      </div>
    </div>
  );
};

export default PetCard;
