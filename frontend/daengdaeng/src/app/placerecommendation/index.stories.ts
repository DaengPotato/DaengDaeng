import Loading from './loading';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Loading',
  component: Loading,
};

export default meta;

type Story = StoryObj<typeof Loading>;

export const PlaceRecommendation: Story = {
  args: {},
};
