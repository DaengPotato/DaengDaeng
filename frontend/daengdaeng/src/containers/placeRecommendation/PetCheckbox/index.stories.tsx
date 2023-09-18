import PetCheckbox from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Components/PetCheckbox',
  component: PetCheckbox,
};

export default meta;

type Story = StoryObj<typeof PetCheckbox>;

export const Checkbox: Story = {
  args: {
    pet: {
      petId: 1,
      name: '마루',
    },
  },
};
