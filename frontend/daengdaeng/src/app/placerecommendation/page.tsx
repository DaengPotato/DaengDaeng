'use client';

import type { PetSimple } from '@/src/types/pet';
import type { PetSpecificPlaces, Place } from '@/src/types/place';

import PlaceRecommendation from '@/src/app/placerecommendation/PlaceRecommendation';
import useFetcher from '@/src/hooks/useFetcher';

const PlaceRecommendationPage = () => {
  const { data: pets } = useFetcher<PetSimple[]>(`/pet`);
  const { data: memberPlaces, mutate: mutateMemberPlaces } = useFetcher<
    Place[]
  >(`/place/recommend/member`);
  const { data: petPlaces, mutate: mutatePetPlaces } =
    useFetcher<PetSpecificPlaces[]>(`/place/recommend/dog`);

  return (
    <PlaceRecommendation
      pets={pets ? pets : undefined}
      petSpecificPlaces={petPlaces}
      userSpecificPlaces={memberPlaces}
    />
  );
};

export default PlaceRecommendationPage;
