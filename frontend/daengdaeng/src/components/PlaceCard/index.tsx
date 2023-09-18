import React from 'react';

import Image from 'next/image';

import styles from './index.module.scss';
import LikeButton from '../LikeButton';

import type { Place } from '@/src/types/trip';

type PlaceCardProps = {
  place: Place;
  isLiked: boolean;
};

const PlaceCard = ({ place, isLiked }: PlaceCardProps) => {
  return (
    <div className={styles.PlaceCard}>
      <div className={styles.likeBtn}>
        <LikeButton isLiked={isLiked} />
      </div>
      <div className={styles.placeImg}>
        <Image src={place.placeImage} alt="place img" fill={true} />
      </div>
      <div className={styles.placeTitle}>{place.title}</div>
      <div className={styles.placeAddress}>{place.address}</div>
    </div>
  );
};

export default PlaceCard;
