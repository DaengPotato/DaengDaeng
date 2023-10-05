'use client';
import React from 'react';

import useEmblaCarousel from 'embla-carousel-react';

import styles from './index.module.scss';
import CategoryCard from '../CategoryCard';

import type { Category } from '@/src/types/category';
import type { EmblaOptionsType } from 'embla-carousel-react';

type CarouselProps = {
  categories?: Category[];
  options?: EmblaOptionsType;
  onClickCategory: (categoryId: number) => void;
  selectedCategoryId: number;
};

const CategoryCarousel = ({
  categories,
  options,
  onClickCategory,
  selectedCategoryId,
}: CarouselProps) => {
  const [emblaRef, _] = useEmblaCarousel(options);

  return (
    <div className={styles.Carousel}>
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.container}>
          {categories?.map((category, i) => (
            <div className={styles.slide} key={i}>
              <CategoryCard
                isSelected={category.categoryId === selectedCategoryId}
                category={category}
                onClick={onClickCategory}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCarousel;
