import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from './separator';

const meta: Meta<typeof Separator> = {
  title: 'Components/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    decorative: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
        Section Title
      </h4>
      <Separator />
      <p className="text-sm text-muted-foreground">
        Separate content areas inside cards, drawers, or layout columns.
      </p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-24 items-center gap-4">
      <span className="text-sm font-medium text-muted-foreground">Details</span>
      <Separator orientation="vertical" className="h-full" />
      <span className="text-sm text-muted-foreground">
        Use a vertical divider to split compact toolbars or filter panels.
      </span>
    </div>
  ),
};
