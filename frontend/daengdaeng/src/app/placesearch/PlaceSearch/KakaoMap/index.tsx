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
          <input type="text" />
          <div onClick={() => console.log('click')}>
            <SearchIcon />
          </div>
        </div>
      </Map>
    </>
  );
}

export default KakaoMap;
