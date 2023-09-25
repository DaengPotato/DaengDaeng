import PlaceExample from '@/public/images/place-example.jpg';

import type { Meta, StoryObj } from '@storybook/react';

import PlaceCard from '.';

const meta: Meta<typeof PlaceCard> = {
  title: 'Components/PlaceCard',
  component: PlaceCard,
};

export default meta;

type Story = StoryObj<typeof PlaceCard>;

export const LikedTrip: Story = {
  args: {
    place: {
      placeId: 1,
      title: '짱멋진 여행지',
      roadAddress: '강원도 어딘가 어쩌구',
      placeImage: PlaceExample,
      isHeart: true,
      jibunAddress: '',
      homepage: [],
      openingHour: [],
      phoneNumber: '',
      content: '',
      hashtag: [],
      heartCnt: 0,
      category: '',
    },
  },
};

export const NotLikedTrip: Story = {
  args: {
    ...LikedTrip.args,
  },
};
