import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Pagination } from './pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onPageChange: {
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const PaginationPlayground = () => {
  const [page, setPage] = useState(3);

  return (
    <div className="space-y-4">
      <Pagination
        currentPage={page}
        totalPages={12}
        totalItems={120}
        showTotal
        onPageChange={(next) => setPage(Math.max(1, Math.min(12, next)))}
      />
      <div className="text-sm text-muted-foreground text-center">
        Viewing page <span className="font-semibold text-foreground">{page}</span> of 12
      </div>
    </div>
  );
};

const MinimalPagination = () => {
  const [page, setPage] = useState(1);

  return (
    <Pagination currentPage={page} totalPages={4} onPageChange={(next) => setPage(next)} />
  );
};

export const Interactive: Story = {
  render: () => <PaginationPlayground />,
};

export const Minimal: Story = {
  render: () => <MinimalPagination />,
};
