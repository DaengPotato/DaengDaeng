'use client';

import React, { useState } from 'react';

import styles from './index.module.scss';
import PetSimpleCard from './PetSimpleCard';

import type { PetDetail } from '@/src/types/pet';

import PetExample from '@/public/images/pet-example.webp';
import Button from '@/src/components/common/Button';
import Card from '@/src/components/common/Card';

// TODO: 내 반려견 리스트 가져오기 (state?)

// dummy data
const pets: PetDetail[] = Array.from({ length: 8 }, (_, i) => ({
  petId: i + 1,
  name: `Pet ${i + 1}`,
  birth: '2020.03.20',
  gender: true,
  weight: 5,
  image: PetExample,
  mbtiId: 1,
}));

const MBTITest = () => {
  const [selectedPet, setSelectedPet] = useState<PetDetail | undefined>(
    undefined,
  );

  const handleClickPetCard = (pet: PetDetail) => {
    setSelectedPet(pet);
  };

  const handleClickStartButton = () => {
    console.log(selectedPet);
  };

  return (
    <div className={styles.MBTITest}>
      <div className={styles.title}>댕BTI를 검사할 반려견을 선택해주세요.</div>
      <div className={styles.petList}>
        {pets.map((pet: PetDetail) => (
          <Card
            key={pet.petId}
            isSelected={pet.petId === selectedPet?.petId}
            onClick={() => handleClickPetCard(pet)}
          >
            <PetSimpleCard pet={pet} />
          </Card>
        ))}
      </div>
      <div className={styles.startButton}>
        <Button
          type="button"
          size="medium"
          backgroundColor="orange"
          icon={true}
          onClick={handleClickStartButton}
        >
          검사 시작하기
        </Button>
      </div>
    </div>
  );
};

export default MBTITest;
