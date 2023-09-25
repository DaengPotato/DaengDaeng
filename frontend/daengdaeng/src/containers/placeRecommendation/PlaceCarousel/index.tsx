import React from 'react';
import { useState } from 'react';

import useEmblaCarousel from 'embla-carousel-react';

import PlaceExample from '@/public/images/place-example.jpg';
import PlaceCard from '@/src/components/PlaceCard';
import PlaceDetail from '@/src/components/PlaceDetail';

import styles from './index.module.scss';
import Card from '../../../components/common/Card';

import type { Place, PlaceWithReview } from '@/src/types/place';
import type { EmblaOptionsType } from 'embla-carousel-react';

type CarouselProps = {
  places: Place[];
  startIndex: number;
  options?: EmblaOptionsType;
};

// dummy data
const placeWithReview: PlaceWithReview = {
  place: {
    placeId: 1,
    title: '짱멋진 여행지',
    roadAddress: '강원도 어딘가 어쩌구',
    placeImage: PlaceExample,
    isHeart: true,
    jibunAddress: '',
    homepage: [],
    openingHour: [],
    phoneNumber: '',
    content: '',
    hashtag: [],
    heartCnt: 0,
    category: '',
  },
  score: 3,
  keywordList: [
    {
      keywordId: 1,
      keyword: '깨끗해요',
      keywordCnt: 25,
    },
    {
      keywordId: 2,
      keyword: '뛰어놀기 좋아요',
      keywordCnt: 51,
    },
    {
      keywordId: 3,
      keyword: '친절해요',
      keywordCnt: 30,
    },
    {
      keywordId: 4,
      keyword: '힐링돼요',
      keywordCnt: 15,
    },
    {
      keywordId: 5,
      keyword: '프라이빗해요',
      keywordCnt: 4,
    },
  ],
  reviewList: [],
};

const PlaceCarousel = ({ places, startIndex, options }: CarouselProps) => {
  const [emblaRef, _] = useEmblaCarousel(options);
  const [currentPlace, setCurrentPlace] = useState<PlaceWithReview | undefined>(
    undefined,
  );

  const somePlaces = places.slice(startIndex, startIndex + 5);

  const handleClickPlaceCard = (placeId: number) => {
    // TODO: 여행지 상세 정보(리뷰) fetch
    console.log(placeId);

    setCurrentPlace(placeWithReview);
  };

  const handleClosePlaceDetail = () => {
    setCurrentPlace(undefined);
  };

  return (
    <div className={styles.Carousel}>
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.container}>
          {somePlaces.map((place, i) => (
            <div
              className={styles.slide}
              key={i}
              onClick={() => handleClickPlaceCard(place.placeId)}
            >
              <Card>
                <PlaceCard key={place.placeId} place={place} />
              </Card>
            </div>
          ))}
        </div>
      </div>
      {currentPlace && (
        <PlaceDetail
        placeWithReview={currentPlace}
          handleClose={handleClosePlaceDetail}
        />
      )}
    </div>
  );
};

export default PlaceCarousel;
