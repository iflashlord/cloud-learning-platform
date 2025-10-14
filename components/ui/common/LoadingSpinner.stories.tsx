import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { LoadingSpinner, LoadingOverlay, LoadingState } from './LoadingSpinner';
import { Button } from '@/components/ui/button';

const meta: Meta<typeof LoadingSpinner> = {
  title: 'Components/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'dots', 'pulse', 'refresh'],
    },
    label: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
    variant: 'default',
    label: 'Loading data...',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <LoadingSpinner variant="default" label="Default" />
      <LoadingSpinner variant="dots" label="Dots" />
      <LoadingSpinner variant="pulse" label="Pulse" />
      <LoadingSpinner variant="refresh" label="Refresh" />
    </div>
  ),
};

const OverlayDemo = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <Button onClick={() => setOpen(true)}>Show overlay</Button>
      <LoadingOverlay
        loading={open}
        label="Syncing AWS resources..."
        variant="refresh"
      />
      {open && (
        <div className="mt-4 text-sm text-muted-foreground">
          Overlay is active. Click anywhere on the backdrop to close.
        </div>
      )}
    </div>
  );
};

export const Overlay: Story = {
  render: () => <OverlayDemo />,
};

const LoadingStateDemo = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="w-80 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">Course provisioning</span>
        <Button size="sm" variant="outline" onClick={() => setLoading((prev) => !prev)}>
          Toggle
        </Button>
      </div>
      <LoadingState loading={loading} label="Provisioning labs..." variant="dots">
        <div className="rounded-lg border border-dashed border-primary/40 bg-primary/5 p-4 text-sm text-primary">
          Labs provisioned successfully. Learners can start the challenge.
        </div>
      </LoadingState>
    </div>
  );
};

export const Stateful: Story = {
  render: () => <LoadingStateDemo />,
};
