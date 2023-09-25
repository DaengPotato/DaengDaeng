'use client';

import React from 'react';
import { useState } from 'react';

import AddPetButton from './AddPetButton';
import styles from './index.module.scss';
import PetCarousel from './PetCarousel';
import PetRegistForm from './PetRegistForm';

import type { PetDetail } from '@/src/types/pet';

import Modal from '@/src/components/common/Modal';

type MyPetsProps = {
  pets: PetDetail[];
};

const MyPets = ({ pets }: MyPetsProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // TODO: 내 강아지 데이터 fetch

  const handleClickAddPet = () => {
    // TODO: 모달 열기
    setIsOpen(true);
  };

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
      {isOpen && (
        <Modal setIsOpen={setIsOpen}>
          <PetRegistForm setIsOpen={setIsOpen} />
        </Modal>
      )}
    </div>
  );
};

export default MyPets;
