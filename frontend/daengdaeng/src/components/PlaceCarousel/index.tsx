import React, { useState } from 'react';

import useEmblaCarousel from 'embla-carousel-react';

import styles from './index.module.scss';
import Card from '../common/Card';

import type { Place, PlaceWithReview } from '@/src/types/place';
import type { EmblaOptionsType } from 'embla-carousel-react';

import PlaceCard from '@/src/components/PlaceCard';
import PlaceDetail from '@/src/components/PlaceDetail';
import useFetcher from '@/src/hooks/useFetcher';

type CarouselProps = {
  places: Place[];
  startIndex?: number;
  options?: EmblaOptionsType;
  mutate: any;
};

const PlaceCarousel = ({
  places,
  startIndex,
  options,
  mutate,
}: CarouselProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const [emblaRef, _] = useEmblaCarousel(options);

  const [currentPlaceId, setCurrentPlaceId] = useState<number | undefined>(
    undefined,
  );

  const { data: currentPlace, mutate: mutatePlaceDetail } =
    useFetcher<PlaceWithReview>(
      `/place`,
      typeof currentPlaceId !== 'undefined',
      `/${currentPlaceId}`,
    );

  const somePlaces =
    typeof startIndex !== 'undefined'
      ? places.slice(startIndex, startIndex + 5)
      : places;

  const handleClickPlaceCard = (placeId: number) => {
    setCurrentPlaceId(placeId);
  };

  const handleClosePlaceDetail = () => {
    setCurrentPlaceId(undefined);
  };

  // const handleMutate = async (placeId: number) => {
  //   const updatedPlaces = places.map((place) => {
  //     if (place.placeId === placeId) {
  //       return { ...place, isHeart: !place.isHeart };
  //     }
  //     return place;
  //   });

  //   await mutate(updatedPlaces, false);
  // };

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
                <PlaceCard key={place.placeId} place={place} mutate={mutate} />
              </Card>
            </div>
          ))}
        </div>
      </div>
      {currentPlace && (
        <>
          <div className={styles.background} onClick={handleClosePlaceDetail} />
          <PlaceDetail
            placeWithReview={currentPlace}
            handleClose={handleClosePlaceDetail}
            // mutate={mutatePlaceDetail}
          />
        </>
      )}
    </div>
  );
};

export default PlaceCarousel;
