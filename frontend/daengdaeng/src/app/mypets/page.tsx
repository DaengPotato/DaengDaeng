'use client';

import MyPets from './MyPets';

import type { PetDetail } from '@/src/types/pet';
import type { Place } from '@/src/types/place';

import useFetcher from '@/src/hooks/useFetcher';

const MyPetsPage = () => {
  const { data: pets, mutate: mutatePets } =
    useFetcher<PetDetail[]>(`/pet/detail`);
  const { data: places, mutate: mutatePlaces } =
    useFetcher<Place[]>(`/member/heart`);

  return (
    <>
      <MyPets
        pets={pets ? pets : undefined}
        places={places ? places : undefined}
        mutatePets={mutatePets}
        mutatePlaces={mutatePlaces}
      />
    </>
  );
};

export default MyPetsPage;
