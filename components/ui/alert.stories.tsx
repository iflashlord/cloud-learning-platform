import type { Meta, StoryObj } from "@storybook/react";
import { Alert, AlertTitle, AlertDescription } from "./alert";
import { ShieldCheck, Info, AlertTriangle, AlertOctagon } from "lucide-react";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "destructive", "success", "warning", "info"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const InfoAlert: Story = {
  args: {
    variant: "info",
    children: (
      <>
        <Info className="h-5 w-5" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can enable system theme sync to automatically match your OS preference.
        </AlertDescription>
      </>
    ),
  },
};

export const SuccessAlert: Story = {
  args: {
    variant: "success",
    children: (
      <>
        <ShieldCheck className="h-5 w-5" />
        <AlertTitle>Deployment complete</AlertTitle>
        <AlertDescription>
          API Gateway and Lambda functions have been deployed to the production environment.
        </AlertDescription>
      </>
    ),
  },
};

export const WarningAlert: Story = {
  args: {
    variant: "warning",
    children: (
      <>
        <AlertTriangle className="h-5 w-5" />
        <AlertTitle>Action required</AlertTitle>
        <AlertDescription>
          Rotate IAM access keys for accounts that have been active longer than 90 days.
        </AlertDescription>
      </>
    ),
  },
};

export const DestructiveAlert: Story = {
  args: {
    variant: "destructive",
    children: (
      <>
        <AlertOctagon className="h-5 w-5" />
        <AlertTitle>Pipeline failed</AlertTitle>
        <AlertDescription>
          The Terraform apply step encountered a permissions issue. Review the deployment logs to
          retry safely.
        </AlertDescription>
      </>
    ),
  },
};
