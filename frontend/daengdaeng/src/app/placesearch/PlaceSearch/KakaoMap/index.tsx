import React, { useEffect, useRef, useState } from 'react';

import { Map, MapMarker } from 'react-kakao-maps-sdk';

import styles from './index.module.scss';

import type { Location } from '@/src/types/placesearch';

type KakaoMapProps = {
  viewMode: string;
  address: string | undefined;
};

function KakaoMap({ viewMode, address }: KakaoMapProps) {
  const [locationDir, setLocationDir] = useState<Location>({
    center: {
      lat: 33,
      lng: 33,
    },
    errMsg: undefined,
    isLoading: false,
  });
  const [markers, setMarkers] = useState<
    { position: { lat: string; lng: string }; content: string }[]
  >([]);
  const [map, setMap] = useState<any>();
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLocationDir((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            errMsg: undefined,
            isLoading: true,
          }));
        });
      }
    } else if (!isInitialRender.current) {
      if (!map || !address) return;
      const ps = new kakao.maps.services.Places();

      ps.keywordSearch(address, (data, status, _pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          const bounds = new kakao.maps.LatLngBounds();
          let marker = [];

          marker.push({
            position: {
              lat: data[0].y,
              lng: data[0].x,
            },
            content: data[0].place_name,
          });
          bounds.extend(
            new kakao.maps.LatLng(Number(data[0].y), Number(data[0].x)),
          );
          setLocationDir({
            center: {
              lat: Number(data[0].y),
              lng: Number(data[0].x),
            },
            errMsg: undefined,
            isLoading: true,
          });
          setMarkers(marker);

          if (!map) {
            setMap(() => bounds);
          }
        }
      });
    }
    isInitialRender.current = false;
  }, [viewMode, address, map]);

  return (
    <>
      {viewMode === 'map' && (
        <Map center={locationDir.center} className={styles.mapContainer}>
          {locationDir.isLoading && <MapMarker position={locationDir.center} />}
        </Map>
      )}
      {viewMode === 'info' && (
        <Map
          center={locationDir.center}
          style={{
            width: '100%',
            height: '550px',
          }}
          level={3}
          onCreate={setMap}
        >
          {markers.map((marker) => (
            <MapMarker
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
              position={{
                ...{
                  lat: Number(marker.position.lat),
                  lng: Number(marker.position.lng),
                },
              }}
            ></MapMarker>
          ))}
        </Map>
      )}
    </>
  );
}

export default KakaoMap;
