import type { Meta, StoryObj } from '@storybook/react';

import KeywordReviewItem from '.';



const meta: Meta = {
  title: 'Components/KeywordReviewItem',
  component: KeywordReviewItem,
};

export default meta;

type Story = StoryObj<typeof KeywordReviewItem>;

export const KeywordReview: Story = {
  args: {
    keyword: {
      keywordId: 0,
      keyword: '깨끗해요',
      keywordCnt: 10,
    },
  },
};
