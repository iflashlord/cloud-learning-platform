import type { Meta, StoryObj } from "@storybook/react";
import { EnhancedLearnHeader } from "./enhanced-learn-header";

const meta: Meta<typeof EnhancedLearnHeader> = {
  title: "Learn/EnhancedLearnHeader",
  component: EnhancedLearnHeader,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof EnhancedLearnHeader>;

export const Default: Story = {
  args: {
    title: "AWS Developer Path",
    totalUnits: 6,
    completedUnits: 3,
    totalLessons: 24,
    completedLessons: 10,
  },
};

export const MinimalProgress: Story = {
  args: {
    title: "Getting Started",
    totalUnits: 4,
    completedUnits: 1,
    totalLessons: 12,
    completedLessons: 2,
  },
};

export const Completed: Story = {
  args: {
    title: "Cloud Practitioner Certification",
    totalUnits: 5,
    completedUnits: 5,
    totalLessons: 20,
    completedLessons: 20,
  },
};

export const NoProgressData: Story = {
  args: {
    title: "New Learning Path",
  },
};
