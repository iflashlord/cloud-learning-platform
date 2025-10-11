import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';
import { CheckCircle, XCircle, Settings, Star, Trophy } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'error', 'danger', 'warning', 'info', 'outline', 'ghost', 'link'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    courseTheme: {
      control: { type: 'select' },
      options: ['compute', 'storage', 'security', 'networking', 'management', 'aiml'],
    },
    loading: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Continue',
    variant: 'primary',
  },
};

export const Success: Story = {
  args: {
    children: 'Complete Lesson',
    variant: 'success',
  },
};

export const Error: Story = {
  args: {
    children: 'Try Again',
    variant: 'error',
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <CheckCircle className="w-5 h-5 mr-2" />
        Continue
      </>
    ),
    variant: 'primary',
  },
};

export const Loading: Story = {
  args: {
    children: 'Processing...',
    variant: 'primary',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    variant: 'primary',
    disabled: true,
  },
};

export const CourseThemes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary" courseTheme="compute">
        <Settings className="w-4 h-4 mr-2" />
        EC2 Compute
      </Button>
      <Button variant="primary" courseTheme="storage">
        <Star className="w-4 h-4 mr-2" />
        S3 Storage
      </Button>
      <Button variant="primary" courseTheme="security">
        <Trophy className="w-4 h-4 mr-2" />
        IAM Security
      </Button>
      <Button variant="primary" courseTheme="networking">
        <CheckCircle className="w-4 h-4 mr-2" />
        VPC Network
      </Button>
      <Button variant="primary" courseTheme="management">
        <Settings className="w-4 h-4 mr-2" />
        CloudWatch
      </Button>
      <Button variant="primary" courseTheme="aiml">
        <XCircle className="w-4 h-4 mr-2" />
        SageMaker
      </Button>
    </div>
  ),
};