import React from 'react';

import Image from 'next/image';

import styles from './index.module.scss';
import LikeButton from '../LikeButton';

import type { Place } from '@/src/types/place';

type PlaceCardProps = {
  place: Place;
};

const PlaceCard = ({ place }: PlaceCardProps) => {
  const handleLikeClick = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    console.log('조아요');
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
