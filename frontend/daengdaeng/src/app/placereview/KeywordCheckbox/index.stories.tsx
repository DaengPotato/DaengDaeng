import type { Meta, StoryObj } from '@storybook/react';

import KeywordCheckbox from '.';

const meta: Meta = {
  title: 'Components/KeywordCheckbox',
  component: KeywordCheckbox,
};

export default meta;

type Story = StoryObj<typeof KeywordCheckbox>;

export const Checkbox: Story = {
  args: {
    keyword: {
      keywordId: 1,
      keyword: '바다가보여요',
    },
  },
};
