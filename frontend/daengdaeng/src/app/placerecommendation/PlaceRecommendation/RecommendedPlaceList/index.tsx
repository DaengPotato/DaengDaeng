'use client';

import React, { useState } from 'react';

import styles from './index.module.scss';

import type { PetSpecificPlaces, Place } from '@/src/types/place';

import { ReloadIcon } from '@/public/icons';
import PlaceCarousel from '@/src/components/PlaceCarousel';

type RecommendedPlaceListProps = {
  isPet: boolean;
  name: string[] | string;
  petSpecificPlaces?: PetSpecificPlaces[];
  places: Place[];
  mutate: any;
};

const RecommendedPlaceList = ({
  isPet,
  name,
  petSpecificPlaces,
  places,
  mutate,
}: RecommendedPlaceListProps) => {
  const [currentPlaceIndex, setCurrentPlaceIndex] = useState<number>(0);

  const handleReloadClick = () => {
    setCurrentPlaceIndex((prev) => (prev + 5) % places.length);
  };

  return (
    <div className={styles.RecommendedPlaceList}>
      <div className={styles.header}>
        {isPet ? (
          typeof name === 'string' ? (
            <>
              <span className={styles.name}>{name}</span>에게 추천하는 여행지
            </>
          ) : (
            <>
              <span className={styles.name}>{name.join(', ')}</span>에게
              추천하는 여행지
            </>
          )
        ) : (
          <>
            <span className={styles.name}>{name}</span>님에게 추천하는 여행지
          </>
        )}
      </div>
      <PlaceCarousel
        isLikedPlace={false}
        petSpecificPlaces={petSpecificPlaces}
        places={places}
        startIndex={currentPlaceIndex}
        mutate={mutate}
      />
      <div className={styles.reloadContainer}>
        <button onClick={handleReloadClick} className={styles.reloadBtn}>
          <ReloadIcon width={20} height={20} />
          다시 추천 받기
        </button>
      </div>
    </div>
  );
};

export default RecommendedPlaceList;
