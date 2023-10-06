'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import CategoryCarousel from './CategoryCarousel';
import styles from './index.module.scss';
import KakaoMap from './KakaoMap';
import PlaceInfo from './PlaceInfo';
import Search from './Search';

import type { Category } from '@/src/types/category';
import type { Place, PlaceWithReview } from '@/src/types/place';

import { createLikePlace, deleteLikePlace } from '@/src/apis/api/place';
import BottomSheet from '@/src/components/common/BottomSheet';
import PlaceDetail from '@/src/components/PlaceDetail';
import useFetcher from '@/src/hooks/useFetcher';
import useInfiniteFetcher from '@/src/hooks/useInfiniteFetcher';
import { getUser } from '@/src/hooks/useLocalStorage';

type PlaceSearchProps = {
  categories?: Category[];
};

const PlaceSearch = ({ categories }: PlaceSearchProps) => {
  // eslint-disable-next-line no-null/no-null
  const observeTarget = useRef(null);

  const [token, setToken] = useState<string | undefined>(undefined);
  const [viewMode, setViewMode] = useState<'map' | 'results' | 'info'>('map');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>('');
  const [selectedPlaceId, setSelectedPlaceId] = useState<number | undefined>(
    undefined,
  );
  const [param, setParam] = useState<string>('');

  const {
    data: searchResults,
    isLoading,
    setSize,
    mutate,
  } = useInfiniteFetcher(param !== '', param);

  const onIntersect = useCallback(
    ([entry]: any) => {
      if (entry.isIntersecting) {
        setSize((prev) => prev + 1);
      }
    },
    [setSize],
  );

  useEffect(() => {
    if (!observeTarget.current) return;
    const observer = new IntersectionObserver(onIntersect, {
      threshold: 1,
    });

    observer.observe(observeTarget.current);
    return () => observer && observer.disconnect();
  }, [observeTarget, onIntersect]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(getUser() as string);
    }
  }, []);

  useEffect(() => {
    if (typeof token !== 'undefined' && selectedCategoryId !== 0) {
      if (selectedCategoryId === 0 && searchText !== '') {
        setParam(`?category&keyword=${searchText}`);
      } else {
        setParam(`?category=${selectedCategoryId}&keyword=${searchText}`);
      }
    }
  }, [searchText, selectedCategoryId, token]);

  useEffect(() => {
    console.log(searchResults);
    if (searchResults) {
      setViewMode('results');
    }
  }, [searchResults]);

  const handleSearchPlace = (searchText: string) => {
    setSearchText(searchText);
  };

  const { data: placeWithReview, mutate: mutatePlaceWithReview } =
    useFetcher<PlaceWithReview>(
      `/place`,
      typeof selectedPlaceId !== 'undefined',
      `/${selectedPlaceId}`,
    );

  const handleClickPlaceInfo = (placeId: number) => {
    setViewMode('info');
    setSelectedPlaceId(placeId);
  };

  const handleClickCategory = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
  };

  const handleLikeSearchResults = async (place: Place) => {
    if (!searchResults) return;
    const updatePlaces = searchResults.map((results) => {
      return {
        ...results,
        placeList: results.placeList.map((prevPlace: Place) => {
          if (prevPlace.placeId === place.placeId) {
            return {
              ...prevPlace,
              isHeart: !prevPlace.isHeart,
            };
          }
          return prevPlace;
        }),
      };
    });

    await mutate(updatePlaces, false);

    if (!place.isHeart) {
      await createLikePlace(place.placeId);
    } else {
      await deleteLikePlace(place.placeId);
    }
  };

  const handleLikePlaceWithReview = async () => {
    if (!placeWithReview) return;
    const updatePlaces: PlaceWithReview = {
      ...placeWithReview,
      place: {
        ...placeWithReview.place,
        isHeart: !placeWithReview?.place.isHeart,
      },
    };

    await mutatePlaceWithReview(updatePlaces, false);

    if (!placeWithReview.place.isHeart) {
      await createLikePlace(placeWithReview.place.placeId);
    } else {
      await deleteLikePlace(placeWithReview.place.placeId);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBarContainer}>
        <div className={styles.searchBar}>
          <Search onSearch={handleSearchPlace} />
        </div>
        {viewMode !== 'info' && (
          <div className={styles.categoryContainer}>
            <CategoryCarousel
              categories={categories}
              options={{
                dragFree: true,
              }}
              onClickCategory={handleClickCategory}
              selectedCategoryId={selectedCategoryId}
            />
          </div>
        )}
      </div>
      {viewMode === 'results' ? (
        <div className={styles.placeListContainer}>
          <div className={styles.placeList}>
            {searchResults &&
              searchResults.map((res) =>
                res.placeList.map((result: Place, i: number) => (
                  <div
                    className={styles.slide}
                    key={i}
                    onClick={() => handleClickPlaceInfo(result.placeId)}
                  >
                    <PlaceInfo
                      key={result.placeId}
                      place={result}
                      toggleLike={handleLikeSearchResults}
                    />
                  </div>
                )),
              )}
            <div className={styles.observerTarget} ref={observeTarget}></div>
          </div>
        </div>
      ) : (
        <div className={styles.placeSearchContainer}>
          <KakaoMap
            viewMode={viewMode}
            address={placeWithReview?.place.jibunAddress}
          />
        </div>
      )}
      {selectedPlaceId !== undefined && viewMode !== 'results' && (
        <BottomSheet
          isOpen={viewMode === 'info'}
          setIsOpen={() => {
            setSelectedPlaceId(undefined);
            setViewMode('results');
          }}
        >
          <PlaceDetail
            placeWithReview={placeWithReview}
            handleClose={() => {
              setSelectedPlaceId(undefined);
              setViewMode('results');
            }}
            toggleLike={handleLikePlaceWithReview}
            mutate={mutatePlaceWithReview}
          />
        </BottomSheet>
      )}
    </div>
  );
};

export default PlaceSearch;
