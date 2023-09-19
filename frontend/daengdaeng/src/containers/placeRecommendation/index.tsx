'use client';

import React, { useState } from 'react';
import PetSpecificPlaces from './PetSpecificPlaces';

import { PetSimple } from '@/src/types/pet';
import PetCheckboxList from './PetCheckboxList';

import styles from './index.module.scss';

import PlaceExample from '@/public/images/place-example.jpg';

type PlaceRecommendationProps = {
  pets: PetSimple[];
};

const places = [
  {
    placeId: 1,
    title: 'place 1',
    address: 'address 1',
    placeImage: PlaceExample,
  },
  {
    placeId: 2,
    title: 'place 2',
    address: 'address 2',
    placeImage: PlaceExample,
  },
  {
    placeId: 3,
    title: 'place 3',
    address: 'address 3',
    placeImage: PlaceExample,
  },
  {
    placeId: 4,
    title: 'place 4',
    address: 'address 4',
    placeImage: PlaceExample,
  },
  {
    placeId: 5,
    title: 'place 5',
    address: 'address 5',
    placeImage: PlaceExample,
  },
];

const PlaceRecommendation = ({ pets }: PlaceRecommendationProps) => {
  const [checkedPets, setCheckedPets] = useState<number[]>([]);

  return (
    <div className={styles.PlaceRecommendation}>
      <div className={styles.petCheckboxContainer}>
        <PetCheckboxList
          pets={pets}
          checkedPets={checkedPets}
          setCheckedPets={setCheckedPets}
        />
      </div>
      <div className={styles.placeListContainer}>
        {pets.map((pet) => (
          // TODO: fetch places
          <PetSpecificPlaces key={pet.petId} pet={pet} places={places} />
        ))}
      </div>
    </div>
  );
};

export default PlaceRecommendation;
