'use client';

import React, { useEffect, useState } from 'react';

import CategoryCarousel from './CategoryCarousel';
import styles from './index.module.scss';
import KakaoMap from './KakaoMap';
import PlaceInfo from './PlaceInfo';
import Search from './Search';

import type { Category } from '@/src/types/category';
import type { Place, PlaceWithReview } from '@/src/types/place';

import PlaceDetail from '@/src/components/PlaceDetail';
import { getUser } from '@/src/hooks/useLocalStorage';

type PlaceSearchProps = {
  categories: Category[];
};

const PlaceSearch = ({ categories }: PlaceSearchProps) => {
  const [token, setToken] = useState<string | undefined>(undefined);
  const [viewMode, setViewMode] = useState<'map' | 'results' | 'info'>('map');
  const [searchResults, setSearchResults] = useState<Place[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>('');
  const [selectedPlaceId, setSelectedPlaceId] = useState<number | undefined>(
    undefined,
  );
  const [selectedPlaceWithReview, setSelectedPlaceWithReview] =
    useState<PlaceWithReview>();

  const handleSearchPlace = (searchText: string) => {
    setSearchText(searchText);
    if (typeof token !== 'undefined') {
      fetchSearchPlace(token, searchText);
    }
  };

  const fetchSearchPlace = async (token: string, searchText: string) => {
    let url = '';
    if (selectedCategoryId == 0) {
      url = `${process.env.NEXT_PUBLIC_API_URL}/place?category&keyword=${searchText}&cursor=0`;
    } else {
      url = `${process.env.NEXT_PUBLIC_API_URL}/place?category=${selectedCategoryId}&keyword=${searchText}&cursor=0`;
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
    setViewMode('results');
  };

  const fetchPlaceWithReview = async (token: string, placeId: number) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/place/${placeId}`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    if (!response.ok) {
      throw new Error('장소 상세 정보 조회 실패');
    }

    const data = await response.json();
    console.log(data);
    setSelectedPlaceWithReview(data);
  };

  const handleClickPlaceInfo = (placeId: number) => {
    setViewMode('info');
    setSelectedPlaceId(placeId);
    if (typeof token !== 'undefined') {
      fetchPlaceWithReview(token, placeId);
    }
  };

  const handleClickCategory = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
    if (typeof token !== 'undefined') {
      fetchSearchPlace(token, searchText);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(getUser() as string);
    }
  }, []);

  return (
    <>
      {viewMode === 'results' ? (
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
          <KakaoMap
            viewMode={viewMode}
            address={selectedPlaceWithReview?.place.jibunAddress}
          />
        </div>
      )}
      <Search onSearch={handleSearchPlace} />
      {viewMode !== 'info' && (
        <div className={styles.categoryContainer}>
          <CategoryCarousel
            categories={categories}
            options={{
              dragFree: true,
              align: 'center',
              containScroll: false,
            }}
            onClickCategory={handleClickCategory}
          />
        </div>
      )}
      {selectedPlaceId !== undefined && viewMode !== 'results' && (
        <>
          <PlaceDetail
            placeWithReview={selectedPlaceWithReview}
            handleClose={() => {
              setSelectedPlaceId(undefined);
              setViewMode('map');
            }}
          />
        </>
      )}
    </>
  );
};

export default PlaceSearch;
