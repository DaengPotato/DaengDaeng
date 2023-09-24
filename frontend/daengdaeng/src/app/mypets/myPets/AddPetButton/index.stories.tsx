import type { Meta, StoryObj } from '@storybook/react';

import AddPetButton from '.';

const meta: Meta = {
  title: 'Components/AddPetButton',
  component: AddPetButton,
};

export default meta;

type Story = StoryObj<typeof AddPetButton>;

export const Add: Story = {
  args: {},
};
