import React from 'react';

import { PetSimple } from '@/src/types/pet';
import { Place } from '@/src/types/trip';

import styles from './index.module.scss';
import PlaceCarousel from '../PlaceCarousel';

type PetSpecificPlacesProps = {
  pet: PetSimple;
  places: Place[];
};

const PetSpecificPlaces = ({ pet, places }: PetSpecificPlacesProps) => {
  return (
    <div className={styles.PetSpecificPlaces}>
      <div className={styles.header}>
        <span className={styles.petName}>{pet.name}</span>에게 추천하는 여행지
      </div>
      <PlaceCarousel places={places} />
    </div>
  );
};

export default PetSpecificPlaces;
