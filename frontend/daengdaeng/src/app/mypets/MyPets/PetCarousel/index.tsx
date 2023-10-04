'use client';

import React from 'react';

import useEmblaCarousel from 'embla-carousel-react';

import styles from './index.module.scss';
import Card from '../../../../components/common/Card';
import PetCard from '../PetCard';

import type { PetDetail } from '@/src/types/pet';
import type { EmblaOptionsType } from 'embla-carousel-react';

type CarouselProps = {
  pets: PetDetail[];
  options?: EmblaOptionsType;
  setEditingPet?: React.Dispatch<React.SetStateAction<PetDetail | undefined>>;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const PetCarousel = ({
  pets,
  options,
  setEditingPet,
  setIsOpen,
}: CarouselProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const [emblaRef, _] = useEmblaCarousel(options);

  return (
    <div className={styles.Carousel}>
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.container}>
          {pets.map((pet, i) => (
            <div className={styles.slide} key={i}>
              <Card>
                <PetCard
                  pet={pet}
                  setEditingPet={setEditingPet}
                  setIsOpen={setIsOpen}
                />
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PetCarousel;
