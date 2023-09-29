import React, { useEffect, useState } from 'react';

import { Map, MapMarker } from 'react-kakao-maps-sdk';

import { SearchIcon } from '@/public/icons';

import styles from './index.module.scss';

import type { Location } from '@/src/types/placesearch';

type LocationProps = {
  location: Location;
};

function KakaoMap({ location }: LocationProps) {
  const [locationDir, setState] = useState<Location>(location);
  const [searchText, setSearchText] = useState<string>('');

  const handleSearchText = (searchText: string) => {
    setSearchText(searchText);
  };

  const handleSearchPlace = async () => {
    // searchText 넘겨서 장소 리스트 받기
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
    console.log(data);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition((position) => {
        setState((prev) => ({
          ...prev,
          center: {
            lat: position.coords.latitude, // 위도
            lng: position.coords.longitude, // 경도
          },
          errMsg: undefined,
          isLoading: true,
        }));
      });
    }
  }, []);

  return (
    <>
      <Map center={locationDir.center} className={styles.mapContainer}>
        {locationDir.isLoading && <MapMarker position={locationDir.center} />}
        <div className={styles.formItem}>
          <input
            type="text"
            onChange={(word) => handleSearchText(word.target.value)}
          />
          <div onClick={() => handleSearchPlace()}>
            <SearchIcon />
          </div>
        </div>
      </Map>
    </>
  );
}

export default KakaoMap;
