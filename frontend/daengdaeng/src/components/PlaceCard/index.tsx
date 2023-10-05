import React, { useState } from 'react';

import Image from 'next/image';

import styles from './index.module.scss';
import LikeButton from '../LikeButton';

import type { Place } from '@/src/types/place';

import { PawIcon } from '@/public/icons';
import { createLikePlace, deleteLikePlace } from '@/src/apis/api/place';
import { gray } from '@/src/styles/colors';

type PlaceCardProps = {
  place: Place;
  toggleLike?: any;
};

const PlaceCard = ({ place, toggleLike }: PlaceCardProps) => {
  const [imgError, setImgError] = useState<boolean>(false);

  const handleLikeClick = async (event: { stopPropagation: () => void }) => {
    event.stopPropagation();

    console.log('조아요 여부 : ', place.isHeart);

    toggleLike(place);
  };

  return (
    <div className={styles.PlaceCard}>
      <div className={styles.likeBtn}>
        <LikeButton isLiked={place.isHeart} onClick={handleLikeClick} />
      </div>
      <div className={styles.placeImg}>
        {!imgError && typeof place.placeImage === 'string' ? (
          <Image
            src={place.placeImage}
            alt={place.title}
            fill={true}
            onError={() => setImgError(true)}
          />
        ) : (
          <PawIcon fill={gray} width={100} height={100} />
        )}
      </div>
      <div className={styles.placeTitle}>{place.title}</div>
      <div className={styles.placeAddress}>
        {place.roadAddress
          ? place.roadAddress.split(' ').slice(0, 3).join(' ')
          : ''}
      </div>
    </div>
  );
};

export default PlaceCard;
