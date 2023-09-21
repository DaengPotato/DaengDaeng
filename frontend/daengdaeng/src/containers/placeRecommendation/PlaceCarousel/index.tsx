import React from 'react';

import useEmblaCarousel from 'embla-carousel-react';

import PlaceCard from '@/src/components/PlaceCard';

import styles from './index.module.scss';
import Card from '../../../components/common/Card';

import type { PlaceWithLike } from '@/src/types/trip';
import type { EmblaOptionsType } from 'embla-carousel-react';

type CarouselProps = {
  places: PlaceWithLike[];
  startIndex: number;
  options?: EmblaOptionsType;
};

const PlaceCarousel = ({ places, startIndex, options }: CarouselProps) => {
  const [emblaRef, _] = useEmblaCarousel(options);

  const somePlaces = places.slice(startIndex, startIndex + 5);

  const handleClickPlaceCard = () => {
    
  }
  
  return (
    <div className={styles.Carousel}>
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.container}>
          {somePlaces.map((place, i) => (
            <div className={styles.slide} key={i} onClick={handleClickPlaceCard}>
              <Card>
                <PlaceCard
                  key={place.place.placeId}
                  placeWithLike={place}
                />
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaceCarousel;
