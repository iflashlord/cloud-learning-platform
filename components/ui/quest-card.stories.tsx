import type { Meta, StoryObj } from '@storybook/react';
import { QuestCard } from './quest-card';
import { Star, Trophy, Target, Code, Cpu, Database } from 'lucide-react';

const meta: Meta<typeof QuestCard> = {
  title: 'Design System/QuestCard',
  component: QuestCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    quest: {
      control: false,
    },
    progress: {
      control: { type: 'number' },
      min: 0,
      max: 100,
    },
    userPoints: {
      control: { type: 'number' },
      min: 0,
    },
    isCompleted: {
      control: { type: 'boolean' },
    },
    isNext: {
      control: { type: 'boolean' },
    },
    isLocked: {
      control: { type: 'boolean' },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    quest: {
      title: 'JavaScript Fundamentals',
      description: 'Learn the basics of JavaScript programming including variables, functions, and control structures.',
      value: 100,
      reward: {
        xp: 50,
        hearts: 3,
        badge: 'JS Beginner'
      },
      icon: ({ className }: { className?: string }) => <Code className={className} />,
      color: 'blue',
      difficulty: 'Beginner',
      category: 'Programming',
      type: 'course'
    },
    progress: 45,
    userPoints: 45,
    isCompleted: false,
    isNext: false,
  },
};

export const NextQuest: Story = {
  args: {
    quest: {
      title: 'React Components',
      description: 'Master React component creation and state management for modern web development.',
      value: 250,
      reward: {
        xp: 100,
        hearts: 5,
        badge: 'React Pro'
      },
      icon: ({ className }: { className?: string }) => <Star className={className} />,
      color: 'green',
      difficulty: 'Intermediate',
      category: 'Frontend',
      type: 'specialization'
    },
    progress: 75,
    userPoints: 187,
    isCompleted: false,
    isNext: true,
  },
};

export const Completed: Story = {
  args: {
    quest: {
      title: 'Python Mastery',
      description: 'Complete mastery of Python programming with advanced concepts and frameworks.',
      value: 500,
      reward: {
        xp: 200,
        hearts: 10,
        badge: 'Python Expert'
      },
      icon: ({ className }: { className?: string }) => <Trophy className={className} />,
      color: 'gold',
      difficulty: 'Expert',
      category: 'Backend',
      type: 'mastery'
    },
    progress: 100,
    userPoints: 500,
    isCompleted: true,
    isNext: false,
  },
};

export const Locked: Story = {
  args: {
    quest: {
      title: 'Advanced Algorithms',
      description: 'Deep dive into complex algorithms and data structures for competitive programming.',
      value: 750,
      reward: {
        xp: 300,
        hearts: 15,
        badge: 'Algorithm Master'
      },
      icon: ({ className }: { className?: string }) => <Cpu className={className} />,
      color: 'purple',
      difficulty: 'Expert',
      category: 'Computer Science',
      type: 'advanced'
    },
    progress: 0,
    userPoints: 0,
    isCompleted: false,
    isNext: false,
    isLocked: true,
  },
};

export const GoldQuest: Story = {
  args: {
    quest: {
      title: 'Database Architecture',
      description: 'Design and optimize complex database systems for enterprise applications.',
      value: 400,
      reward: {
        xp: 150,
        hearts: 8,
        badge: 'DB Architect'
      },
      icon: ({ className }: { className?: string }) => <Database className={className} />,
      color: 'gold',
      difficulty: 'Advanced',
      category: 'Database',
      type: 'architecture'
    },
    progress: 60,
    userPoints: 240,
    isCompleted: false,
    isNext: false,
  },
};

export const PlatinumQuest: Story = {
  args: {
    quest: {
      title: 'Full Stack Mastery',
      description: 'Complete full-stack development mastery covering frontend, backend, and DevOps.',
      value: 1000,
      reward: {
        xp: 500,
        hearts: 20,
        badge: 'Full Stack Master'
      },
      icon: ({ className }: { className?: string }) => <Target className={className} />,
      color: 'platinum',
      difficulty: 'Expert',
      category: 'Full Stack',
      type: 'ultimate'
    },
    progress: 85,
    userPoints: 850,
    isCompleted: false,
    isNext: false,
  },
};

export const QuestGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
      <QuestCard
        quest={{
          title: 'JavaScript Basics',
          description: 'Learn the fundamentals of JavaScript programming.',
          value: 100,
          reward: { xp: 50, hearts: 3, badge: 'JS Beginner' },
          icon: ({ className }: { className?: string }) => <Code className={className} />,
          color: 'blue',
          difficulty: 'Beginner',
          category: 'Programming',
          type: 'course'
        }}
        progress={45}
        userPoints={45}
        isCompleted={false}
        isNext={true}
      />
      <QuestCard
        quest={{
          title: 'Python Mastery',
          description: 'Master Python programming from basics to advanced.',
          value: 300,
          reward: { xp: 150, hearts: 8, badge: 'Python Pro' },
          icon: ({ className }: { className?: string }) => <Trophy className={className} />,
          color: 'green',
          difficulty: 'Advanced',
          category: 'Programming',
          type: 'mastery'
        }}
        progress={100}
        userPoints={300}
        isCompleted={true}
        isNext={false}
      />
    </div>
  ),
};
