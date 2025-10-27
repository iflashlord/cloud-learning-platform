import { describe, expect, it } from "vitest"

import { synthesizeUnitDescription } from "@/app/api/ai/unit-description/route"

describe("synthesizeUnitDescription", () => {
  it("returns architecture-focused description when keywords match", () => {
    const result = synthesizeUnitDescription({
      prompt: "Need a resilient architecture focus",
      unitTitle: "Designing Multi-AZ Systems",
      courseTitle: "AWS Solutions Architect",
    })

    expect(result.description).toContain("Designing Multi-AZ Systems")
    expect(result.description).toContain("resilient workloads")
    expect(result.bulletPoints).toHaveLength(3)
  })

  it("falls back gracefully when no keywords are provided", () => {
    const result = synthesizeUnitDescription({
      prompt: "",
      unitTitle: "Custom Workshop",
    })

    expect(result.description).toContain("Custom Workshop")
    expect(result.bulletPoints.length).toBeGreaterThan(0)
  })
})
