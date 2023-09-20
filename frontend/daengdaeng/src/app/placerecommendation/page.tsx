import PlaceRecommendation from '@/src/containers/placeRecommendation';

import type { PetSimple } from '@/src/types/pet';

const pets: PetSimple[] = Array.from({ length: 4 }, (_, i) => ({
  petId: i + 1,
  name: `Pet ${i + 1}`,
}));

const PlaceRecommendationPage = async () => {
  // TODO: fetch my pets from the API
  // const pets = await getMyPets();

  return <PlaceRecommendation pets={pets} />;
};

export default PlaceRecommendationPage;
