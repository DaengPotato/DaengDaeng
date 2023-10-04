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
      // 1. 주어진 날짜 문자열을 Date 객체로 파싱
      const birthDate = new Date(pet.birth);

      // 2. 현재 날짜를 가져오기
      const currentDate = new Date();

      // 3. 두 날짜 간의 연도 차이 계산
      const yearDifference =
        currentDate.getFullYear() - birthDate.getFullYear();

      // 4. 나이 계산
      // 현재 날짜의 월과 주어진 날짜의 월을 비교하여 아직 생일이 오지 않았을 경우 연도에서 1을 빼줍니다.
      if (
        currentDate.getMonth() < birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() &&
          currentDate.getDate() < birthDate.getDate())
      ) {
        setAge(yearDifference - 1);
      } else {
        setAge(yearDifference);
      }
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
