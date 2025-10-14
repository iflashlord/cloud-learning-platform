import type { Meta, StoryObj } from '@storybook/react';
import { ActionButtons } from './ActionButtons';
import { ArrowRight, Save, Trash2 } from 'lucide-react';

const meta: Meta<typeof ActionButtons> = {
  title: 'Components/ActionButtons',
  component: ActionButtons,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    alignment: {
      control: { type: 'select' },
      options: ['left', 'center', 'right', 'between', 'around'],
    },
    actions: {
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    alignment: 'right',
    actions: [
      {
        label: 'Cancel',
        variant: 'ghost',
        size: 'sm',
        onClick: () => console.log('Cancel'),
      },
      {
        label: 'Save draft',
        variant: 'secondary',
        size: 'sm',
        icon: <Save className="w-4 h-4" />,
        onClick: () => console.log('Save draft'),
      },
      {
        label: 'Publish',
        variant: 'primary',
        size: 'sm',
        icon: <ArrowRight className="w-4 h-4" />,
        onClick: () => console.log('Publish'),
      },
    ],
  },
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    alignment: 'center',
    actions: [
      {
        label: 'Preview',
        variant: 'outline',
        onClick: () => console.log('Preview'),
      },
      {
        label: 'Duplicate',
        variant: 'secondary',
        onClick: () => console.log('Duplicate'),
      },
      {
        label: 'Delete',
        variant: 'danger',
        icon: <Trash2 className="w-4 h-4" />,
        onClick: () => console.log('Delete'),
      },
    ],
  },
};

export const LoadingState: Story = {
  args: {
    actions: [
      {
        label: 'Save changes',
        variant: 'primary',
        loading: true,
        onClick: () => console.log('Save changes'),
      },
      {
        label: 'Cancel',
        variant: 'ghost',
        onClick: () => console.log('Cancel'),
      },
    ],
  },
};
