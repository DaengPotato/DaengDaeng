'use client';
import React from 'react';

import styles from './index.module.scss';

import type { Category } from '@/src/types/category';

type CategoryProps = {
  isSelected: boolean;
  category: Category;
  onClick: (categoryId: number) => void;
};

const CategoryCard = ({ isSelected, category, onClick }: CategoryProps) => {
  const handleClickCategory = () => {
    onClick(category.categoryId);
  };

  return (
    <div
      onClick={handleClickCategory}
      className={`${styles.CategoryCard} ${
        isSelected ? `${styles.selected}` : ''
      }`}
    >
      {category.category}
    </div>
  );
};

export default CategoryCard;
