'use client';

import React, { useState } from 'react';

import styles from './index.module.scss';
import PetCheckboxList from './PetCheckboxList';
import RecommendedPlaceList from './RecommendedPlaceList';

import type { PetSimple } from '@/src/types/pet';
import type { PetSpecificPlaces, Place } from '@/src/types/place';

import { getUserInfo } from '@/src/hooks/useLocalStorage';

type PlaceRecommendationProps = {
  pets: PetSimple[];
  petSpecificPlaces: PetSpecificPlaces[];
  userSpecificPlaces: Place[];
};

const PlaceRecommendation = ({
  pets,
  petSpecificPlaces,
  userSpecificPlaces,
}: PlaceRecommendationProps) => {
  const initialCheckedPets = pets.map((pet) => pet.petId);
  const [checkedPets, setCheckedPets] = useState<number[]>(initialCheckedPets);

  const userName = getUserInfo()?.nickname as string;

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
        {
          // 강아지별 추천 여행지
          petSpecificPlaces.map(
            (petPlace: PetSpecificPlaces) =>
              checkedPets.includes(petPlace.petId) && (
                <RecommendedPlaceList
                  key={petPlace.petId}
                  isPet={true}
                  name={petPlace.name}
                  places={petPlace.placeList}
                />
              ),
          )
        }
        {/* {
          // 강아지 조합 추천 여행지
          petCombinationPlaces.map((place: Place) => (
            <RecommendedPlaceList
              key={petPlace.petId}
              isPet={true}
              name={petPlace.name}
              places={petPlace.placeList}
            />
          ))
        } */}
        {
          // 사용자 찜 기반 추천 여행지
          <RecommendedPlaceList
            isPet={false}
            name={userName}
            places={userSpecificPlaces}
          />
        }
      </div>
    </div>
  );
};

export default PlaceRecommendation;
