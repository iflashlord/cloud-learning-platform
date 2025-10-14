import type { Meta, StoryObj } from '@storybook/react';
import { CourseProgress } from './course-progress';

const meta: Meta<typeof CourseProgress> = {
  title: 'Components/CourseProgress',
  component: CourseProgress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['compact', 'detailed'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Detailed: Story = {
  args: {
    variant: 'detailed',
    progress: {
      percentage: 72,
      completedChallenges: 18,
      totalChallenges: 25,
    },
  },
};

export const Compact: Story = {
  args: {
    variant: 'compact',
    progress: {
      percentage: 42,
      completedChallenges: 5,
      totalChallenges: 12,
    },
  },
};
