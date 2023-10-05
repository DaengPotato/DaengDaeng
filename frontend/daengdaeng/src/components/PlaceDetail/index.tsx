import React, { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { AddIcon } from '@/public/icons';

import styles from './index.module.scss';
import KeywordReviewItem from './KeywordReviewItem';
import PlaceDetailInfo from './PlaceDetailInfo';

import type { KeywordReview, Place, PlaceWithReview } from '@/src/types/place';

type PlaceDetailProps = {
  placeWithReview?: PlaceWithReview;
  handleClose: () => void;
};

const PlaceDetail = ({ placeWithReview, handleClose }: PlaceDetailProps) => {
  const [imgError, setImgError] = useState<boolean>(false);
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
      <div className={styles.placeInfo}>
        {!imgError &&
          placeWithReview?.place.placeImage &&
          typeof placeWithReview?.place.placeImage === 'string' && (
            <div className={styles.placeImage}>
              <Image
                src={placeWithReview?.place.placeImage}
                alt={placeWithReview?.place.title}
                fill={true}
                objectFit="cover"
                onError={() => setImgError(true)}
              />
            </div>
          )}
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
            <Link
              href={{
                pathname: '/placereview',
                query: {
                  id: place.placeId,
                },
              }}
            >
              <AddIcon width={15} height={15} />
            </Link>
          </div>
          <div className={styles.keywordReviewContainer}>
            {keywordList.map((keyword) => (
              <KeywordReviewItem
                key={keyword.keywordId}
                keyword={keyword}
                viewCount
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetail;
