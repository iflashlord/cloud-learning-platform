import React from "react";
import { render } from "@testing-library/react";

import Loading from "@/app/(main)/courses/loading";

describe("Courses Loading state", () => {
  it("renders the loader icon", () => {
    const { container } = render(<Loading />);
    const loader = container.querySelector(".lucide-loader");
    expect(loader).not.toBeNull();
  });
});
