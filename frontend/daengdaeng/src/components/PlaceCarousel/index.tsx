import React, { useEffect, useState } from 'react';

import useEmblaCarousel from 'embla-carousel-react';

import styles from './index.module.scss';
import BottomSheet from '../common/BottomSheet';
import Card from '../common/Card';

import type { PlaceWithReview, PetSpecificPlaces, Place } from '@/src/types/place';
import type { EmblaOptionsType } from 'embla-carousel-react';

import { createLikePlace, deleteLikePlace } from '@/src/apis/api/place';
import PlaceCard from '@/src/components/PlaceCard';
import PlaceDetail from '@/src/components/PlaceDetail';
import useFetcher from '@/src/hooks/useFetcher';

type CarouselProps = {
  isLikedPlace: boolean;
  places: Place[];
  petSpecificPlaces?: PetSpecificPlaces[];
  startIndex?: number;
  options?: EmblaOptionsType;
  mutate: any;
};

const PlaceCarousel = ({
  isLikedPlace,
  places,
  petSpecificPlaces,
  startIndex,
  options,
  mutate,
}: CarouselProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const [emblaRef, _] = useEmblaCarousel(options);

  const [currentPlaceId, setCurrentPlaceId] = useState<number | undefined>(
    undefined,
  );
  const [somePlaces, setSomePlaces] = useState<Place[]>([]);

  useEffect(() => {
    if (typeof startIndex === 'undefined') {
      setSomePlaces(places);
      return;
    }
    setSomePlaces(places.slice(startIndex, startIndex + 5));
  }, [startIndex, places]);

  const { data: currentPlace, mutate: mutateCurrentPlace } =
    useFetcher<PlaceWithReview>(
      `/place`,
      typeof currentPlaceId !== 'undefined',
      `/${currentPlaceId}`,
    );

  const handleClickPlaceCard = (placeId: number) => {
    setCurrentPlaceId(placeId);
  };

  const handleClosePlaceDetail = () => {
    setCurrentPlaceId(undefined);
  };

  const handleLike = async (place: Place) => {
    let updatedPlaces;
    if (isLikedPlace) {
      updatedPlaces = places.filter(
        (prevPlace) => prevPlace.placeId !== place.placeId,
      );
    } else {
      if (petSpecificPlaces) {
        updatedPlaces = petSpecificPlaces.map((petPlace) => {
          return {
            ...petPlace,
            placeList: petPlace.placeList.map((prevPlace) => {
              if (prevPlace.placeId === place.placeId) {
                return { ...prevPlace, isHeart: !prevPlace.isHeart };
              }
              return prevPlace;
            }),
          };
        });
      } else {
        updatedPlaces = places.map((prevPlace) => {
          if (prevPlace.placeId === place.placeId) {
            return { ...prevPlace, isHeart: !prevPlace.isHeart };
          }
          return prevPlace;
        });
      }
    }

    await mutate(updatedPlaces, false);

    if (!place.isHeart) {
      await createLikePlace(place.placeId);
    } else {
      await deleteLikePlace(place.placeId);
    }
  };

  const handleLikePlaceWithReview = async () => {
    if (!currentPlace) return;
    const updatePlaces: PlaceWithReview = {
      ...currentPlace,
      place: {
        ...currentPlace.place,
        isHeart: !currentPlace?.place.isHeart,
      },
    };

    await mutateCurrentPlace(updatePlaces, false);

    if (!currentPlace.place.isHeart) {
      await createLikePlace(currentPlace.place.placeId);
    } else {
      await deleteLikePlace(currentPlace.place.placeId);
    }
  };

  return (
    <div className={styles.Carousel}>
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.container}>
          {somePlaces &&
            somePlaces.map((place, i) => (
              <div
                className={styles.slide}
                key={i}
                onClick={() => handleClickPlaceCard(place.placeId)}
              >
                <Card>
                  <PlaceCard
                    key={place.placeId}
                    place={place}
                    toggleLike={handleLike}
                  />
                </Card>
              </div>
            ))}
        </div>
      </div>
      {currentPlace && (
        <>
          <div className={styles.background} onClick={handleClosePlaceDetail} />
          <BottomSheet
            isOpen={currentPlaceId !== undefined}
            setIsOpen={handleClosePlaceDetail}
          >
            <PlaceDetail
              placeWithReview={currentPlace}
              handleClose={handleClosePlaceDetail}
              toggleLike={handleLikePlaceWithReview}
              mutate={mutateCurrentPlace}
            />
          </BottomSheet>
        </>
      )}
    </div>
  );
};

export default PlaceCarousel;
