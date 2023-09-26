import MyPets from './MyPets';

import type { PetDetail } from '@/src/types/pet';
import type { Place } from '@/src/types/place';

import PetExample from '@/public/images/pet-example.webp';
import PlaceExample from '@/public/images/place-example.jpg';

// dummy data
const pets: PetDetail[] = Array.from({ length: 4 }, (_, i) => ({
  petId: i + 1,
  name: `Pet ${i + 1}`,
  birth: '2020.03.20',
  gender: true,
  weight: 5,
  image: PetExample,
  mbtiId: 1,
}));

// dummy data
const places = Array.from({ length: 20 }, (_, i): Place => {
  return {
    placeId: i,
    title: `Place ${i}`,
    roadAddress: `Address ${i}`,
    placeImage: PlaceExample,
    isHeart: true,
    jibunAddress: '',
    homepage: [],
    openingHour: [],
    phoneNumber: '',
    content: '',
    heartCnt: 0,
    category: '',
  };
});

const MyPetsPage = async () => {
  // TODO: fetch my pets from the API
  // const pets = await getMyPets();

  // TODO: fetch liked place from the API

  return <MyPets pets={pets} places={places} />;
};

export default MyPetsPage;
