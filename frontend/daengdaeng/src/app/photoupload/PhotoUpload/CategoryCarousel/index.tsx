import React from 'react';

import useEmblaCarousel from 'embla-carousel-react';

import styles from './index.module.scss';
import CategoryButton from '../CategoryButton';

import type { Category } from '@/src/types/category';
import type { EmblaOptionsType } from 'embla-carousel-react';

type CarouselProps = {
  selectedCategoryId: number;
  categorys: Category[];
  options?: EmblaOptionsType;
  handleCategorySelect: (selectedCategoryId: number) => void;
};

const CategoryCarousel = ({
  selectedCategoryId,
  categorys,
  options,
  handleCategorySelect,
}: CarouselProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const [emblaRef, _] = useEmblaCarousel(options);

  return (
    <div className={styles.Carousel}>
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.container}>
          {categorys.map((item) => (
            <div className={styles.slide} key={item.categoryId}>
              <CategoryButton
                key={item.categoryId}
                content={item.category}
                backgroundColor={
                  selectedCategoryId === item.categoryId ? 'orange' : 'gray'
                }
                onClick={() => {
                  handleCategorySelect(item.categoryId);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCarousel;
