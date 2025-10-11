import { ThemeSwitcher } from './theme-switcher';

const meta = {
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

export const Default = {
  args: {
    variant: 'default',
    size: 'md',
  },
};

export const Compact = {
  args: {
    variant: 'compact',
    size: 'md',
  },
};

export const Ghost = {
  args: {
    variant: 'ghost',
    size: 'md',
  },
};

export const AllSizes = {
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