import type { Meta, StoryObj } from '@storybook/react';

import Modal from '.';


const meta: Meta<typeof Modal> = {
  component: Modal,
  title: 'Components/Common/Modal',
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const ModalStory: Story = {
  args: {
    children: <div>하잉 ㅋㅋ</div>,
  },
};
