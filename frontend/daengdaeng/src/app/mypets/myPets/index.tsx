'use client';

import React from 'react';

import AddPetButton from './AddPetButton';
import styles from './index.module.scss';
import PetCarousel from './PetCarousel';

import type { PetDetail } from '@/src/types/pet';

type MyPetsProps = {
  pets: PetDetail[];
};

const MyPets = ({ pets }: MyPetsProps) => {
  // TODO: 내 강아지 데이터 fetch

  const handleClickAddPet = () => {};

  return (
    <div>
      <div className={styles.myPetList}>
        <div className={styles.header}>
          <div className={styles.addBtn}>
            <AddPetButton onClick={handleClickAddPet} />
          </div>
        </div>
        <PetCarousel
          pets={pets}
          options={{ dragFree: true, containScroll: 'trimSnaps' }}
        />
      </div>
    </div>
  );
};

export default MyPets;
