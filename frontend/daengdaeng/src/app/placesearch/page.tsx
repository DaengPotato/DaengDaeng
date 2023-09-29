'use client';
import { useCallback, useEffect, useState } from 'react';

import PlaceSearch from '@/src/app/placesearch/PlaceSearch';

import type { Category } from '@/src/types/category';
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

// dummy data
const categoryExample: Category[] = Array.from({ length: 5 }, (_, i) => ({
  categoryId: i + 1,
  category: `Category`,
}));

const PlaceSearchPage = async () => {
  const [categories, setCategories] = useState<Category[]>(categoryExample);

  const fetchCategories = useCallback(async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/place/category`,
    );
    if (!response.ok) {
      throw new Error('카테고리 조회 실패');
    }
    const data = await response.json();
    setCategories(data);
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return <PlaceSearch location={location} categories={categories} />;
};

export default PlaceSearchPage;
