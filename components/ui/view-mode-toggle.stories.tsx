import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ViewModeToggle } from './view-mode-toggle';

const meta: Meta<typeof ViewModeToggle> = {
  title: 'Components/ViewModeToggle',
  component: ViewModeToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const ViewModeTogglePlayground = () => {
  const [mode, setMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="space-y-4">
      <ViewModeToggle viewMode={mode} onViewModeChange={setMode} />
      <p className="text-sm text-muted-foreground">
        Current layout:{' '}
        <span className="font-medium text-foreground">
          {mode === 'grid' ? 'Grid view' : 'List view'}
        </span>
      </p>
    </div>
  );
};

export const Playground: Story = {
  render: () => <ViewModeTogglePlayground />,
};
