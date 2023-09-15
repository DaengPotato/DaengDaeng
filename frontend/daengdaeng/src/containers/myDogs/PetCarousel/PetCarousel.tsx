import React, { useEffect } from 'react';

import useEmblaCarousel from 'embla-carousel-react';

import styles from './PetCarousel.module.scss';
import Card from '../../../components/common/Card/Card';

import type { EmblaOptionsType } from 'embla-carousel-react';

type CarouselProps = {
  slides: React.ReactNode[];
  options?: EmblaOptionsType;
};

const PetCarousel = ({ slides, options }: CarouselProps) => {
  const [emblaRef, _] = useEmblaCarousel(options);

  useEffect(() => {
    // TODO: 강아지 정보 데이터 fetch
  });

  return (
    <div className={styles.Carousel}>
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.container}>
          {slides.map((slide, index) => (
            <div className={styles.slide} key={index}>
              <Card>{slide}</Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PetCarousel;
