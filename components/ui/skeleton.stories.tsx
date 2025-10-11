import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton, SkeletonText, SkeletonCard, SkeletonAvatar } from "./skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#f8fafc" },
        { name: "dark", value: "#0f172a" },
      ],
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "shimmer"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "h-6 w-48",
    variant: "default",
  },
};

export const Shimmer: Story = {
  args: {
    className: "h-6 w-48",
    variant: "shimmer",
  },
};

export const Text: Story = {
  render: () => <SkeletonText lines={4} className="w-72" />,
};

export const CardPlaceholder: Story = {
  render: () => <SkeletonCard className="w-80" />,
};

export const AvatarSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <SkeletonAvatar size="sm" />
      <SkeletonAvatar size="md" />
      <SkeletonAvatar size="lg" />
    </div>
  ),
};
