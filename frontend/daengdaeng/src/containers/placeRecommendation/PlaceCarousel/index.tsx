import React, { useEffect } from 'react';

import useEmblaCarousel from 'embla-carousel-react';

import styles from './index.module.scss';
import Card from '../../../components/common/Card';
import PlaceCard from '@/src/components/PlaceCard';

import { Place } from '@/src/types/trip';

import type { EmblaOptionsType } from 'embla-carousel-react';

type CarouselProps = {
  places: Place[];
  options?: EmblaOptionsType;
};

const PlaceCarousel = ({ places, options }: CarouselProps) => {
  const [emblaRef, _] = useEmblaCarousel(options);

  useEffect(() => {
    // TODO: 장소 정보 데이터 fetch
  });

  return (
    <div className={styles.Carousel}>
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.container}>
          {places.map((place, i) => (
            <div className={styles.slide} key={i}>
              <Card>
                <PlaceCard key={place.placeId} place={place} isLiked={true} />
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaceCarousel;
