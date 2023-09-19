// TODO: 속성 추가 해야 함
export type Place = {
  placeId: number;
  title: string;
  address: string;
  placeImage: string | StaticImageData;
};

export type PlaceResponse = {
  place: Place;
  isHeart: boolean;
};

export type PetSpecificPlacesResponse = {
  pet: {
    petId: number;
    name: string;
  };
  placeList: PlaceResponse[];
};
