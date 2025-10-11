import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "./progress";

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "success", "error", "warning", "info", "neutral"],
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg"],
    },
    radius: {
      control: { type: "select" },
      options: ["none", "sm", "full"],
    },
    value: {
      control: { type: "number" },
      min: 0,
      max: 100,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 62,
    variant: "default",
    size: "md",
  },
};

export const Success: Story = {
  args: {
    value: 88,
    variant: "success",
    size: "lg",
  },
};

export const Error: Story = {
  args: {
    value: 35,
    variant: "error",
    size: "md",
  },
};

export const NeutralSm: Story = {
  args: {
    value: 48,
    variant: "neutral",
    size: "sm",
    radius: "sm",
  },
};
