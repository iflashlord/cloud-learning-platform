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
  it("displays overall progress and quick stats", () => {
    render(<QuestProgressTracker quests={sampleQuests} userPoints={70} />);

    expect(screen.getByText("Quest Progress")).toBeInTheDocument();
    expect(screen.getByText("Overall Progress")).toBeInTheDocument();
    expect(screen.getByText("67%")).toBeInTheDocument();

    const completed = screen.getByText("Completed");
    expect(completed.previousElementSibling).toHaveTextContent("2");

    const remaining = screen.getByText("Remaining");
    expect(remaining.previousElementSibling).toHaveTextContent("1");

    expect(screen.getByText("70")).toBeInTheDocument();
    expect(screen.getByText("120")).toBeInTheDocument();
  });

  it("highlights the next quest with progress and rewards", () => {
    render(<QuestProgressTracker quests={sampleQuests} userPoints={40} />);

    expect(screen.getByText("Next: Consistency Quest")).toBeInTheDocument();
    expect(screen.getByText("40 / 60 XP")).toBeInTheDocument();
    expect(screen.getByText("+10 XP reward")).toBeInTheDocument();
  });

  it("switches the active category button", async () => {
    render(<QuestProgressTracker quests={sampleQuests} userPoints={70} />);

    const allButton = screen.getByRole("button", { name: /all/i });
    const habitsButton = screen.getByRole("button", { name: "Habits" });

    expect(allButton.getAttribute("variant")).toBe("primary");
    expect(habitsButton.getAttribute("variant")).toBe("ghost");

    await userEvent.click(habitsButton);

    expect(habitsButton.getAttribute("variant")).toBe("primary");
    expect(allButton.getAttribute("variant")).toBe("ghost");

    expect(screen.getByText("Foundations", { selector: "span" })).toBeInTheDocument();
    expect(screen.getByText("1/1")).toBeInTheDocument();
    expect(screen.getByText("1/2")).toBeInTheDocument();
  });
});
