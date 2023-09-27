'use client';

import { useEffect, useState } from 'react';

import PlaceRecommendation from '@/src/app/placerecommendation/PlaceRecommendation';
import { getUser } from '@/src/hooks/useLocalStorage';

import type { PetSimple } from '@/src/types/pet';
import type { PetSpecificPlaces, Place } from '@/src/types/place';

const fetchPetList = async (token: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pet`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  // const data = await res.json();
  return res;
};

const fetchPetSpecificPlaces = async (token: string) => {
  {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/place/recommend/dog`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    const data = JSON.parse(await res.text());

    console.log('....................응답.................', data);
    // const data = await res.json();
    return data;
  }
};

const fetchUserSpecificPlaces = async (token: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/place/recommend/member`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  const data = JSON.parse(await res.text());
  console.log(data);

  // console.log('....................응답.................', data);
  // const data = await res.json();
  return res;
};

const PlaceRecommendationPage = () => {
  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(getUser() as string);
    }
  }, []);

  useEffect(() => {
    if (typeof token !== 'undefined') {
      (async () => {
        console.log(token);
        // const pets = await fetchPetList();
        // await fetchPetList(token);
        // // const petSpecificPlaces: PetSpecificPlaces[] = await fetchPetSpecificPlaces();
        // await fetchPetSpecificPlaces(token);
        // const userSpecificPlaces: Place[] = await fetchUserSpecificPlaces();
        await fetchUserSpecificPlaces(token);
      })();
    }
  }, [token]);

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

// const pets: PetSimple[] = Array.from({ length: 4 }, (_, i) => ({
//   petId: i + 1,
//   name: `Pet ${i + 1}`,
// }));

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
