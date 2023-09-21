'use client';

import React, { useState } from 'react';

import PlaceExample from '@/public/images/place-example.jpg';

import styles from './index.module.scss';
import PetCheckboxList from './PetCheckboxList';
import PetSpecificPlaces from './PetSpecificPlaces';

import type { PetSimple } from '@/src/types/pet';
import type {
  PetSpecificPlacesResponse,
  PlaceWithLike,
} from '@/src/types/trip';

type PlaceRecommendationProps = {
  pets: PetSimple[];
};

const petSpecificPlacesData: PetSpecificPlacesResponse[] = Array.from(
  { length: 4 },
  (_, i: number): PetSpecificPlacesResponse => ({
    pet: {
      petId: i + 1,
      name: `pet ${i + 1}`,
    },
    placeList: Array.from(
      { length: 20 },
      (_, j: number): PlaceWithLike => ({
        place: {
          placeId: j + 1,
          title: `place ${j + 1}`,
          address: `address ${j + 1}`,
          placeImage: PlaceExample,
        },
        isHeart: true,
      }),
    ),
  }),
);

const PlaceRecommendation = ({ pets }: PlaceRecommendationProps) => {
  const initialCheckedPets = pets.map((pet) => pet.petId);
  const [checkedPets, setCheckedPets] = useState<number[]>(initialCheckedPets);

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
        {petSpecificPlacesData.map(
          (petPlace) =>
            checkedPets.includes(petPlace.pet.petId) && (
              <PetSpecificPlaces
                key={petPlace.pet.petId}
                pet={petPlace.pet}
                places={petPlace.placeList}
              />
            ),
        )}
      </div>
    </div>
  );
};

export default PlaceRecommendation;
