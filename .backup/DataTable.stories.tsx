import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DataTable } from './DataTable';
import { Badge } from '../badge';

type CourseRow = {
  id: number;
  course: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'Draft' | 'Published' | 'Review';
  updatedAt: string;
};

const sampleData: CourseRow[] = [
  { id: 1, course: 'AWS Foundations', level: 'Beginner', status: 'Published', updatedAt: '2024-04-01' },
  { id: 2, course: 'Serverless Architectures', level: 'Intermediate', status: 'Review', updatedAt: '2024-03-24' },
  { id: 3, course: 'Security Automation', level: 'Advanced', status: 'Draft', updatedAt: '2024-03-18' },
  { id: 4, course: 'Data Engineering on AWS', level: 'Advanced', status: 'Published', updatedAt: '2024-02-12' },
  { id: 5, course: 'Observability Best Practices', level: 'Intermediate', status: 'Published', updatedAt: '2024-01-30' },
];

const courseColumns = [
  { key: 'course', header: 'Course', sortable: true },
  { key: 'level', header: 'Level', sortable: true },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    render: (value: CourseRow['status']) => (
      <Badge
        variant={value === 'Published' ? 'success' : value === 'Review' ? 'warning' : 'neutral'}
        size="sm"
      >
        {value}
      </Badge>
    ),
  },
  { key: 'updatedAt', header: 'Updated', sortable: true },
];

const DefaultTable = () => (
  <div className="max-w-3xl">
    <DataTable<CourseRow>
      data={sampleData}
      columns={courseColumns}
      searchable
      searchPlaceholder="Search courses"
      emptyMessage="No courses to display"
    />
  </div>
);

const TableWithSelection = () => {
  const [selectedCourse, setSelectedCourse] = useState<CourseRow | null>(null);

  return (
    <div className="space-y-4 max-w-3xl">
      <DataTable<CourseRow>
        data={sampleData}
        columns={courseColumns}
        searchable
        onRowClick={(row) => setSelectedCourse(row)}
      />

      {selectedCourse && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          Selected: <strong>{selectedCourse.course}</strong> ({selectedCourse.level})
        </div>
      )}
    </div>
  );
};

const LoadingTable = () => (
  <div className="max-w-3xl">
    <DataTable<CourseRow> data={[]} columns={courseColumns} loading />
  </div>
);

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    data: { control: false },
    columns: { control: false },
    onRowClick: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <DefaultTable />,
};

export const WithRowClick: Story = {
  render: () => <TableWithSelection />,
};

export const Loading: Story = {
  render: () => <LoadingTable />,
};
