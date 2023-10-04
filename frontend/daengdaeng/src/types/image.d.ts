declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.webp';

export type photoListType = {
  photoList: ImageType[];
  nextCursor: number;
};

export type ImageType = {
  image: string;
  place: string;
};
