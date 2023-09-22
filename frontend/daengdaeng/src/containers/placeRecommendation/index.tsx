'use client';

import React, { useState } from 'react';

import PlaceExample from '@/public/images/place-example.jpg';

import styles from './index.module.scss';
import PetCheckboxList from './PetCheckboxList';
import PetSpecificPlaceList from './PetSpecificPlaceList';

import type { PetSimple } from '@/src/types/pet';
import type { PetSpecificPlaces, Place } from '@/src/types/place';

type PlaceRecommendationProps = {
  pets: PetSimple[];
};

const petSpecificPlacesData: PetSpecificPlaces[] = Array.from(
  { length: 4 },
  (_, i: number): PetSpecificPlaces => ({
    petId: i + 1,
    name: `pet ${i + 1}`,
    placeList: Array.from(
      { length: 20 },
      (_, j: number): Place => ({
        placeId: j + 1,
        title: `place ${j + 1}`,
        roadAddress: `address ${j + 1}`,
        placeImage: PlaceExample,
        isHeart: true,
        jibunAddress: '',
        homepage: [],
        openingHour: [],
        phoneNumber: '',
        content: '',
        hashtag: [],
        heartCnt: 0,
        category: '',
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
            checkedPets.includes(petPlace.petId) && (
              <PetSpecificPlaceList
                key={petPlace.petId}
                petName={petPlace.name}
                places={petPlace.placeList}
              />
            ),
        )}
      </div>
    </div>
  );
};

export default PlaceRecommendation;
