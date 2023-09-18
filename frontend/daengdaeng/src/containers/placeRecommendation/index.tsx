'use client';

import React, { useState } from 'react';
import PetSpecificPlaces from './PetSpecificPlaces';

import { PetSimple } from '@/src/types/pet';
import PetCheckboxList from './PetCheckboxList';

import PlaceExample from '@/public/images/place-example.jpg';

type PlaceRecommendationProps = {
  pets: PetSimple[];
};

const places = [
  {
    placeId: 0,
    title: '집',
    address: '서울시 강남구 어쩌구',
    placeImage: PlaceExample,
  },
  {
    placeId: 1,
    title: '집',
    address: '서울시 강남구 어쩌구',
    placeImage: PlaceExample,
  },
  {
    placeId: 2,
    title: '집',
    address: '서울시 강남구 어쩌구',
    placeImage: PlaceExample,
  },
  {
    placeId: 3,
    title: '집',
    address: '서울시 강남구 어쩌구',
    placeImage: PlaceExample,
  },
  {
    placeId: 4,
    title: '집',
    address: '서울시 강남구 어쩌구',
    placeImage: PlaceExample,
  },
];

const PlaceRecommendation = ({ pets }: PlaceRecommendationProps) => {
  const [checkedPets, setCheckedPets] = useState<number[]>([]);

  return (
    <div>
      <PetCheckboxList
        pets={pets}
        checkedPets={checkedPets}
        setCheckedPets={setCheckedPets}
      />
      {pets.map((pet) => (
        // TODO: fetch places
        <PetSpecificPlaces key={pet.petId} pet={pet} places={places} />
      ))}
    </div>
  );
};

export default PlaceRecommendation;
