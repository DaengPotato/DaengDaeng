import PetCard from '@/src/containers/myDogs/PetCard';

import Card from '.';
import PlaceCard from '../../PlaceCard';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Card> = {
  component: Card,
  title: 'Components/Common/Card',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Place: Story = {
  args: {
    children: (
      <PlaceCard
        place={{
          placeId: 1,
          title: '짱멋진 여행지',
          address: '강원도 어딘가 어쩌구',
          placeImage:
            'https://image.edaily.co.kr/images/Photo/files/NP/S/2020/10/PS20101500220.jpg',
        }}
        isLiked={true}
      />
    ),
  },
};

export const Pet: Story = {
  args: {
    children: (
      <PetCard
        pet={{
          petId: 1,
          name: '마루',
          birth: '2020-10-15',
          gender: 0,
          weight: 5,
          image:
            'https://i.namu.wiki/i/qLHBqQCkDCnivN_6TyTD4nGdLzRRA8cqsybsrH9foke0w56twTmnACNBhoab8dsGn5DPn03NR0TZw2HN1WRQuw.webp',
          mbtiId: 1,
        }}
      />
    ),
  },
};
