import React, { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import styles from './index.module.scss';
import PetSimpleCard from '../PetSimpleCard';

import type { PetDetail } from '@/src/types/pet';

import Button from '@/src/components/common/Button';
import Card from '@/src/components/common/Card';

type PetSelectProps = {
  selectedPet: PetDetail | undefined;
  pets: PetDetail[] | undefined;
  setSelectedPet: React.Dispatch<React.SetStateAction<PetDetail | undefined>>;
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
};

const PetSelect = ({
  selectedPet,
  pets,
  setSelectedPet,
  setStart,
}: PetSelectProps) => {
  const searchParams = useSearchParams();
  const [petIdParam, setPetIdParam] = useState<string | null>(null);

  useEffect(() => {
    setPetIdParam(searchParams.get('petId'));
  }, []);

  const handleClickPetCard = (pet: PetDetail) => {
    // eslint-disable-next-line no-null/no-null
    setPetIdParam(null);
    setSelectedPet(pet);
  };

  const handleClickStartButton = () => {
    if (!selectedPet) return;
    setStart(true);
  };

  return (
    <div className={styles.PetSelect}>
      <div className={styles.title}>댕BTI를 검사할 반려견을 선택해주세요.</div>
      <div className={styles.petList}>
        {pets &&
          pets.map((pet: PetDetail) => {
            const petId = petIdParam ? parseInt(petIdParam) : undefined;
            if (petId === pet.petId) {
              setSelectedPet(pet);
            }
            return (
              <Card
                key={pet.petId}
                isSelected={
                  pet.petId === selectedPet?.petId || petId === pet.petId
                }
                onClick={() => handleClickPetCard(pet)}
              >
                <PetSimpleCard pet={pet} />
              </Card>
            );
          })}
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

export default PetSelect;
