'use client';

import type { PetSimple } from '@/src/types/pet';
import type { PetSpecificPlaces, Place } from '@/src/types/place';

import PlaceRecommendation from '@/src/app/placerecommendation/PlaceRecommendation';
import useFetcher from '@/src/hooks/useFetcher';

const PlaceRecommendationPage = () => {
  const { data: pets, isLoading: isLoadingPet } =
    useFetcher<PetSimple[]>(`/pet`);
  const {
    data: memberPlaces,
    isLoading: isLoadingMemberPlaces,
    mutate: mutateMemberPlaces,
  } = useFetcher<Place[]>(`/place/recommend/member`);
  const {
    data: petPlaces,
    isLoading: isLoadingPetPlaces,
    mutate: mutatePetPlaces,
  } = useFetcher<PetSpecificPlaces[]>(
    `/place/recommend/dog`,
    pets && pets.length > 0,
  );

  return (
    <PlaceRecommendation
      pets={pets ? pets : undefined}
      petSpecificPlaces={petPlaces}
      userSpecificPlaces={memberPlaces}
      mutateMemberPlaces={mutateMemberPlaces}
      mutatePetPlaces={mutatePetPlaces}
      isLoadingPet={isLoadingPet}
      isLoadingMemberPlaces={isLoadingMemberPlaces}
      isLoadingPetPlaces={isLoadingPetPlaces}
    />
  );
};

export default PlaceRecommendationPage;
