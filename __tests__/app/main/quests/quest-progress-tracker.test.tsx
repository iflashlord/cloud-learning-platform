import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("@/components/ui/button", () => ({
  Button: ({ asChild, children, ...props }: any) => {
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, props);
    }
    return <button {...props}>{children}</button>;
  },
}));

import { QuestProgressTracker } from "@/components/quests/QuestProgressTracker";

const sampleQuests = [
  {
    title: "Intro Quest",
    description: "Reach 20 XP",
    value: 20,
    reward: { xp: 5, hearts: 1, badge: "intro" },
    icon: "sprout",
    color: "green",
    difficulty: "Beginner",
    category: "Foundations",
    type: "milestone",
  },
  {
    title: "Consistency Quest",
    description: "Reach 60 XP",
    value: 60,
    reward: { xp: 10, hearts: 2, badge: "consistency" },
    icon: "search",
    color: "blue",
    difficulty: "Beginner",
    category: "Habits",
    type: "streak",
  },
  {
    title: "Mastery Quest",
    description: "Reach 120 XP",
    value: 120,
    reward: { xp: 20, hearts: 3, badge: "mastery" },
    icon: "flame",
    color: "orange",
    difficulty: "Advanced",
    category: "Habits",
    type: "milestone",
  },
];

describe("QuestProgressTracker", () => {
  it("summarises quest status counts and completion percentage", () => {
    render(<QuestProgressTracker quests={sampleQuests} userPoints={70} />);

    expect(screen.getByText("Quest Progress Tracker")).toBeInTheDocument();

    const completedLabel = screen.getByText("Completed");
    expect(completedLabel.previousElementSibling).toHaveTextContent("2");

    const activeLabel = screen.getByText("Active");
    expect(activeLabel.previousElementSibling).toHaveTextContent("1");

    const upcomingLabel = screen.getByText("Upcoming");
    expect(upcomingLabel.previousElementSibling).toHaveTextContent("0");

    expect(screen.getByText("67%")).toBeInTheDocument();
  });

  it("filters quests by category selection", async () => {
    render(<QuestProgressTracker quests={sampleQuests} userPoints={15} />);

    // All quests visible by default
    expect(screen.getAllByRole("heading", { level: 4 }).length).toBe(3);

    await userEvent.click(screen.getByRole("button", { name: "Habits" }));

    const questHeadings = screen.getAllByRole("heading", { level: 4 }).map((node) => node.textContent);
    expect(questHeadings).toEqual(["Consistency Quest", "Mastery Quest"]);

    await userEvent.click(screen.getByRole("button", { name: "All Quests" }));
    expect(screen.getAllByRole("heading", { level: 4 })).toHaveLength(3);
  });
});
