import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "info", "success", "error"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    state: {
      control: { type: "select" },
      options: ["default", "disabled", "readOnly"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Search AWS courses",
    size: "md",
    variant: "default",
  },
};

export const Success: Story = {
  args: {
    placeholder: "Certified Solutions Architect",
    size: "lg",
    variant: "success",
    defaultValue: "AWS SAA-C03",
  },
};

export const Error: Story = {
  args: {
    placeholder: "Enter bucket name",
    size: "md",
    variant: "error",
    defaultValue: "aws-learning-platform",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled input",
    size: "md",
    state: "disabled",
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    placeholder: "Read-only input",
    defaultValue: "Auto-populated value",
    size: "md",
    state: "readOnly",
    readOnly: true,
  },
};
