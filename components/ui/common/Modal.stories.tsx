import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal, ConfirmModal } from './Modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    showCloseButton: {
      control: { type: 'boolean' },
    },
    closeOnOverlayClick: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const ModalPlayground = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="space-y-4">
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Create new course"
        description="Set up the high-level details learners will see before enrolling."
        footer={
          <>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button>Save course</Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Course title</label>
            <Input placeholder="AWS Networking Foundations" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Description</label>
            <textarea
              className="w-full rounded-lg border border-input bg-background p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              rows={3}
              placeholder="Help learners master VPC fundamentals with guided labs."
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export const Playground: Story = {
  render: () => <ModalPlayground />,
};

const ConfirmDialogDemo = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 1200);
  };

  return (
    <div className="space-y-4">
      <Button variant="danger" onClick={() => setOpen(true)}>
        Delete course
      </Button>
      <ConfirmModal
        open={open}
        onOpenChange={setOpen}
        title="Delete course?"
        description="This action removes all lessons, challenges, and learner progress for this course."
        confirmVariant="error"
        confirmLabel="Delete"
        loading={loading}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export const ConfirmDialog: Story = {
  render: () => <ConfirmDialogDemo />,
};
