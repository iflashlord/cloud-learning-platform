import type { Meta, StoryObj } from '@storybook/react';
import { FormSection } from './FormSection';
import { Input } from '../input';
import { Button } from '../button';

const meta: Meta<typeof FormSection> = {
  title: 'Components/FormSection',
  component: FormSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    collapsible: {
      control: { type: 'boolean' },
    },
    defaultCollapsed: {
      control: { type: 'boolean' },
    },
    required: {
      control: { type: 'boolean' },
    },
    error: {
      control: { type: 'text' },
    },
    children: {
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Course details',
    description: 'Provide a concise summary learners will see before enrolling.',
    required: true,
    children: (
      <div className="space-y-3">
        <Input placeholder="Course title" />
        <Input placeholder="Optional subtitle" />
      </div>
    ),
  },
};

export const Collapsible: Story = {
  args: {
    title: 'Advanced settings',
    description: 'Configure enrollment rules and prerequisite requirements.',
    collapsible: true,
    defaultCollapsed: true,
    children: (
      <div className="space-y-3">
        <Input placeholder="Prerequisite course" />
        <Input placeholder="Minimum score to unlock" />
      </div>
    ),
  },
};

export const WithError: Story = {
  args: {
    title: 'Publishing requirements',
    required: true,
    error: 'Please provide a course description before publishing.',
    children: (
      <div className="space-y-3">
        <Input placeholder="Course description" />
        <div className="flex justify-end gap-2">
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary">Save draft</Button>
        </div>
      </div>
    ),
  },
};
