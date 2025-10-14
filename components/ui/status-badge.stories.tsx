import type { Meta, StoryObj } from '@storybook/react';
import { StatusBadge } from './status-badge';

const meta: Meta<typeof StatusBadge> = {
  title: 'Components/StatusBadge',
  component: StatusBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: { type: 'select' },
      options: ['active', 'inactive', 'draft', 'published', 'completed', 'in-progress', 'locked'],
    },
    children: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: {
    status: 'active',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <StatusBadge status="draft" />
      <StatusBadge status="in-progress" />
      <StatusBadge status="published" />
      <StatusBadge status="completed" />
      <StatusBadge status="locked" />
    </div>
  ),
};

export const CustomLabel: Story = {
  args: {
    status: 'in-progress',
    children: 'Reviewing',
  },
};
