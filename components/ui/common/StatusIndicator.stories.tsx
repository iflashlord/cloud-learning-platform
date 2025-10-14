import type { Meta, StoryObj } from '@storybook/react';
import { StatusIndicator } from './StatusIndicator';

const meta: Meta<typeof StatusIndicator> = {
  title: 'Components/StatusIndicator',
  component: StatusIndicator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: { type: 'select' },
      options: ['success', 'error', 'warning', 'info', 'pending', 'neutral'],
    },
    variant: {
      control: { type: 'select' },
      options: ['badge', 'dot', 'icon'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Badge: Story = {
  args: {
    status: 'success',
    label: 'Deployment healthy',
    variant: 'badge',
    size: 'md',
  },
};

export const Dot: Story = {
  args: {
    status: 'pending',
    label: 'Provisioning resources',
    variant: 'dot',
    size: 'md',
  },
};

export const Icon: Story = {
  args: {
    status: 'warning',
    label: 'Limited capacity',
    variant: 'icon',
    size: 'lg',
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div className="grid gap-3">
      <StatusIndicator status="success" label="Operational" />
      <StatusIndicator status="info" label="Monitoring" variant="icon" />
      <StatusIndicator status="warning" label="Action required" />
      <StatusIndicator status="error" label="Failure detected" variant="badge" />
    </div>
  ),
};
