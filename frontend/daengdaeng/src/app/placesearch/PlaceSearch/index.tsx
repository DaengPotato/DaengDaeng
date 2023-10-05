'use client';

import React, { useEffect, useState } from 'react';

import BottomSheet from '@/src/components/common/BottomSheet';
import PlaceDetail from '@/src/components/PlaceDetail';
import useFetcher from '@/src/hooks/useFetcher';
import { getUser } from '@/src/hooks/useLocalStorage';

import CategoryCarousel from './CategoryCarousel';
import styles from './index.module.scss';
import KakaoMap from './KakaoMap';
import PlaceInfo from './PlaceInfo';
import Search from './Search';

import type { Category } from '@/src/types/category';
import type { PlaceWithReview } from '@/src/types/place';

type PlaceSearchProps = {
  categories?: Category[];
};

const PlaceSearch = ({ categories }: PlaceSearchProps) => {
  const [token, setToken] = useState<string | undefined>(undefined);
  const [viewMode, setViewMode] = useState<'map' | 'results' | 'info'>('map');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>('');
  const [selectedPlaceId, setSelectedPlaceId] = useState<number | undefined>(
    undefined,
  );
  const [param, setParam] = useState<string>('');
  const handleSearchPlace = (searchText: string) => {
    setSearchText(searchText);
  };

  const { data: searchResults } = useFetcher<[]>(`/place`, param !== '', param);

  useEffect(() => {
    console.log(searchResults);
    if (searchResults) {
      setViewMode('results');
      // setSelectedCategoryId(-1);
    }
  }, [searchResults]);

  const { data: placeWithReview } = useFetcher<PlaceWithReview>(
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(getUser() as string);
    }
  }, []);

  useEffect(() => {
    if (typeof token !== 'undefined' && selectedCategoryId !== 0) {
      if (selectedCategoryId === 0) {
        setParam(`?category&keyword=${searchText}&cursor=0`);
      } else {
        setParam(
          `?category=${selectedCategoryId}&keyword=${searchText}&cursor=0`,
        );
      }
    }
  }, [searchText, selectedCategoryId, token]);

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
            />
          </div>
        )}
      </div>
      {viewMode === 'results' ? (
        <div className={styles.placeListContainer}>
          {searchResults &&
            searchResults?.placeList.map((result, i) => (
              <div
                className={styles.slide}
                key={i}
                onClick={() => handleClickPlaceInfo(result.placeId)}
              >
                <PlaceInfo key={result.placeId} place={result} />
              </div>
            ))}
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
            // setSelectedCategoryId(-1);
            setViewMode('map');
          }}
        >
          <PlaceDetail
            placeWithReview={placeWithReview}
            handleClose={() => {
              setSelectedPlaceId(undefined);
              // setSelectedCategoryId(-1);
              setViewMode('map');
            }}
          />
        </BottomSheet>
      )}
    </div>
  );
};

export default PlaceSearch;
