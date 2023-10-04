'use client';
import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import styles from './index.module.scss';

import type { PetDetail } from '@/src/types/pet';

import { EditIcon, PawIcon } from '@/public/icons';
import Button from '@/src/components/common/Button';
import { mbti } from '@/src/constants/mbti';
import { gray } from '@/src/styles/colors';
import { clacAge } from '@/src/utils/date';

type PetCardProps = {
  pet: PetDetail;
  setEditingPet?: React.Dispatch<React.SetStateAction<PetDetail | undefined>>;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const PetCard = ({ pet, setEditingPet, setIsOpen }: PetCardProps) => {
  const router = useRouter();

  const [age, setAge] = useState<number>(0);
  const [imgError, setImgError] = useState<boolean>(false);

  const handleEditClick = () => {
    console.log(pet);
    if (setEditingPet) {
      setEditingPet(pet);
    }
    if (setIsOpen) {
      setIsOpen(true);
    }
  };

  const handleClickRecommend = () => {
    router.push('/placerecommendation');
  };

  const handleClickMBTI = () => {
    router.push(`/mbti?petId=${pet.petId}`);
  };

  useEffect(() => {
    if (pet) {
      setAge(clacAge(pet.birth));
    }
  }, [pet]);

  return (
    <div className={styles.PetCard}>
      <button className={styles.editIcon} onClick={handleEditClick}>
        <EditIcon fill={'#000000'} width={20} height={20} />
      </button>
      <div>
        <div className={styles.petName}>{pet.name}</div>
        <div className={styles.petMbti}>
          {pet.mbtiId ? mbti[pet.mbtiId - 1] : 'mbti 정보 없음'}
        </div>
        <div className={styles.petImg}>
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
        <div className={styles.petDetail}>
          {age}살 | {pet.gender ? '여자' : '남자'} | {pet.weight}kg
        </div>
      </div>
      <div className={styles.petPlaceBtn}>
        {pet.mbtiId ? (
          <Button
            size="small"
            backgroundColor="orange"
            icon={true}
            onClick={handleClickRecommend}
          >
            맞춤 여행지 추천
          </Button>
        ) : (
          <Button
            size="small"
            backgroundColor="orange"
            icon={true}
            onClick={handleClickMBTI}
          >
            댕BTI 검사하기
          </Button>
        )}
      </div>
    </div>
  );
};

export default PetCard;
