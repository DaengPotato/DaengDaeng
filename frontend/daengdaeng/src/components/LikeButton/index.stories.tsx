import type { Meta, StoryObj } from '@storybook/react';

import LikeButton from '.';


const meta: Meta = {
  title: 'Components/LikeButton',
  component: LikeButton,
};

export default meta;

type Story = StoryObj<typeof LikeButton>;

export const Liked: Story = {
  args: {
    isLiked: true,
  },
};

export const NotLiked: Story = {
  args: {
    isLiked: false,
  },
};
