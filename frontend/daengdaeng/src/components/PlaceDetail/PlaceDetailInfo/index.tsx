import React from 'react';

import styles from './index.module.scss';
import LikeButton from '../../LikeButton';

import type { Place } from '@/src/types/place';

import { CheckedStarIcon, UncheckedStarIcon } from '@/public/icons';

type PlaceDetailInfoProps = {
  place: Place;
  score: number;
  isLiked: boolean;
  toggleLike: any;
};

const PlaceDetailInfo = ({
  place,
  score,
  isLiked,
  toggleLike,
}: PlaceDetailInfoProps) => {
  const handleLikeClick = async (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    toggleLike();
  };

  console.log(place);

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
        {/* <LikeButton isLiked={isLiked} onClick={handleLikeClick} /> */}
      </div>
      <div className={styles.placeAddress}>{place.roadAddress}</div>
      <div className={styles.label}>별점</div>
      <div>{calcScore()}</div>
      {place.content && (
        <>
          <div className={styles.label}>장소 설명</div>
          <div className={styles.content}>{place.content}</div>
        </>
      )}
      {place.phoneNumber && (
        <div className={styles.phone}>
          <div className={styles.label}>연락처</div>
          <div className={styles.phoneNumber}>{place.phoneNumber}</div>
        </div>
      )}
      <div className={styles.placeOpeningHourContainer}>
        <div className={styles.label}>영업시간</div>
        <div className={styles.placeOpeningHour}>
          {place.openingHour.map((hour, index) => (
            <div key={index}>
              {hour && `${hour.slice(0, 1)} ${hour.slice(1)}`}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaceDetailInfo;
