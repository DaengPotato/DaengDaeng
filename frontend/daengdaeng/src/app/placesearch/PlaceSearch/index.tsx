'use client';

import React, { useEffect, useState } from 'react';

import { getUser } from '@/src/hooks/useLocalStorage';

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
  const [token, setToken] = useState<string | undefined>(undefined);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<Place[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>('');

  const handleSearchPlace = (searchText: string) => {
    setSearchText(searchText);
    if (typeof token !== 'undefined') {
      fetchSearchPlace(token);
    }
  };

  const fetchSearchPlace = async (token: string) => {
    let url = '';
    if (selectedCategoryId == 0) {
      url = `${process.env.NEXT_PUBLIC_API_URL}/place?keyword=${searchText}&cursor=1`;
    } else {
      url = `${process.env.NEXT_PUBLIC_API_URL}/place?category=${selectedCategoryId}&keyword=${searchText}&cursor=1`;
    }
    const response = await fetch(url, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });

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
    setIsOpen(false);
  };

  const handleClickCategory = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
    if (typeof token !== 'undefined') {
      fetchSearchPlace(token);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(getUser() as string);
    }
  }, []);

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
          onClickCategory={handleClickCategory}
        />
      </div>
    </>
  );
};

export default PlaceSearch;
