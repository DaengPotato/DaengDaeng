'use client';

import React from 'react';

import CategoryCarousel from './CategoryCarousel';
import styles from './index.module.scss';
import KakaoMap from './KakaoMap';

import type { Category } from '@/src/types/category';
import type { Location } from '@/src/types/placesearch';

type PlaceSearchProps = {
  location: Location;
  categories: Category[];
};

const PlaceSearch = ({ location, categories }: PlaceSearchProps) => {
  return (
    <div className={styles.placeSearchContainer}>
      <KakaoMap location={location} />
      <div className={styles.categoryContainer}>
        <CategoryCarousel
          categories={categories}
          options={{ dragFree: true, containScroll: 'trimSnaps' }}
        />
      </div>
    </div>
  );
};

export default PlaceSearch;
