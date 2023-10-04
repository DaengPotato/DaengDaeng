import type { Place } from '@/src/types/place';
import type { Meta, StoryObj } from '@storybook/react';

import PlaceCarousel from '.';

import PlaceExample from '@/public/images/place-example.jpg';

const meta: Meta = {
  title: 'Components/PlaceCarousel',
  component: PlaceCarousel,
};

export default meta;

type Story = StoryObj<typeof PlaceCarousel>;

const places = Array.from({ length: 10 }, (_, i): Place => {
  return {
    placeId: i,
    title: `Place ${i}`,
    roadAddress: `Address ${i}`,
    placeImage: PlaceExample,
    isHeart: true,
    jibunAddress: '',
    homepage: [],
    openingHour: [],
    phoneNumber: '',
    content: '',
    heartCnt: 0,
    category: '',
  };
});

export const PlaceCarouselStory: Story = {
  args: {
    places,
    options: {
      dragFree: true,
      align: 'center',
      containScroll: 'trimSnaps',
    },
  },
};
