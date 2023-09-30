'use client';
import React from 'react';

import Button from '@/src/components/common/Button';

import styles from './index.module.scss';

import type { Category } from '@/src/types/category';


type CategoryProps = {
  category: Category;
  onClick: ( categoryId: number ) => void;
};

const CategoryCard = ({ category, onClick }: CategoryProps) => {
  const handleClickCategory = () => {
    onClick(category.categoryId);
  }

  return (
      <div className={styles.categoryCard}>
        <Button backgroundColor="orange" size={'small'} icon={false} onClick={handleClickCategory}>
          {category.category}
        </Button>
      </div>
  );
};

export default CategoryCard;
