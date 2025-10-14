import type { Meta, StoryObj } from '@storybook/react';
import { ThemeSwitcher } from './theme-switcher';

const meta: Meta<typeof ThemeSwitcher> = {
  title: 'Components/ThemeSwitcher',
  component: ThemeSwitcher,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'outline', 'ghost', 'compact'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'md',
  },
};

export const Compact: Story = {
  args: {
    variant: 'compact',
    size: 'md',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'md',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm">Small:</span>
        <ThemeSwitcher size="sm" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm">Medium:</span>
        <ThemeSwitcher size="md" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm">Large:</span>
        <ThemeSwitcher size="lg" />
      </div>
    </div>
  ),
};
