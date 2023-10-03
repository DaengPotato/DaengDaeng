import type { PlaceWithReview } from '@/src/types/place';
import type { Meta, StoryObj } from '@storybook/react';

import PlaceDetail from '.';

import PlaceExample from '@/public/images/place-example.jpg';

const meta: Meta<typeof PlaceDetail> = {
  title: 'Components/PlaceDetail',
  component: PlaceDetail,
};

export default meta;

type Story = StoryObj<typeof PlaceDetail>;

const placeWithReview: PlaceWithReview = {
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
    heartCnt: 0,
    category: '',
  },
  score: 3,
  keywordList: [
    {
      keywordId: 1,
      keyword: '깨끗해요',
      keywordCnt: 25,
    },
    {
      keywordId: 2,
      keyword: '뛰어놀기 좋아요',
      keywordCnt: 51,
    },
    {
      keywordId: 3,
      keyword: '친절해요',
      keywordCnt: 30,
    },
    {
      keywordId: 4,
      keyword: '힐링돼요',
      keywordCnt: 15,
    },
    {
      keywordId: 5,
      keyword: '프라이빗해요',
      keywordCnt: 4,
    },
  ],
  reviewList: [],
};

export const Place: Story = {
  args: {
    placeWithReview,
  },
};
