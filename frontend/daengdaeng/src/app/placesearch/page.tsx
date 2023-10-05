'use client';
import { useEffect, useState } from 'react';

import PlaceSearch from '@/src/app/placesearch/PlaceSearch';
import useFetcher from '@/src/hooks/useFetcher';

import type { Category } from '@/src/types/category';

const PlaceSearchPage = () => {
  const { data: categories } = useFetcher<Category[]>(`/place/category`);

  return <PlaceSearch categories={categories} />;
};

export default PlaceSearchPage;
