'use client';

import React from 'react';

import styles from './index.module.scss';
import KakaoMap from './KakaoMap';

import type { Location } from '@/src/types/placesearch';

type LocationProps = {
  location: Location;
};

const PlaceSearch = ({ location }: LocationProps) => {
  return (
    <div className={styles.placeSearchContainer}>
      <KakaoMap location={location} />
    </div>
  );
};

export default PlaceSearch;
