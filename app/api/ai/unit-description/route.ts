import { NextRequest, NextResponse } from "next/server"

import { isAdmin } from "@/lib/admin"

type UnitDescriptionTemplate = {
  id: string
  keywords: string[]
  tone: string
  structure: (context: TemplateContext) => {
    description: string
    bulletPoints: string[]
  }
}

type TemplateContext = {
  unitTitle: string
  courseTitle?: string
  prompt?: string
}

const UNIT_TEMPLATES: UnitDescriptionTemplate[] = [
  {
    id: "foundations",
    keywords: ["basics", "foundation", "intro", "fundamentals"],
    tone: "Empowering learners to master the essentials",
    structure: ({ unitTitle, courseTitle }) => {
      const courseFragment = courseTitle ? ` inside the ${courseTitle} path` : ""
      return {
        description: `${unitTitle}${courseFragment} helps learners ground themselves in the terminology, mental models, and use cases that every AWS builder relies on. We blend concise walkthroughs with guided practice so the fundamentals stick.`,
        bulletPoints: [
          "Clarify core AWS services and when to reach for them",
          "Reinforce vocabulary with scenario-driven examples",
          "Prime students for the next unit’s hands-on labs",
        ],
      }
    },
  },
  {
    id: "architecture",
    keywords: ["architecture", "design", "resilient", "multi-az", "pattern"],
    tone: "Design-focused with real-world context",
    structure: ({ unitTitle, courseTitle }) => {
      const courseFragment = courseTitle ? `${courseTitle} learners` : "students"
      return {
        description: `${unitTitle} elevates ${courseFragment} from memorizing services to designing resilient workloads. Every lesson revolves around trade-offs, reference architectures, and AWS Well-Architected best practices.`,
        bulletPoints: [
          "Deconstruct live AWS diagrams and discuss failure domains",
          "Practice mapping business requirements to cloud patterns",
          "Document design rationales so decisions are easy to defend",
        ],
      }
    },
  },
  {
    id: "data",
    keywords: ["data", "analytics", "lake", "etl", "insight"],
    tone: "Outcome-driven for data builders",
    structure: ({ unitTitle, courseTitle }) => {
      const courseFragment = courseTitle ? `the ${courseTitle} specialization` : "this unit"
      return {
        description: `${unitTitle} guides learners through the decisions that make or break modern analytics stacks. We pair service deep-dives with practical ingestion, transformation, and visualization workflows so ${courseFragment} feels tangible.`,
        bulletPoints: [
          "Compare storage and compute patterns for analytical workloads",
          "Build an end-to-end pipeline with reliability guardrails",
          "Surface insights by focusing on the KPIs stakeholders crave",
        ],
      }
    },
  },
  {
    id: "security",
    keywords: ["security", "governance", "iam", "compliance", "defense"],
    tone: "Security-first with audit confidence",
    structure: ({ unitTitle, courseTitle }) => {
      const courseFragment = courseTitle ? `${courseTitle} program` : "this program"
      return {
        description: `${unitTitle} ensures teams can deliver features without sacrificing guardrails. We translate AWS shared responsibility into day-to-day workflows so the ${courseFragment} graduates build with confidence.`,
        bulletPoints: [
          "Implement layered defenses with AWS-native services",
          "Automate governance checks to prevent drift",
          "Document decisions so auditors and stakeholders stay aligned",
        ],
      }
    },
  },
]

const FALLBACK_TEMPLATE: UnitDescriptionTemplate = {
  id: "experience",
  keywords: [],
  tone: "Learner-centric narrative",
  structure: ({ unitTitle, courseTitle }) => {
    const courseFragment = courseTitle ? ` in ${courseTitle}` : ""
    return {
      description: `${unitTitle}${courseFragment} keeps momentum high by mixing storytelling with applied labs. Students see why the concept matters, how AWS teams use it, and how to demo their skills back to stakeholders.`,
      bulletPoints: [
        "Frame the unit with a compelling customer scenario",
        "Guide learners from theory to proof-of-concept in each lesson",
        "Surface reflection prompts so knowledge translates to action",
      ],
    }
  },
}

type UnitDescriptionParams = {
  prompt?: string
  unitTitle: string
  courseTitle?: string
}

export async function POST(req: NextRequest) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const body = await req.json()
    const { prompt, unitTitle, courseTitle } = body

    if (!unitTitle) {
      return NextResponse.json({ error: "unitTitle is required" }, { status: 400 })
    }

    const suggestion = synthesizeUnitDescription({ prompt, unitTitle, courseTitle })

    return NextResponse.json({ suggestion })
  } catch (error) {
    console.error("Unit description AI error:", error)
    return NextResponse.json({ error: "Failed to generate description" }, { status: 500 })
  }
}

export function synthesizeUnitDescription({
  prompt,
  unitTitle,
  courseTitle,
}: UnitDescriptionParams) {
  const template = selectTemplate(prompt || unitTitle)
  return template.structure({ unitTitle, courseTitle, prompt })
}

function selectTemplate(input?: string): UnitDescriptionTemplate {
  if (!input) return FALLBACK_TEMPLATE
  const lower = input.toLowerCase()
  return (
    UNIT_TEMPLATES.find((template) => template.keywords.some((keyword) => lower.includes(keyword))) ||
    FALLBACK_TEMPLATE
  )
}
