import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SearchInput } from './search-input';

const meta: Meta<typeof SearchInput> = {
  title: 'Components/SearchInput',
  component: SearchInput,
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

const SearchInputPlayground = () => {
  const [value, setValue] = useState('');

  return (
    <div className="w-[28rem] max-w-full">
      <SearchInput value={value} onChange={setValue} />
      <p className="mt-3 text-sm text-muted-foreground">
        Current query: <span className="font-medium text-foreground">{value || '—'}</span>
      </p>
    </div>
  );
};

export const Playground: Story = {
  render: () => <SearchInputPlayground />,
};
