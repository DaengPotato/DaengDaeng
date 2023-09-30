'use client';

import React, { useState } from 'react';

import CategoryCarousel from './CategoryCarousel';
import styles from './index.module.scss';
import KakaoMap from './KakaoMap';
import PlaceInfo from './PlaceInfo';
import Search from './Search';

import type { Category } from '@/src/types/category';
import type { Place } from '@/src/types/place';
import type { Location } from '@/src/types/placesearch';

type PlaceSearchProps = {
  location: Location;
  categories: Category[];
};

const PlaceSearch = ({ location, categories }: PlaceSearchProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<Place[]>([]);

  const handleSearchPlace = async (searchText: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/place?category=1&keyword=${searchText}&cursor=1`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error('장소 검색 실패');
    }
    const data = await response.json();
    if (Array.isArray(data.placeList)) {
      setSearchResults(data.placeList);
    } else {
      console.error('API response is not an array:', data);
    }
    setIsOpen(true);
  };

  const handleClickPlaceInfo = (placeId: number) => {
    console.log(placeId);
  };

  return (
    <>
      {isOpen ? (
        <div className={styles.placeListContainer}>
          {searchResults.map((result, i) => (
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
          <KakaoMap location={location} />
        </div>
      )}
      <Search isOpen={isOpen} onSearch={handleSearchPlace} />
      <div className={styles.categoryContainer}>
        <CategoryCarousel
          categories={categories}
          options={{ dragFree: true, containScroll: 'trimSnaps' }}
        />
      </div>
    </>
  );
};

export default PlaceSearch;
