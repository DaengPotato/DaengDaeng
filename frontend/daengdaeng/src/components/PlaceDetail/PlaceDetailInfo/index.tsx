import React from 'react';

import styles from './index.module.scss';
import LikeButton from '../../LikeButton';

import type { Place } from '@/src/types/place';

type PlaceDetailInfoProps = {
  place: Place;
  score: number;
  isLiked: boolean;
};

const PlaceDetailInfo = ({ place, score, isLiked }: PlaceDetailInfoProps) => {
  return (
    <div className={styles.PlaceDetailInfo}>
      <div className={styles.placeHeader}>
        <div className={styles.placeTitle}>{place.title}</div>
        <LikeButton isLiked={isLiked} />
      </div>
      <div className={styles.placeAddress}>{place.roadAddress}</div>
      <div>별점 : {score}</div>
      <div>{place.content}</div>
      <div>{place.phoneNumber}</div>
      <div className={styles.placeOpeningHourContainer}>
        <div>영업시간</div>
        <div className={styles.placeOpeningHour}>
          {place.openingHour.map((hour, index) => (
            <div key={index}>{hour}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaceDetailInfo;
