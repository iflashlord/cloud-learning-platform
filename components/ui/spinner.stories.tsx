import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./spinner";

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "secondary", "success", "error", "warning", "info", "muted"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "md",
    variant: "default",
  },
};

export const Success: Story = {
  args: {
    size: "lg",
    variant: "success",
  },
};

export const Inline: Story = {
  render: () => (
    <div className="flex items-center gap-3 text-sm text-muted-foreground">
      <Spinner size="sm" variant="info" />
      Provisioning lab infrastructure...
    </div>
  ),
};
