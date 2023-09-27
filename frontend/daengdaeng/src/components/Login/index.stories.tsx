import type { Meta, StoryObj } from '@storybook/react';

import Login from '.';

// import PlaceExample from '@/public/images/place-example.jpg';

const meta: Meta<typeof Login> = {
  title: 'Components/Login',
  component: Login,
};

export default meta;

type Story = StoryObj<typeof Login>;

export const LoginPage: Story = {

};