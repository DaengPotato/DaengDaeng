import Button from './Button'

import type { Meta, StoryObj } from '@storybook/react'


const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Components/Common/Button',
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    text: 'Button',
    size: 'medium',
    backgroundColor: 'orange',
    icon: true,
  },
}

export const Cancel: Story = {
  args: {
    text: 'Button',
    size: 'medium',
    backgroundColor: 'gray',
    icon: true,
  },
}

export const Small: Story = {
  args: {
    ...Primary.args,
    size: 'small',
  },
}

export const Large: Story = {
  args: {
    ...Primary.args,
    size: 'large',
  },
}

export const LongText: Story = {
  args: {
    text: '댕BTI 검사하고 여행지 추천 받으러 가기',
    size: 'medium',
    backgroundColor: 'orange',
    icon: true,
  },
}
