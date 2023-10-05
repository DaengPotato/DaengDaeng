'use client';
import { useEffect, useState } from 'react';

import PlaceSearch from '@/src/app/placesearch/PlaceSearch';

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

  return <PlaceSearch categories={categories} />;
};

export default PlaceSearchPage;
