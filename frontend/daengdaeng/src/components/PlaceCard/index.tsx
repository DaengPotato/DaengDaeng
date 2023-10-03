import React from 'react';

import Image from 'next/image';

import styles from './index.module.scss';
import LikeButton from '../LikeButton';

import type { Place } from '@/src/types/place';

import { createLikePlace, deleteLikePlace } from '@/src/apis/api/place';

type PlaceCardProps = {
  place: Place;
  mutate?: any;
};

const PlaceCard = ({ place, mutate }: PlaceCardProps) => {
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
    <div className={styles.PlaceCard}>
      <div className={styles.likeBtn}>
        <LikeButton isLiked={place.isHeart} onClick={handleLikeClick} />
      </div>
      <div className={styles.placeImg}>
        <Image src={place.placeImage} alt="place img" fill={true} />
      </div>
      <div className={styles.placeTitle}>{place.title}</div>
      <div className={styles.placeAddress}>{place.roadAddress}</div>
    </div>
  );
};

export default PlaceCard;
