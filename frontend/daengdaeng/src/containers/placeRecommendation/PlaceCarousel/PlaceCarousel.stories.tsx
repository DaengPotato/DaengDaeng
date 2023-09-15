import PlaceCarousel from './PlaceCarousel';
import PlaceCard from '../../../components/PlaceCard/PlaceCard';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Components/PlaceCarousel',
  component: PlaceCarousel,
};

export default meta;

type Story = StoryObj<typeof PlaceCarousel>;

const placeCardList = Array.from({ length: 10 }, (_, i) => {
  return (
    <PlaceCard
      key={i}
      place={{
        placeId: i,
        title: `Place ${i}`,
        address: `Address ${i}`,
        placeImage:
          'https://image.edaily.co.kr/images/Photo/files/NP/S/2020/10/PS20101500220.jpg',
      }}
      isLiked={true}
    />
  );
});

export const Place: Story = {
  args: {
    slides: placeCardList,
    options: { dragFree: true, containScroll: 'trimSnaps' },
  },
};
