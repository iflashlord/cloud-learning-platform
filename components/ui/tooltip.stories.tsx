import type { Meta, StoryObj } from "@storybook/react";
import { SimpleTooltip } from "./tooltip";
import { Info, HelpCircle } from "lucide-react";
import { Button } from "./button";

const meta: Meta<typeof SimpleTooltip> = {
  title: "Components/Tooltip",
  component: SimpleTooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "secondary", "success", "error", "warning", "info"],
    },
    side: {
      control: { type: "select" },
      options: ["top", "right", "bottom", "left"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: "View additional context about this lesson",
    variant: "default",
    side: "top",
    children: (
      <span className="inline-flex items-center gap-2 text-sm text-blue-600">
        Learn more <Info className="h-4 w-4" />
      </span>
    ),
  },
};

export const WithButton: Story = {
  args: {
    content: "Auto-saves progress every 60 seconds.",
    variant: "info",
    side: "bottom",
    children: (
      <Button variant="ghost" size="sm">
        Autosave enabled
      </Button>
    ),
  },
};

export const StatusVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <SimpleTooltip content="Healthy connection to AWS" variant="success">
        <span className="inline-flex items-center gap-1 text-green-600">
          <HelpCircle className="h-4 w-4" />
          Success
        </span>
      </SimpleTooltip>
      <SimpleTooltip content="Some checks require attention" variant="warning">
        <span className="inline-flex items-center gap-1 text-amber-600">
          <HelpCircle className="h-4 w-4" />
          Warning
        </span>
      </SimpleTooltip>
      <SimpleTooltip content="Connection failed" variant="error">
        <span className="inline-flex items-center gap-1 text-red-600">
          <HelpCircle className="h-4 w-4" />
          Error
        </span>
      </SimpleTooltip>
    </div>
  ),
};
