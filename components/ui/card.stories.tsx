import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./card";
import { Button } from "./button";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "elevated", "outline", "ghost", "tinted"],
    },
    padding: {
      control: { type: "select" },
      options: ["none", "xs", "sm", "md", "lg", "xl"],
    },
    interactive: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    padding: "lg",
    children: (
      <>
        <CardHeader>
          <CardTitle>AWS Certified Cloud Practitioner</CardTitle>
          <CardDescription>
            Build foundational knowledge with curated content and guided labs to pass the CLF-C02
            certification.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Learn core AWS services, cloud concepts, security, architecture, pricing, and support. Track
            progress with lesson checkpoints and adaptive quizzes.
          </p>
        </CardContent>
        <CardFooter>
          <Button size="sm">Start Learning</Button>
          <Button variant="ghost" size="sm">
            View Modules
          </Button>
        </CardFooter>
      </>
    ),
  },
};

export const Elevated: Story = {
  args: {
    ...Default.args,
    variant: "elevated",
  },
};

export const OutlineInteractive: Story = {
  args: {
    variant: "outline",
    interactive: true,
    padding: "md",
    children: (
      <>
        <CardHeader>
          <CardTitle>Hands-on Lab</CardTitle>
          <CardDescription>Deploy a serverless API with Lambda and API Gateway.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            Estimated time: 45 minutes. Includes guidance, validation, and teardown automation.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="secondary" size="sm">
            Launch Lab
          </Button>
        </CardFooter>
      </>
    ),
  },
};

export const Tinted: Story = {
  args: {
    variant: "tinted",
    padding: "lg",
    children: (
      <>
        <CardHeader>
          <CardTitle>Leaderboard Preview</CardTitle>
          <CardDescription>
            Top performers across this week&apos;s security automation quests.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Alex Johnson</span>
              <span className="font-semibold text-green-600 dark:text-green-400">+340 pts</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Priya Kumar</span>
              <span className="font-semibold text-green-600 dark:text-green-400">+285 pts</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Wei Chen</span>
              <span className="font-semibold text-green-600 dark:text-green-400">+260 pts</span>
            </div>
          </div>
        </CardContent>
      </>
    ),
  },
};
