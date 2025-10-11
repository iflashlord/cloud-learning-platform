import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const { mockQuests } = vi.hoisted(() => ({
  mockQuests: [
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
}));

const IconStub = () => null;

vi.mock("@/constants", () => ({
  quests: mockQuests,
  POINTS_TO_REFILL: 10,
  QUEST_ICON_MAP: {
    sprout: IconStub,
    search: IconStub,
    flame: IconStub,
    zap: IconStub,
  },
}));

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: React.ComponentProps<"button">) => (
    <button {...props}>{children}</button>
  ),
}));

import { Quests } from "@/components/quests";

describe("Quests component", () => {
  it("highlights the next quest and shows progress summary for the learner", () => {
    render(<Quests points={5} />);

    expect(screen.getByText("Daily Quests")).toBeInTheDocument();
    expect(screen.getByText("Quest Alpha")).toBeInTheDocument();
    expect(screen.getByText("NEXT")).toBeInTheDocument();
    expect(screen.getByText("0 of 4 completed")).toBeInTheDocument();
    expect(screen.getByText("5 XP")).toBeInTheDocument();
  });

  it("injects the most recently completed quest when fewer than three are in progress", () => {
    render(<Quests points={60} />);

    // The most recently completed quest is surfaced before the next available quest
    const displayedTitles = screen.getAllByRole("heading", { level: 4 }).map((node) => node.textContent);
    expect(displayedTitles).toEqual(["Quest Charlie", "Quest Delta"]);

    expect(screen.getByText("Quest Charlie")).toBeInTheDocument();
    expect(screen.getByText("Quest Delta")).toBeInTheDocument();
  });

  it("provides a call-to-action when unfinished quests remain", async () => {
    render(<Quests points={20} />);

    const link = screen.getByRole("button", { name: /continue quest journey/i });
    expect(link).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /view all/i }));
    expect(link.closest("a")?.getAttribute("href")).toBe("/quests");
  });

  it("surfaces the final completed quest and hides the CTA when everything is finished", () => {
    render(<Quests points={100} />);

    expect(screen.getAllByRole("heading", { level: 4 })[0]).toHaveTextContent("Quest Delta");
    expect(screen.queryByRole("button", { name: /continue quest journey/i })).toBeNull();
  });
});
