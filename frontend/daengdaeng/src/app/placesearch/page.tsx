'use client';
import { useEffect, useState } from 'react';

import PlaceSearch from '@/src/app/placesearch/PlaceSearch';

import type { Location } from '@/src/types/placesearch';

// dummy data
const location: Location = {
  center: {
    lat: 33.450701,
    lng: 126.570667,
  },
  errMsg: '',
  isLoading: true,
};

const fetchCategories = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/place/category`,
    {
      method: 'GET',
    },
  );

  if (!response.ok) {
    throw new Error('카테고리 조회 실패');
  }
  const data = JSON.parse(await response.text());

  return data;
};

const PlaceSearchPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      setCategories(await fetchCategories());
    })();
  }, []);

  return <PlaceSearch location={location} categories={categories} />;
};

export default PlaceSearchPage;
