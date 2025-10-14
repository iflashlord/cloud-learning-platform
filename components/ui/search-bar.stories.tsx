import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SearchBar } from './search-bar';

const meta: Meta<typeof SearchBar> = {
  title: 'Components/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const SearchBarPlayground = () => {
  const [value, setValue] = useState('Solutions Architect');

  return (
    <div className="w-[26rem] max-w-full space-y-3">
      <SearchBar searchTerm={value} onSearchChange={setValue} />
      <div className="text-sm text-muted-foreground">
        Filtered by: <span className="font-medium text-foreground">{value || 'All content'}</span>
      </div>
    </div>
  );
};

export const Playground: Story = {
  render: () => <SearchBarPlayground />,
};
