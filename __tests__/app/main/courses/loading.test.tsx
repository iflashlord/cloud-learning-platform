import React from "react";
import { render } from "@testing-library/react";

import Loading from "@/app/(main)/courses/loading";

describe("Courses Loading state", () => {
  it("renders the loader icon", () => {
    const { container } = render(<Loading />);
    const spinner = container.querySelector(".animate-spin");
    expect(spinner).not.toBeNull();
    expect(container.textContent).toContain("Loading courses...");
  });
});
