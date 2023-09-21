import type { StaticImageData } from 'next/image';

// TODO: 속성 추가 해야 함
export type Place = {
  placeId: number;
  title: string;
  address: string;
  placeImage: string | StaticImageData;
};

export type PlaceWithLike = {
  place: Place;
  isHeart: boolean;
};

export type PetSpecificPlacesResponse = {
  pet: {
    petId: number;
    name: string;
  };
  placeList: PlaceWithLike[];
};

export type KeywordReview = {
  keywordId: number;
  keyword: string;
  keywordCnt: number;
};

export type Review = {
  reviewContent: string;
  registDate: string;
};

export type PlaceDetailWithReview = {
  place: Place;
  isHeart: boolean;
  score: number;
  keywordList: KeywordReview[];
  reviewList: Review[];
};
