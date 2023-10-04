import React, { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { PawIcon } from '@/public/icons';
import { gray } from '@/src/styles/colors';

import styles from './index.module.scss';
import KeywordReviewItem from './KeywordReviewItem';
import PlaceDetailInfo from './PlaceDetailInfo';

import type { KeywordReview, Place, PlaceWithReview } from '@/src/types/place';

type PlaceDetailProps = {
  placeWithReview?: PlaceWithReview;
  handleClose: () => void;
};

const PlaceDetail = ({ placeWithReview, handleClose }: PlaceDetailProps) => {
  const router = useRouter();
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
      <div className={styles.closeBtn} onClick={handleClose}>
        닫기
      </div>
      <div className={styles.placeInfo}>
        <div className={styles.placeImage}>
          {!imgError && typeof place.placeImage === 'string' ? (
            <Image
              src={place.placeImage}
              alt={place.title}
              fill={true}
              objectFit="cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <PawIcon fill={gray} width={100} height={100} />
          )}
        </div>
        <div className={styles.placeInfo}>
          <PlaceDetailInfo
            place={place}
            score={score}
            isLiked={place.isHeart}
            // mutate={mutate}
          />
        </div>
        <div className={styles.reviewContainer}>
          <div className={styles.reviewTitle}>
            <div className={styles.reviewHeader}>방문자 리뷰</div>
            <div className={styles.divided}>|</div>
            <Link
              className={styles.makeReview}
              href={{
                pathname: '/placereview',
                query: {
                  id: place.placeId,
                },
              }}
            >
              리뷰 남기기
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
