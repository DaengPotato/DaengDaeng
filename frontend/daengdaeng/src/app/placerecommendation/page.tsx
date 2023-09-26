import type { PetSimple } from '@/src/types/pet';
import type { PetSpecificPlaces, Place } from '@/src/types/place';

import PlaceRecommendation from '@/src/app/placerecommendation/PlaceRecommendation';

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
  // const petSpecificPlaces: PetSpecificPlaces[] = await fetchPetSpecificPlaces();
  // const userSpecificPlaces: Place[] = await fetchUserSpecificPlaces();

  return (
    // <PlaceRecommendation
    //   pets={pets}
    //   petSpecificPlaces={petSpecificPlaces}
    //   userSpecificPlaces={userSpecificPlaces}
    // />
    <></>
  );
};

export default PlaceRecommendationPage;

// dummy data

const pets: PetSimple[] = Array.from({ length: 4 }, (_, i) => ({
  petId: i + 1,
  name: `Pet ${i + 1}`,
}));

// dummy data
// const petSpecificPlacesData: PetSpecificPlaces[] = Array.from(
//   { length: 4 },
//   (_, i: number): PetSpecificPlaces => ({
//     petId: i + 1,
//     name: `pet ${i + 1}`,
//     placeList: Array.from(
//       { length: 20 },
//       (_, j: number): Place => ({
//         placeId: j + 1,
//         title: `place ${j + 1}`,
//         roadAddress: `address ${j + 1}`,
//         placeImage: PlaceExample,
//         isHeart: true,
//         jibunAddress: '',
//         homepage: [],
//         openingHour: [],
//         phoneNumber: '',
//         content: '',
//         heartCnt: 0,
//         category: '',
//       }),
//     ),
//   }),
// );
