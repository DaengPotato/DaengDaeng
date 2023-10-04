'use client';

import React from 'react';
import { useState } from 'react';

import { useRouter } from 'next/navigation';

import AddPetButton from './AddPetButton';
import styles from './index.module.scss';
import PetCarousel from './PetCarousel';
import PetRegistForm from './PetRegistForm';

import type { PetDetail } from '@/src/types/pet';
import type { Place } from '@/src/types/place';

import Button from '@/src/components/common/Button';
import Modal from '@/src/components/common/Modal';
import PlaceCarousel from '@/src/components/PlaceCarousel';

type MyPetsProps = {
  pets: PetDetail[] | undefined;
  places: Place[] | undefined;
  mutatePets: any;
  mutatePlaces: any;
};

const MyPets = ({ pets, places, mutatePets, mutatePlaces }: MyPetsProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClickAddPet = () => {
    setIsOpen(true);
  };

  const handleClickPlaceSearch = () => {
    router.push('/placesearch');
  };

  return (
    <div>
      {!pets || pets.length === 0 ? (
        <div className={styles.nodata}>
          <div className={styles.nodataTitle}>반려견을 등록해주세요!</div>
          <div className={styles.nodataButton}>
            <Button
              size={'medium'}
              backgroundColor={'orange'}
              icon={true}
              onClick={handleClickAddPet}
            >
              반려견 등록하기
            </Button>
          </div>
        </div>
      ) : (
        <div className={styles.myPetList}>
          <div className={styles.header}>
            <div className={styles.addBtn}>
              <AddPetButton onClick={handleClickAddPet} />
            </div>
          </div>
          <PetCarousel
            pets={pets}
            options={{
              dragFree: true,
              align: 'center',
              containScroll: false,
            }}
          />
        </div>
      )}
      {!places || places.length === 0 ? (
        <div className={styles.nodata}>
          <div className={styles.nodataTitle}>찜한 여행지가 없어요!</div>
          <div className={styles.nodataButton}>
            <Button
              size={'medium'}
              backgroundColor={'orange'}
              icon={true}
              onClick={handleClickPlaceSearch}
            >
              여행지 구경하기
            </Button>
          </div>
        </div>
      ) : (
        <div className={styles.myPlaceList}>
          <div className={styles.header}>
            <span className={styles.title}>내가 찜한 여행지</span>
            <button className={styles.moreBtn}>더보기</button>
          </div>
          <PlaceCarousel
            places={places}
            options={{
              dragFree: true,
              align: 'center',
              containScroll: false,
            }}
            mutate={mutatePlaces}
          />
        </div>
      )}
      {isOpen && (
        <Modal setIsOpen={setIsOpen}>
          <PetRegistForm setIsOpen={setIsOpen} mutate={mutatePets} />
        </Modal>
      )}
    </div>
  );
};

export default MyPets;
