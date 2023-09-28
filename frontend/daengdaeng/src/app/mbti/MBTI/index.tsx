'use client';

import React, { useState } from 'react';

import styles from './index.module.scss';
import MBTITest from './MBTITest';
import PetSelect from './PetSelect';

import type { mbtiQuestion } from '@/src/types/mbti';
import type { PetDetail } from '@/src/types/pet';

import PetExample from '@/public/images/pet-example.webp';

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

type MBTIProps = {
  questions: mbtiQuestion[];
};

const MBTI = ({ questions }: MBTIProps) => {
  const [selectedPet, setSelectedPet] = useState<PetDetail | undefined>(
    undefined,
  );
  const [start, setStart] = useState<boolean>(false);

  return (
    <div className={styles.MBTI}>
      {!start ? (
        <PetSelect
          pets={pets}
          selectedPet={selectedPet}
          setSelectedPet={setSelectedPet}
          setStart={setStart}
        />
      ) : (
        <>
          {selectedPet && <MBTITest pet={selectedPet} questions={questions} />}
        </>
      )}
    </div>
  );
};

export default MBTI;
