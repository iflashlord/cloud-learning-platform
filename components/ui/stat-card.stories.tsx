import type { Meta, StoryObj } from '@storybook/react';
import { StatCard } from './stat-card';
import { Star, Trophy, Target, Users, TrendingUp, AlertCircle } from 'lucide-react';

const meta: Meta<typeof StatCard> = {
  title: 'Design System/StatCard',
  component: StatCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'success', 'warning', 'danger', 'info'],
    },
    icon: {
      control: { type: 'select' },
      options: ['Star', 'Trophy', 'Target', 'Users', 'TrendingUp', 'AlertCircle'],
      mapping: {
        Star: <Star className="w-6 h-6" />,
        Trophy: <Trophy className="w-6 h-6" />,
        Target: <Target className="w-6 h-6" />,
        Users: <Users className="w-6 h-6" />,
        TrendingUp: <TrendingUp className="w-6 h-6" />,
        AlertCircle: <AlertCircle className="w-6 h-6" />,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Total Users',
    value: '1,234',
    subtitle: 'Active learners',
    icon: <Users className="w-6 h-6" />,
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    title: 'Courses',
    value: '42',
    subtitle: 'Available to learn',
    icon: <Star className="w-6 h-6" />,
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Completed',
    value: '156',
    subtitle: 'Tasks finished',
    icon: <Trophy className="w-6 h-6" />,
    trend: { value: '+12%', positive: true },
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'In Progress',
    value: '23',
    subtitle: 'Currently active',
    icon: <Target className="w-6 h-6" />,
    trend: { value: '+5%', positive: true },
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    title: 'Issues',
    value: '3',
    subtitle: 'Need attention',
    icon: <AlertCircle className="w-6 h-6" />,
    trend: { value: '-8%', positive: false },
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Growth Rate',
    value: '24%',
    subtitle: 'This month',
    icon: <TrendingUp className="w-6 h-6" />,
    trend: { value: '+3.2%', positive: true },
  },
};

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
      <StatCard
        variant="primary"
        icon={<Star className="w-6 h-6" />}
        title="Total Courses"
        value="42"
        subtitle="Available to learn"
      />
      <StatCard
        variant="success"
        icon={<Trophy className="w-6 h-6" />}
        title="Completed"
        value="18"
        subtitle="Courses finished"
        trend={{ value: "+12%", positive: true }}
      />
      <StatCard
        variant="warning"
        icon={<Target className="w-6 h-6" />}
        title="In Progress"
        value="3"
        subtitle="Currently learning"
      />
    </div>
  ),
};