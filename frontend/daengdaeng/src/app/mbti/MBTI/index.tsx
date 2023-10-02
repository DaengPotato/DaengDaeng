'use client';

import React, { useState } from 'react';

import styles from './index.module.scss';
import MBTITest from './MBTITest';
import PetSelect from './PetSelect';

import type { mbtiQuestion } from '@/src/types/mbti';
import type { PetDetail } from '@/src/types/pet';

type MBTIProps = {
  pets: PetDetail[] | undefined;
  questions: mbtiQuestion[] | undefined;
};

const MBTI = ({ pets, questions }: MBTIProps) => {
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
