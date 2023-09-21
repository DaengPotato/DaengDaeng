import React from 'react';

import Image from 'next/image';

import styles from './index.module.scss';
import LikeButton from '../LikeButton';

import type { PlaceWithLike } from '@/src/types/trip';

type PlaceCardProps = {
  placeWithLike: PlaceWithLike;
};

const PlaceCard = ({ placeWithLike }: PlaceCardProps) => {
  const place = placeWithLike.place;
  const isLiked = placeWithLike.isHeart;
  
  const handleLikeClick = () => {};

  return (
    <div className={styles.PlaceCard}>
      <div className={styles.likeBtn}>
        <LikeButton isLiked={isLiked} onClick={handleLikeClick} />
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
