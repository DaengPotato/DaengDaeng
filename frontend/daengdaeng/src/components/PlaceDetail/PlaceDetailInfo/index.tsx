import React from 'react';

import styles from './index.module.scss';
import LikeButton from '../../LikeButton';

import type { Place } from '@/src/types/place';

import { createLikePlace, deleteLikePlace } from '@/src/apis/api/place';
import { getUser } from '@/src/hooks/useLocalStorage';

type PlaceDetailInfoProps = {
  place: Place;
  score: number;
  isLiked: boolean;
  mutate: any;
};

const PlaceDetailInfo = ({
  place,
  score,
  isLiked,
  mutate,
}: PlaceDetailInfoProps) => {
  const token = getUser() as string;

  const handleLikeClick = async (event: { stopPropagation: () => void }) => {
    event.stopPropagation();

    await mutate();

    if (place.isHeart) {
      await createLikePlace(place.placeId);
    } else {
      await deleteLikePlace(place.placeId);
    }
  };

  return (
    <div className={styles.PlaceDetailInfo}>
      <div className={styles.placeHeader}>
        <div className={styles.placeTitle}>{place.title}</div>
        <LikeButton isLiked={isLiked} onClick={handleLikeClick} />
      </div>
      <div className={styles.placeAddress}>{place.roadAddress}</div>
      <div>별점 : {score}</div>
      <div>{place.content}</div>
      <div>{place.phoneNumber}</div>
      <div>{place.homepage}</div>
      <div>{place.openingHour}</div>
    </div>
  );
};

export default PlaceDetailInfo;
