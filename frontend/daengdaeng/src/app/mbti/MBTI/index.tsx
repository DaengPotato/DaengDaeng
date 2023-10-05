'use client';

import React, { useState } from 'react';

import styles from './index.module.scss';
import MBTITest from './MBTITest';
import PetSelect from './PetSelect';
import PetRegistForm from '../../mypets/MyPets/PetRegistForm';

import type { mbtiQuestion } from '@/src/types/mbti';
import type { PetDetail } from '@/src/types/pet';

import Button from '@/src/components/common/Button';
import Modal from '@/src/components/common/Modal';

type MBTIProps = {
  pets: PetDetail[] | undefined;
  questions: mbtiQuestion[] | undefined;
  mutatePets: any;
};

const MBTI = ({ pets, questions, mutatePets }: MBTIProps) => {
  const [selectedPet, setSelectedPet] = useState<PetDetail | undefined>(
    undefined,
  );
  const [start, setStart] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleFormOpen = () => {
    setIsOpen(true);
  };

  const handleFormClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.MBTI}>
      {pets && (
        <>
          {pets?.length > 0 ? (
            <>
              {!start ? (
                <PetSelect
                  pets={pets}
                  selectedPet={selectedPet}
                  setSelectedPet={setSelectedPet}
                  setStart={setStart}
                />
              ) : (
                <>
                  {selectedPet && (
                    <MBTITest pet={selectedPet} questions={questions} />
                  )}
                </>
              )}
            </>
          ) : (
            <div className={styles.nodata}>
              <div className={styles.nodataTitle}>반려견을 등록해주세요!</div>
              <div className={styles.nodataButton}>
                <Button
                  size={'medium'}
                  backgroundColor={'orange'}
                  icon={true}
                  onClick={handleFormOpen}
                >
                  반려견 등록하기
                </Button>
              </div>
            </div>
          )}
        </>
      )}
      {isOpen && (
        <Modal closeModal={handleFormClose}>
          <PetRegistForm closeForm={handleFormClose} mutate={mutatePets} />
        </Modal>
      )}
    </div>
  );
};

export default MBTI;
