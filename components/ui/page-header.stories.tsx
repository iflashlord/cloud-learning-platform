import type { Meta, StoryObj } from '@storybook/react';
import { PageHeader } from './page-header';
import { Badge } from './badge';
import { Button } from './button';
import { Settings, Star, Plus } from 'lucide-react';

const meta: Meta<typeof PageHeader> = {
  title: 'Design System/PageHeader',
  component: PageHeader,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'centered', 'gradient'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Dashboard',
    description: 'Welcome to your learning dashboard. Track your progress and explore new courses.',
  },
};

export const WithBadge: Story = {
  args: {
    title: 'Course Management',
    description: 'Create and manage your educational content.',
    badge: <Badge variant="success">Pro Feature</Badge>,
  },
};

export const WithActions: Story = {
  args: {
    title: 'Settings',
    description: 'Configure your account preferences and learning settings.',
    actions: (
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <Settings className="w-4 h-4 mr-2" />
          Edit
        </Button>
        <Button variant="primary" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add New
        </Button>
      </div>
    ),
  },
};

export const Centered: Story = {
  args: {
    variant: 'centered',
    title: 'Welcome to Learning Platform',
    description: 'Start your journey with our comprehensive technology courses and certifications.',
    badge: <Badge variant="info">Getting Started</Badge>,
    actions: (
      <div className="flex gap-2">
        <Button variant="outline">Learn More</Button>
        <Button variant="primary">Get Started</Button>
      </div>
    ),
  },
};

export const Gradient: Story = {
  args: {
    variant: 'gradient',
    title: 'Quest Arena',
    description: 'Embark on epic learning adventures and compete with fellow learners.',
    badge: <Badge variant="warning">Adventure Mode</Badge>,
  },
};

export const Complete: Story = {
  args: {
    title: 'Course Catalog',
    description: 'Explore our comprehensive collection of technology courses and certification paths.',
    badge: <Badge variant="primary">Featured</Badge>,
    actions: (
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <Star className="w-4 h-4 mr-2" />
          Favorites
        </Button>
        <Button variant="primary" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Course
        </Button>
      </div>
    ),
  },
};