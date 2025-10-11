import { Badge } from './badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'success', 'error', 'warning', 'info', 'primary', 'compute', 'storage', 'security', 'networking', 'management', 'aiml'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;

export const Default = {
  args: {
    children: 'Default',
    variant: 'default',
  },
};

export const Success = {
  args: {
    children: 'Completed',
    variant: 'success',
  },
};

export const Warning = {
  args: {
    children: '2 Lives Left',
    variant: 'warning',
  },
};

export const Error = {
  args: {
    children: 'Failed',
    variant: 'error',
  },
};

export const CourseThemes = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="compute">EC2</Badge>
      <Badge variant="storage">S3</Badge>
      <Badge variant="security">IAM</Badge>
      <Badge variant="networking">VPC</Badge>
      <Badge variant="management">CloudWatch</Badge>
      <Badge variant="aiml">SageMaker</Badge>
    </div>
  ),
};

export const Sizes = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge variant="success" size="sm">Small</Badge>
      <Badge variant="success" size="md">Medium</Badge>
      <Badge variant="success" size="lg">Large</Badge>
    </div>
  ),
};