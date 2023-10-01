'use client';

import { useEffect, useState } from 'react';

import MyPets from './MyPets';

import type { PetDetail } from '@/src/types/pet';
import type { Place } from '@/src/types/place';

// import PetExample from '@/public/images/pet-example.webp';
// import PlaceExample from '@/public/images/place-example.jpg';
import { getUser } from '@/src/hooks/useLocalStorage';

// // dummy data
// const pets: PetDetail[] = Array.from({ length: 4 }, (_, i) => ({
//   petId: i + 1,
//   name: `Pet ${i + 1}`,
//   birth: '2020.03.20',
//   gender: true,
//   weight: 5,
//   image: PetExample,
//   mbtiId: 1,
// }));

// // dummy data
// const places = Array.from({ length: 20 }, (_, i): Place => {
//   return {
//     placeId: i,
//     title: `Place ${i}`,
//     roadAddress: `Address ${i}`,
//     placeImage: PlaceExample,
//     isHeart: true,
//     jibunAddress: '',
//     homepage: [],
//     openingHour: [],
//     phoneNumber: '',
//     content: '',
//     heartCnt: 0,
//     category: '',
//   };
// });

const fetchPetList = async (token: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pet`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = JSON.parse(await res.text());

  return data;
};

const fetchLikedPlaceList = async (token: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/member/heart`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = JSON.parse(await res.text());

  return data;
};

const MyPetsPage = () => {
  const [pets, setPets] = useState<PetDetail[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  // TODO: fetch my pets from the API
  // const pets = await getMyPets();

  // TODO: fetch liked place from the API

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = getUser() as string;
      (async () => {
        setPets(await fetchPetList(token));
      })();
      (async () => {
        setPlaces(await fetchLikedPlaceList(token));
      })();
    }
  }, []);

  return <MyPets pets={pets} places={places} />;
};

export default MyPetsPage;
