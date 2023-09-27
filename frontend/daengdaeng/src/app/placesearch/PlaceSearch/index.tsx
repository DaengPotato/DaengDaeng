'use client';

import React from 'react';

import styles from './index.module.scss';
import KakaoMap from './KakaoMap';

const PlaceSearch = () => {
  return (
    <div className={styles.placeSearchContainer}>
      <KakaoMap />
    </div>
  );
};

export default PlaceSearch;
