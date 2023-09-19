import PlaceCarousel from '.';
import PlaceCard from '../../../components/PlaceCard';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Components/PlaceCarousel',
  component: PlaceCarousel,
};

export default meta;

type Story = StoryObj<typeof PlaceCarousel>;

const places = Array.from({ length: 10 }, (_, i) => {
  return {
    placeId: i,
    title: `Place ${i}`,
    address: `Address ${i}`,
    placeImage:
      'https://image.edaily.co.kr/images/Photo/files/NP/S/2020/10/PS20101500220.jpg',
  };
});

export const Place: Story = {
  args: {
    places,
    options: { dragFree: true, containScroll: 'trimSnaps' },
  },
};
