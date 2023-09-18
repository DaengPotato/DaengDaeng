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
      <div className={styles.header}>우리 {pet.name}에게 어울리는 여행지</div>
      <PlaceCarousel places={places} />
    </div>
  );
};

export default PetSpecificPlaces;
