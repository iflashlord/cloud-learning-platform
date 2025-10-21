import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const { testQuests, IconStub } = vi.hoisted(() => ({
  testQuests: [
    {
      title: "Quest Alpha",
      description: "Earn 10 XP",
      value: 10,
      reward: { xp: 5, hearts: 1, badge: "alpha" },
      icon: "sprout",
      color: "green",
      difficulty: "Beginner",
      category: "Intro",
      type: "milestone",
    },
    {
      title: "Quest Bravo",
      description: "Score 25 XP",
      value: 25,
      reward: { xp: 10, hearts: 1, badge: "bravo" },
      icon: "search",
      color: "blue",
      difficulty: "Beginner",
      category: "Intro",
      type: "milestone",
    },
    {
      title: "Quest Charlie",
      description: "Reach 50 XP",
      value: 50,
      reward: { xp: 15, hearts: 2, badge: "charlie" },
      icon: "flame",
      color: "orange",
      difficulty: "Intermediate",
      category: "Growth",
      type: "milestone",
    },
    {
      title: "Quest Delta",
      description: "Reach 75 XP",
      value: 75,
      reward: { xp: 20, hearts: 2, badge: "delta" },
      icon: "zap",
      color: "purple",
      difficulty: "Intermediate",
      category: "Growth",
      type: "milestone",
    },
  ],
  IconStub: () => <span data-testid="icon" />,
}));

vi.mock("@/constants", () => ({
  quests: testQuests,
  POINTS_TO_REFILL: 10,
  QUEST_ICON_MAP: {
    sprout: IconStub,
    search: IconStub,
    flame: IconStub,
    zap: IconStub,
  },
}));

vi.mock("@/components/ui/button", () => ({
  Button: ({ asChild, children, ...props }: any) => {
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, props);
    }
    return <button {...props}>{children}</button>;
  },
}));

import { Quests } from "@/components/quests";

describe("Quests component", () => {
  it("renders the next quest with progress details and summary", () => {
    render(<Quests points={5} />);

    expect(screen.getByText("Daily Quests")).toBeInTheDocument();
    expect(screen.getByText("0/4 Complete")).toBeInTheDocument();
    expect(screen.getByText("5 XP")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 4, name: "Quest Alpha" })).toBeInTheDocument();
    expect(screen.getByText("5/10 XP")).toBeInTheDocument();
    expect(screen.getByText("50%")).toBeInTheDocument();
  });

  it("limits the list to the next two incomplete quests", () => {
    render(<Quests points={0} />);

    const displayedTitles = screen
      .getAllByRole("heading", { level: 4 })
      .map((node) => node.textContent);
    expect(displayedTitles).toEqual(["Quest Alpha", "Quest Bravo"]);
  });

  it("provides a call-to-action link and view-all shortcut when quests remain", async () => {
    const user = userEvent.setup();
    render(<Quests points={20} />);

    const continueLink = screen.getByRole("link", { name: /Continue Quests/i });
    expect(continueLink).toHaveAttribute("href", "/quests");

    const viewAllButton = screen.getByRole("button", { name: /View All/i });
    expect(viewAllButton.closest("a")).toHaveAttribute("href", "/quests");

    await user.click(viewAllButton);
    expect(screen.getByRole("button", { name: /View All/i }).closest("a")).toHaveAttribute(
      "href",
      "/quests"
    );
  });

  it("shows the completion message and hides the CTA when all quests are complete", () => {
    render(<Quests points={100} />);

    expect(screen.getByText("All quests completed!")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Continue Quests/i })).toBeNull();
  });
});
