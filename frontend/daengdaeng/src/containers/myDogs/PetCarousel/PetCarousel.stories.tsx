import PetCarousel from './PetCarousel';
import PetCard from '../PetCard/PetCard';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Components/PetCarousel',
  component: PetCarousel,
};

export default meta;

type Story = StoryObj<typeof PetCarousel>;

const petCardList = Array.from({ length: 10 }, (_, i) => {
  return (
    <PetCard
      key={i}
      pet={{
        petId: i,
        name: '마루',
        birth: '2020-10-15',
        gender: 0,
        weight: 5,
        image:
          'https://i.namu.wiki/i/qLHBqQCkDCnivN_6TyTD4nGdLzRRA8cqsybsrH9foke0w56twTmnACNBhoab8dsGn5DPn03NR0TZw2HN1WRQuw.webp',
        mbtiId: i,
      }}
    />
  );
});

export const Pet: Story = {
  args: {
    slides: petCardList,
    options: { dragFree: true, containScroll: 'trimSnaps' },
  },
};
