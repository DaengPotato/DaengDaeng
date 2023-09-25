'use client';

import React, { useState } from 'react';

import { ReloadIcon } from '@/public/icons';

import styles from './index.module.scss';
import PlaceCarousel from '../../../../components/PlaceCarousel';

import type { Place } from '@/src/types/place';

type RecommendedPlaceListProps = {
  isPet: boolean;
  name: string[] | string;
  places: Place[];
};

const RecommendedPlaceList = ({
  isPet,
  name,
  places,
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
      <PlaceCarousel places={places} startIndex={currentPlaceIndex} />
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
