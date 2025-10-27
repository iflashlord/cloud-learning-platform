import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';
import {
  CheckCircle,
  XCircle,
  Settings,
  Star,
  Trophy,
  ArrowRight,
  Play,
  Upload,
  ShieldCheck,
} from 'lucide-react';

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
    options: [
      'primary',
      'secondary',
      'success',
      'error',
      'danger',
      'warning',
      'info',
      'ghost',
      'outline',
      'subtle',
      'elevation',
      'link',
      'ai',
      'compute',
      'storage',
      'security',
      'networking',
      'management',
      'aiml',
      'locked',
      'sidebar',
      'sidebarOutline',
    ],
  },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'icon'],
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
    animateSuccess: {
      control: { type: 'boolean' },
    },
    animateError: {
      control: { type: 'boolean' },
    },
    leftIcon: {
      control: false,
    },
    rightIcon: {
      control: false,
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

export const WithLeftIcon: Story = {
  args: {
    children: 'Start Lab',
    leftIcon: <Play className="w-5 h-5" />,
    variant: 'primary',
  },
};

export const WithRightIcon: Story = {
  args: {
    children: 'Continue',
    rightIcon: <ArrowRight className="w-5 h-5" />,
    variant: 'secondary',
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
        <Play className="w-4 h-4 mr-2" />
        EC2 Compute
      </Button>
      <Button variant="primary" courseTheme="storage">
        <Upload className="w-4 h-4 mr-2" />
        S3 Storage
      </Button>
      <Button variant="primary" courseTheme="security">
        <ShieldCheck className="w-4 h-4 mr-2" />
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

export const IconButton: Story = {
  args: {
    variant: 'ghost',
    size: 'icon',
    children: <Settings className="w-5 h-5" />,
  },
};

export const LegacyVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="locked" disabled>
        Locked
      </Button>
      <Button variant="sidebar">Sidebar</Button>
      <Button variant="sidebarOutline">Outline</Button>
    </div>
  ),
};

export const AnimatedStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="success" animateSuccess>
        Success Pulse
      </Button>
      <Button variant="error" animateError>
        Error Pulse
      </Button>
    </div>
  ),
};
