import PetExample from '@/public/images/pet-example.webp';

import MyPets from './myPets';

import type { PetDetail } from '@/src/types/pet';


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

const MyPetsPage = async () => {
  // TODO: fetch my pets from the API
  // const pets = await getMyPets();

  return <MyPets pets={pets} />;
};

export default MyPetsPage;
