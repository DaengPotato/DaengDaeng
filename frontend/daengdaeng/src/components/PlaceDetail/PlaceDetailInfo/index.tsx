import React from 'react';

import { CheckedStarIcon, UncheckedStarIcon } from '@/public/icons';
import { createLikePlace, deleteLikePlace } from '@/src/apis/api/place';
import { getUser } from '@/src/hooks/useLocalStorage';

import styles from './index.module.scss';
import LikeButton from '../../LikeButton';

import type { Place } from '@/src/types/place';

type PlaceDetailInfoProps = {
  place: Place;
  score: number;
  isLiked: boolean;
  // mutate: any;
};

const PlaceDetailInfo = ({
  place,
  score,
  isLiked, // mutate,
}: PlaceDetailInfoProps) => {
  const token = getUser() as string;

  const handleLikeClick = async (event: { stopPropagation: () => void }) => {
    event.stopPropagation();

    // await mutate();

    if (place.isHeart) {
      await createLikePlace(place.placeId);
    } else {
      await deleteLikePlace(place.placeId);
    }
  };

  const calcScore = () => {
    const roundedScore = Math.round(score);
    const stars = [];

    for (let i = 0; i < 5; i++) {
      {
        i < roundedScore
          ? stars.push(<CheckedStarIcon width={40} height={40} key={i} />)
          : stars.push(<UncheckedStarIcon width={40} height={40} key={i} />);
      }
    }

    return stars;
  };

  return (
    <div className={styles.PlaceDetailInfo}>
      <div className={styles.placeHeader}>
        <div className={styles.placeTitle}>{place.title}</div>
        <LikeButton isLiked={isLiked} onClick={handleLikeClick} />
      </div>
      <div className={styles.placeAddress}>{place.roadAddress}</div>
      <div>{calcScore()}</div>
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
