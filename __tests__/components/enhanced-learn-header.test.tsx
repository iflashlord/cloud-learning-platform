import React from "react";
import { render, screen } from "@testing-library/react";

import { EnhancedLearnHeader } from "@/components/enhanced-learn-header";

describe("EnhancedLearnHeader", () => {
  it("renders progress cards and calculates percentages", () => {
    const { container } = render(
      <EnhancedLearnHeader
        title="AWS Developer Path"
        totalUnits={4}
        completedUnits={2}
        totalLessons={8}
        completedLessons={3}
      />
    );

    expect(screen.getByText("AWS Developer Path")).toBeInTheDocument();
    expect(container.querySelector('a[href="/courses"]')).not.toBeNull();

    expect(screen.getByText(/Units Progress/i)).toBeInTheDocument();
    expect(screen.getByText(/Lessons Progress/i)).toBeInTheDocument();
    expect(screen.getByText(/Overall Progress/i)).toBeInTheDocument();

    expect(screen.getByText("50%"))
      .toBeInTheDocument();
    expect(screen.getByText("38%"))
      .toBeInTheDocument();
    expect(screen.getByText("44%"))
      .toBeInTheDocument();
  });

  it("hides progress cards when totals are zero", () => {
    render(<EnhancedLearnHeader title="Starter" />);

    expect(screen.queryByText(/Units Progress/i)).toBeNull();
    expect(screen.queryByText(/Lessons Progress/i)).toBeNull();
    expect(screen.queryByText(/Overall Progress/i)).toBeNull();
  });
});
