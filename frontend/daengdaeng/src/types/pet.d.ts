export type PetSimple = {
  petId: number;
  name: string;
};

export type PetDetail = {
  petId: number;
  name: string;
  birth: string;
  gender: number;
  weight: number;
  image: string;
  mbtiId?: number;
};
