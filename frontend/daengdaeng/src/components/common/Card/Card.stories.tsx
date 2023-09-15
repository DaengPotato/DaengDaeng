import Card from './Card'
import PlaceCard from '../../PlaceCard/PlaceCard'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Card> = {
  component: Card,
  title: 'Components/Common/Card',
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Card>

export const Place: Story = {
  args: {
    children: (
      <PlaceCard
        place={{
          placeId: 1,
          title: '짱멋진 여행지',
          address: '강원도 어딘가 어쩌구',
          placeImage:
            'https://image.edaily.co.kr/images/Photo/files/NP/S/2020/10/PS20101500220.jpg',
        }}
        isLiked={true}
      />
    ),
  },
}
