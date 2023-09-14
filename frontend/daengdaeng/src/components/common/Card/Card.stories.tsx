import Card from './Card'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Card> = {
  component: Card,
  title: 'Components/Common/Card',
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Card>

export const Test: Story = {
  args: {
    children: (
      <div>
        <h1>Hello</h1>
      </div>
    ),
  },
}
