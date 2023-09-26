import type { PetDetail } from '@/src/types/pet';
import type { Meta, StoryObj } from '@storybook/react';

import PetCarousel from '.';

const meta: Meta = {
  title: 'Components/PetCarousel',
  component: PetCarousel,
};

export default meta;

type Story = StoryObj<typeof PetCarousel>;

// dummy data
const pets: PetDetail[] = Array.from({ length: 4 }, (_, i) => ({
  petId: i + 1,
  name: `Pet ${i + 1}`,
  birth: '2020.03.20',
  gender: true,
  weight: 5,
  image:
    'https://i.namu.wiki/i/qLHBqQCkDCnivN_6TyTD4nGdLzRRA8cqsybsrH9foke0w56twTmnACNBhoab8dsGn5DPn03NR0TZw2HN1WRQuw.webp',
  mbtiId: 1,
}));

export const Pet: Story = {
  args: {
    pets: pets,
    options: { dragFree: true, containScroll: 'trimSnaps' },
  },
};
