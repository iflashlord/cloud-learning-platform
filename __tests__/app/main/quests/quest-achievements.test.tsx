import React from "react";
import { render, screen } from "@testing-library/react";

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: React.ComponentProps<"button">) => (
    <button {...props}>{children}</button>
  ),
}));

import { QuestAchievements } from "@/app/(main)/quests/quest-achievements";

describe("QuestAchievements", () => {
  it("displays unlocked versus locked achievements with progress", () => {
    render(
      <QuestAchievements
        userPoints={750}
        completedQuests={4}
        totalQuests={6}
      />,
    );

    expect(screen.getByText("Achievement Gallery")).toBeInTheDocument();

    // Stats summary
    expect(screen.getByText("Unlocked")).toBeInTheDocument();
    expect(screen.getByText("Locked")).toBeInTheDocument();

    // Quest Starter should be unlocked
    expect(screen.getByText("Quest Starter")).toBeInTheDocument();
    expect(screen.getAllByText("Unlocked!").length).toBeGreaterThanOrEqual(1);

    // Quest Master still locked and shows progress
    expect(screen.getByText("Quest Master")).toBeInTheDocument();
    expect(screen.getAllByText("Quest Master")[0].closest("div")).toHaveTextContent("6");
  });

  it("shows progress details for locked achievements and call to action", () => {
    render(
      <QuestAchievements
        userPoints={50}
        completedQuests={1}
        totalQuests={5}
      />,
    );

    // Locked achievements section present with progress indicators
    expect(screen.getByText("Locked Achievements")).toBeInTheDocument();
    expect(screen.getAllByText("Progress").length).toBeGreaterThan(0);

    // CTA button encourages quest continuation
    expect(screen.getByRole("button", { name: /continue quest journey/i })).toBeInTheDocument();
  });
});
