import React from 'react';

import Image from 'next/image';

import styles from './index.module.scss';
import KeywordReviewItem from './KeywordReviewItem';
import PlaceDetailInfo from './PlaceDetailInfo';

import type { KeywordReview, Place, PlaceWithReview } from '@/src/types/place';

type PlaceDetailProps = {
  placeWithReview?: PlaceWithReview;
  handleClose: () => void;
};

const PlaceDetail = ({ placeWithReview, handleClose }: PlaceDetailProps) => {
  const place: Place = placeWithReview?.place || {
    placeId: 0,
    title: '',
    jibunAddress: '',
    roadAddress: '',
    homepage: [],
    openingHour: [],
    phoneNumber: '',
    content: '',
    heartCnt: 0,
    placeImage: '',
    category: '',
    isHeart: false,
  };
  const keywordList: KeywordReview[] = placeWithReview?.keywordList || [];
  const score: number = placeWithReview?.score || 0;

  return (
    <div className={styles.PlaceDetail}>
      <div className={styles.closeBtn} onClick={handleClose}>
        닫기
      </div>
      <div className={styles.placeInfo}>
        <div className={styles.placeImage}>
          {/* <Image
            src={place.placeImage}
            alt={place.title}
            fill={true}
            objectFit="cover"
          /> */}
        </div>
        <div className={styles.placeInfo}>
          <PlaceDetailInfo
            place={place}
            score={score}
            isLiked={place.isHeart}
          />
        </div>
        <div className={styles.reviewContainer}>
          <div className={styles.reviewTitle}>
            <div className={styles.reviewHeader}>방문자 리뷰</div>
            <div className={styles.divided}>|</div>
            <div className={styles.makeReview}>리뷰 남기기</div>
          </div>
          <div className={styles.keywordReviewContainer}>
            {keywordList.map((keyword) => (
              <KeywordReviewItem key={keyword.keywordId} keyword={keyword} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetail;
