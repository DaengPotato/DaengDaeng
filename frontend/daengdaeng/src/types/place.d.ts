import type { StaticImageData } from 'next/image';

export type Place = {
  placeId: number;
  title: string;
  jibunAddress: string;
  roadAddress: string;
  homepage: string[]; // 홈페이지, 인스타, 유튜브 주소...
  openingHour: string[];
  phoneNumber: string;
  content: string;
  heartCnt: number;
  placeImage: string | StaticImageData;
  category: string;
  isHeart: boolean;
};

export type PlaceResult = {
  nextCursor: number;
  placeList: Place[];
}

export type Review = {
  petList: number[];
  score: number;
  keywordList: number[];
};

export type PlaceWithReview = {
  place: Place;
  score: number;
  keywordList: KeywordReview[];
  reviewList: Review[];
};

export type PetSpecificPlaces = {
  petId: number;
  name: string;
  placeList: Place[];
};

export type KeywordReview = {
  keywordId: number;
  keyword: string;
  keywordCnt?: number;
};
