import type { StaticImageData } from 'next/image';

export type PetSimple = {
  petId: number;
  name: string;
};

export type PetDetail = {
  petId: number;
  name: string;
  birth: string;
  gender: boolean;
  weight: number;
  image: string | StaticImageData;
  mbtiId: number;
};
