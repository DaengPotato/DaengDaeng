import PlaceRecommendation from '@/src/containers/placeRecommendation';
import { PetSimple } from '@/src/types/pet';

const pets: PetSimple[] = [
  {
    petId: 1,
    name: '마루',
  },
  {
    petId: 2,
    name: '바둑이',
  },
  {
    petId: 3,
    name: '깜자',
  },
  {
    petId: 4,
    name: '초코',
  },
];

const PlaceRecommendationPage = async () => {
  // TODO: fetch my pets from the API
  // const pets = await getMyPets();

  return <PlaceRecommendation pets={pets} />;
};

export default PlaceRecommendationPage;
