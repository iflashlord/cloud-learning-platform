import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './empty-state';
import { Inbox, FolderPlus, Compass } from 'lucide-react';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f8fafc' },
        { name: 'dark', value: '#0f172a' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'minimal', 'full'],
    },
    icon: {
      control: false,
    },
    action: {
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    title: 'No courses yet',
    description: 'Start by creating your first course to guide learners through AWS fundamentals.',
    icon: <Inbox className="w-6 h-6" />,
  },
};

export const Minimal: Story = {
  args: {
    variant: 'minimal',
    title: 'No search results',
    description: 'Try adjusting your filters or searching for a different topic.',
  },
};

export const FullWithAction: Story = {
  args: {
    variant: 'full',
    title: 'Build your first learning path',
    description:
      'Combine quests, challenges, and assessments into a structured journey to accelerate learner outcomes.',
    icon: <Compass className="w-8 h-8" />,
    action: {
      label: 'Create learning path',
      onClick: () => console.log('Create learning path'),
      variant: 'primary',
    },
  },
};

export const CustomAction: Story = {
  render: () => (
    <EmptyState
      variant="default"
      title="Launch a new module"
      description="Organize content into modules to highlight real-world AWS scenarios."
      icon={<FolderPlus className="w-6 h-6" />}
      action={{
        label: 'Add module',
        onClick: () => console.log('Add module'),
        variant: 'secondary',
      }}
    />
  ),
};
