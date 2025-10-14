import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProHero } from "@/components/ui/pro-hero";

describe("ProHero", () => {
  it("renders the upgrade headline and pricing callout", () => {
    render(<ProHero onStartTrial={vi.fn()} />);

    expect(
      screen.getByRole("heading", { name: /Upgrade to Pro/i })
    ).toBeInTheDocument();
    expect(screen.getByText("$9.99")).toBeInTheDocument();
    expect(screen.getByText(/per month/i)).toBeInTheDocument();
  });

  it("invokes the start trial handler when CTA is clicked", async () => {
    const user = userEvent.setup();
    const onStartTrial = vi.fn();

    render(<ProHero onStartTrial={onStartTrial} />);

    await user.click(screen.getByRole("button", { name: /Start Free Trial/i }));

    expect(onStartTrial).toHaveBeenCalledTimes(1);
  });
});
