import React from 'react';

import styles from './index.module.scss';
import PetSimpleCard from '../PetSimpleCard';

import type { PetDetail } from '@/src/types/pet';

import Button from '@/src/components/common/Button';
import Card from '@/src/components/common/Card';

type PetSelectProps = {
  selectedPet: PetDetail | undefined;
  pets: PetDetail[];
  setSelectedPet: React.Dispatch<React.SetStateAction<PetDetail | undefined>>;
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
};

const PetSelect = ({
  selectedPet,
  pets,
  setSelectedPet,
  setStart,
}: PetSelectProps) => {
  const handleClickPetCard = (pet: PetDetail) => {
    setSelectedPet(pet);
  };

  const handleClickStartButton = () => {
    if (!selectedPet) return;
    setStart(true);
  };

  return (
    <>
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
    </>
  );
};

export default PetSelect;
