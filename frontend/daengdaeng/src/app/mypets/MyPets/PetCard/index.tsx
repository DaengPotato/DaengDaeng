'use client';
import React from 'react';

import Image from 'next/image';

import styles from './index.module.scss';

import type { PetDetail } from '@/src/types/pet';

<<<<<<<< HEAD:frontend/daengdaeng/src/app/mypets/MyPets/PetCard/index.tsx
import { EditIcon } from '@/public/icons';
import Button from '@/src/components/common/Button';
========
>>>>>>>> 4d99e5a (rename: container 폴더 삭제 후 해당하는 페이지 아래로 옮김):frontend/daengdaeng/src/app/mypets/myPets/PetCard/index.tsx

type PetCardProps = {
  pet: PetDetail;
};

// TODO: mbti, 나이, 성별 변환 후 출력
const PetCard = ({ pet }: PetCardProps) => {
  const handleEditClick = () => {
    console.log(pet);
  };

  return (
    <div className={styles.PetCard}>
      <button className={styles.editIcon} onClick={handleEditClick}>
        <EditIcon fill={'#000000'} width={20} height={20} />
      </button>
      <div>
        <div className={styles.petName}>{pet.name}</div>
        <div className={styles.petMbti}>{pet.mbtiId}</div>
        <div className={styles.petImg}>
          <Image src={pet.image} alt="pet img" fill={true} />
        </div>
        <div className={styles.petDetail}>
          {pet.birth} | {pet.gender} | {pet.weight}
        </div>
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
