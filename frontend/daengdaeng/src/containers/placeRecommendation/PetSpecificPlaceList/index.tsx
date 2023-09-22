import React, { useState } from 'react';

import { ReloadIcon } from '@/public/icons';

import styles from './index.module.scss';
import PlaceCarousel from '../PlaceCarousel';

import type { Place } from '@/src/types/place';

type PetSpecificPlacesProps = {
  petName: string;
  places: Place[];
};

const PetSpecificPlaceList = ({ petName, places }: PetSpecificPlacesProps) => {
  const [currentPlaceIndex, setCurrentPlaceIndex] = useState<number>(0);

  const handleReloadClick = () => {
    setCurrentPlaceIndex((prev) => (prev + 5) % places.length);
  };

  return (
    <div className={styles.PetSpecificPlaces}>
      <div className={styles.header}>
        <span className={styles.petName}>{petName}</span>에게 추천하는 여행지
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

export default PetSpecificPlaceList;
