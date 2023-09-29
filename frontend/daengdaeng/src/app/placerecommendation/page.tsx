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
  const data = JSON.parse(await res.text());

  return data;
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

  return data;
};

const PlaceRecommendationPage = () => {
  const [token, setToken] = useState<string | undefined>(undefined);
  const [pets, setPets] = useState([]);
  const [petSpecificPlaces, setPetSpecificPlaces] = useState([]);
  const [userSpecificPlaces, setUserSpecificPlaces] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(getUser() as string);
    }
  }, []);

  useEffect(() => {
    if (typeof token !== 'undefined') {
      (async () => {
        setPets(await fetchPetList(token));

        setUserSpecificPlaces(await fetchUserSpecificPlaces(token));
      })();
    }
  }, [token]);

  useEffect(() => {
    if (typeof token !== 'undefined') {
      (async () => {
        setPetSpecificPlaces(await fetchPetSpecificPlaces(token));
      })();
    }
  }, [pets]);

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
