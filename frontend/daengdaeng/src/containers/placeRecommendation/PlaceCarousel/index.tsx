import React, { useEffect } from 'react';

import useEmblaCarousel from 'embla-carousel-react';

import styles from './index.module.scss';
import Card from '../../../components/common/Card';

import type { EmblaOptionsType } from 'embla-carousel-react';

type CarouselProps = {
  slides: React.ReactNode[];
  options?: EmblaOptionsType;
};

const PlaceCarousel = ({ slides, options }: CarouselProps) => {
  const [emblaRef, _] = useEmblaCarousel(options);

  useEffect(() => {
    // TODO: 장소 정보 데이터 fetch
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

export default PlaceCarousel;
