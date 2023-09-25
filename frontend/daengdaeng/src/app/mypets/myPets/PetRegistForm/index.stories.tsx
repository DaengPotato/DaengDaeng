import PetRegistForm from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Components/PetRegistForm',
  component: PetRegistForm,
};

export default meta;

type Story = StoryObj<typeof PetRegistForm>;

export const PetRegist: Story = {
  args: {},
};
