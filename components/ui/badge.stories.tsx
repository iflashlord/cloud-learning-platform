import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "default",
        "neutral",
        "success",
        "error",
        "warning",
        "info",
        "primary",
        "compute",
        "storage",
        "security",
        "networking",
        "management",
        "aiml",
      ],
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg"],
    },
    emphasis: {
      control: { type: "select" },
      options: ["solid", "soft", "outline"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Default",
    variant: "default",
  },
};

export const Success: Story = {
  args: {
    children: "Completed",
    variant: "success",
  },
};

export const Warning: Story = {
  args: {
    children: "2 Lives Left",
    variant: "warning",
  },
};

export const Outline: Story = {
  args: {
    children: "Read Only",
    variant: "neutral",
    emphasis: "outline",
  },
};

export const SoftBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="success" emphasis="soft">
        Reinforced
      </Badge>
      <Badge variant="error" emphasis="soft">
        Needs Attention
      </Badge>
      <Badge variant="warning" emphasis="soft">
        Expiring Soon
      </Badge>
      <Badge variant="info" emphasis="soft">
        In Review
      </Badge>
    </div>
  ),
};

export const CourseThemes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="compute">EC2</Badge>
      <Badge variant="storage">S3</Badge>
      <Badge variant="security">IAM</Badge>
      <Badge variant="networking">VPC</Badge>
      <Badge variant="management">CloudWatch</Badge>
      <Badge variant="aiml">SageMaker</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge variant="success" size="xs">
        XS
      </Badge>
      <Badge variant="success" size="sm">
        Small
      </Badge>
      <Badge variant="success" size="md">
        Medium
      </Badge>
      <Badge variant="success" size="lg">
        Large
      </Badge>
    </div>
  ),
};
