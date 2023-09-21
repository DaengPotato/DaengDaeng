import React from 'react';

import styles from './index.module.scss';

import type { Place } from '@/src/types/trip';
import LikeButton from '../../LikeButton';

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
      <div className={styles.placeAddress}>{place.address}</div>
      <div>별점 : {score}</div>
      <div>
        장소 설명입니다장소 설명입니다장소 설명입니다장소 설명입니다장소
        설명입니다장소 설명입니다장소 설명입니다
      </div>
      <div>02-1234-5678</div>
      <div>영업시간 오전 9시 - 오후 10시</div>
    </div>
  );
};

export default PlaceDetailInfo;
