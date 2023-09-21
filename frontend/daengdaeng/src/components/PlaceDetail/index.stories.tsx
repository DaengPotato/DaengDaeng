import type { PlaceDetailWithReview } from '@/src/types/place';
import type { Meta, StoryObj } from '@storybook/react';

import PlaceDetail from '.';

const meta: Meta<typeof PlaceDetail> = {
  title: 'Components/PlaceDetail',
  component: PlaceDetail,
};

export default meta;

type Story = StoryObj<typeof PlaceDetail>;

const placeDetailWithReview: PlaceDetailWithReview = {
  place: {
    placeId: 1,
    title: '짱멋진 여행지',
    address: '강원도 어딘가 어쩌구',
    placeImage:
      'https://image.edaily.co.kr/images/Photo/files/NP/S/2020/10/PS20101500220.jpg',
  },
  isHeart: true,
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
    placeDetailWithReview,
  },
};
