import PetCard from '@/src/containers/myDogs/PetCard';

import PlaceCard from '../../PlaceCard';

import type { Place } from '@/src/types/place';
import type { Meta, StoryObj } from '@storybook/react';

import Card from '.';

const meta: Meta<typeof Card> = {
  component: Card,
  title: 'Components/Common/Card',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Card>;

const place: Place = {
  placeId: 1,
  title: '짱멋진 여행지',
  roadAddress: '강원도 어딘가 어쩌구',
  placeImage:
    'https://image.edaily.co.kr/images/Photo/files/NP/S/2020/10/PS20101500220.jpg',
  isHeart: true,
  jibunAddress: '',
  homepage: [],
  openingHour: [],
  phoneNumber: '',
  content: '',
  hashtag: [],
  heartCnt: 0,
  category: '',
};

export const PlaceCardStory: Story = {
  args: {
    children: <PlaceCard place={place} />,
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
