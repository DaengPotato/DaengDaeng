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
    placeWithLike: {
      place: {
        placeId: 1,
        title: '짱멋진 여행지',
        address: '강원도 어딘가 어쩌구',
        placeImage:
          'https://image.edaily.co.kr/images/Photo/files/NP/S/2020/10/PS20101500220.jpg',
      },
      isHeart: true,
    },
  },
};

export const NotLikedTrip: Story = {
  args: {
    ...LikedTrip.args,
  },
};
