import React from 'react';

import Image from 'next/image';

import styles from './index.module.scss';
import LikeButton from '../LikeButton';

import type { Place } from '@/src/types/place';

import { getUser } from '@/src/hooks/useLocalStorage';

type PlaceCardProps = {
  place: Place;
  mutate?: any;
};

const createLikePlace = async (token: string, placeId: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/member/heart/${placeId}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res;
};

const deleteLikePlace = async (token: string, placeId: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/member/heart/${placeId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res;
};

const PlaceCard = ({ place, mutate }: PlaceCardProps) => {
  const token = getUser() as string;

  const handleLikeClick = async (event: { stopPropagation: () => void }) => {
    event.stopPropagation();

    await mutate();

    if (place.isHeart) {
      await createLikePlace(token, place.placeId);
    } else {
      await deleteLikePlace(token, place.placeId);
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
