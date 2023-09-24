import PlaceRecommendation from '@/src/app/placerecommendation/placeRecommendation';

import type { PetSimple } from '@/src/types/pet';
import type { PetSpecificPlaces, Place } from '@/src/types/place';


// const fetchPetList = async (): Promise<PetSimple[]> => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pet`);
//   const data = await res.json();
//   return data;
// };

const fetchPetSpecificPlaces = async (): Promise<PetSpecificPlaces[]> => {
  {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/place/recommend/dog/`,
    );
    console.log('....................응답.................', res);

    const data = await res.json();
    return data;
  }
};

const fetchUserSpecificPlaces = async (): Promise<Place[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/place/recommend/member/`,
  );
  console.log('....................응답.................', res);
  const data = await res.json();
  return data;
};

const PlaceRecommendationPage = async () => {
  // const pets = await fetchPetList();
  const petSpecificPlaces: PetSpecificPlaces[] = await fetchPetSpecificPlaces();
  const userSpecificPlaces: Place[] = await fetchUserSpecificPlaces();

  return (
    <PlaceRecommendation
      pets={pets}
      petSpecificPlaces={petSpecificPlaces}
      userSpecificPlaces={userSpecificPlaces}
    />
  );
};

export default PlaceRecommendationPage;

// dummy data

const pets: PetSimple[] = Array.from({ length: 4 }, (_, i) => ({
  petId: i + 1,
  name: `Pet ${i + 1}`,
}));
