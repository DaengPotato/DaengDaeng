'use client';

import React, { useEffect, useState } from 'react';

import styles from './index.module.scss';
import PetCheckboxList from './PetCheckboxList';
import RecommendedPlaceList from './RecommendedPlaceList';

import type { PetSimple } from '@/src/types/pet';
import type { PetSpecificPlaces, Place } from '@/src/types/place';

import PetCheckLoading from '@/src/components/LoadingShimmer/PetCheckLoading';
import PlaceListLoading from '@/src/components/LoadingShimmer/PlaceListLoading';
import { getUserInfo } from '@/src/hooks/useLocalStorage';

type PlaceRecommendationProps = {
  pets: PetSimple[] | undefined;
  petSpecificPlaces: PetSpecificPlaces[] | undefined;
  userSpecificPlaces: Place[] | undefined;
  mutateMemberPlaces: any;
  mutatePetPlaces: any;
  isLoadingPet: boolean;
  isLoadingMemberPlaces: boolean;
  isLoadingPetPlaces: boolean;
};

const PlaceRecommendation = ({
  pets,
  petSpecificPlaces,
  userSpecificPlaces,
  mutateMemberPlaces,
  mutatePetPlaces,
  isLoadingPet,
  isLoadingMemberPlaces,
  isLoadingPetPlaces,
}: PlaceRecommendationProps) => {
  const [checkedPets, setCheckedPets] = useState<number[]>([]);

  useEffect(() => {
    if (pets) {
      setCheckedPets(pets.map((pet) => pet.petId));
    }
  }, [pets]);

  const userName = getUserInfo()?.nickname as string;

  return (
    <div className={styles.PlaceRecommendation}>
      <div className={styles.petCheckboxContainer}>
        {isLoadingPet ? (
          <PetCheckLoading />
        ) : (
          <>
            {pets && (
              <PetCheckboxList
                pets={pets}
                checkedPets={checkedPets}
                setCheckedPets={setCheckedPets}
              />
            )}
          </>
        )}
      </div>
      <div className={styles.placeListContainer}>
        {isLoadingPetPlaces ? (
          <>{pets && pets.map((item, i) => <PlaceListLoading key={i} />)}</>
        ) : (
          <>
            {
              // 강아지별 추천 여행지
              petSpecificPlaces &&
                petSpecificPlaces.map(
                  (petPlace: PetSpecificPlaces) =>
                    checkedPets.includes(petPlace.petId) && (
                      <RecommendedPlaceList
                        key={petPlace.petId}
                        isPet={true}
                        name={petPlace.name}
                        petSpecificPlaces={petSpecificPlaces}
                        places={petPlace.placeList}
                        mutate={mutatePetPlaces}
                      />
                    ),
                )
            }
          </>
        )}

        {isLoadingMemberPlaces ? (
          <>
            <PlaceListLoading />
          </>
        ) : (
          <>
            {userSpecificPlaces && (
              // 사용자 찜 기반 추천 여행지
              <RecommendedPlaceList
                isPet={false}
                name={userName}
                places={userSpecificPlaces}
                mutate={mutateMemberPlaces}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PlaceRecommendation;
