'use client';
import React from 'react';

import Button from '@/src/components/common/Button';

import styles from './index.module.scss';

import type { Category } from '@/src/types/category';


type CategoryProps = {
  category: Category;
};

const CategoryCard = ({ category }: CategoryProps) => {
  return (
      <div className={styles.categoryCard}>
        <Button backgroundColor="orange" size={'small'} icon={false}>
          {category.category}
        </Button>
      </div>
  );
};

export default CategoryCard;
