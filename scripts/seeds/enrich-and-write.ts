import fs from "fs/promises"
import path from "path"
import { fileURLToPath, pathToFileURL } from "url"

import { enrichCourseWithGuidance } from "./course-utils"
import type { CourseSeed, ChallengeSeed } from "./types"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const COURSES_DIR = path.join(__dirname, "courses")

const isValidIdentifier = (key: string) => /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key)

const indent = (level: number) => "  ".repeat(level)

const serialize = (value: any, level = 0): string => {
  if (value === null) return "null"

  if (Array.isArray(value)) {
    if (value.length === 0) return "[]"
    const inner = value
      .map((item) => `${indent(level + 1)}${serialize(item, level + 1)}`)
      .join(",\n")
    return `[
${inner}
${indent(level)}]`
  }

  const type = typeof value
  if (type === "string") {
    return JSON.stringify(value)
  }
  if (type === "number" || type === "boolean") {
    return String(value)
  }

  if (type === "object") {
    const entries = Object.entries(value).filter(([, v]) => v !== undefined)
    if (entries.length === 0) {
      return "{}"
    }

    const inner = entries
      .map(([key, val]) => {
        const safeKey = isValidIdentifier(key) ? key : JSON.stringify(key)
        return `${indent(level + 1)}${safeKey}: ${serialize(val, level + 1)}`
      })
      .join(",\n")

    return `{
${inner}
${indent(level)}}`
  }

  return "null"
}

type Provider = "AWS" | "Google Cloud" | "Microsoft Azure"

const detectProvider = (courseTitle: string): Provider => {
  const lower = courseTitle.toLowerCase()
  if (lower.includes("google")) return "Google Cloud"
  if (lower.includes("azure") || lower.includes("microsoft")) return "Microsoft Azure"
  return "AWS"
}

const providerContent: Record<
  Provider,
  {
    asyncService: string
    serverless: string
    monitoring: string
    costTool: string
    automation: string
    logging: string
  }
> = {
  AWS: {
    asyncService: "Amazon EventBridge",
    serverless: "AWS Lambda",
    monitoring: "Amazon CloudWatch",
    costTool: "AWS Compute Optimizer",
    automation: "AWS Systems Manager Automation",
    logging: "AWS CloudTrail",
  },
  "Google Cloud": {
    asyncService: "Cloud Pub/Sub",
    serverless: "Cloud Functions",
    monitoring: "Cloud Monitoring",
    costTool: "Active Assist Recommender",
    automation: "Cloud Deploy",
    logging: "Cloud Logging",
  },
  "Microsoft Azure": {
    asyncService: "Azure Event Grid",
    serverless: "Azure Functions",
    monitoring: "Azure Monitor",
    costTool: "Azure Advisor",
    automation: "Azure Automation Runbooks",
    logging: "Azure Monitor Logs",
  },
}

const buildScenarioChallenges = (
  provider: Provider,
  strings = providerContent[provider],
): ChallengeSeed[] => {
  return [
    {
      type: "SELECT",
      order: 1,
      question: `Which ${provider} service best coordinates loosely coupled workloads in an event-driven architecture?`,
      options: [
        { text: strings.asyncService, correct: true },
        { text: strings.serverless },
        { text: strings.monitoring },
      ],
    },
    {
      type: "TRUE_FALSE",
      order: 2,
      question: "Designing for multi-zone redundancy reduces blast radius for regulated workloads.",
      options: [
        { text: "True", correct: true },
        { text: "False" },
      ],
    },
    {
      type: "DRAG_DROP",
      order: 3,
      question: "Arrange the recommended steps when reviewing a critical workload architecture:",
      options: [
        { text: "Capture business requirements", order: 1 },
        { text: "Map managed services to requirements", order: 2 },
        { text: "Design for failure and resiliency", order: 3 },
        { text: "Validate with the Well-Architected/framework review", order: 4 },
      ],
    },
  ]
}

const buildOperationsChallenges = (
  provider: Provider,
  strings = providerContent[provider],
): ChallengeSeed[] => [
  {
    type: "SELECT",
    order: 1,
    question: `Which tool surfaces rightsizing and cost-efficiency recommendations for ${provider} workloads?`,
    options: [
      { text: strings.costTool, correct: true },
      { text: strings.monitoring },
      { text: strings.serverless },
    ],
  },
  {
    type: "ASSIST",
    order: 2,
    question: "Complete: Effective observability runbooks should include ______ triggers for automation.",
    options: [
      { text: "manual" },
      { text: "event-driven", correct: true },
      { text: "quarterly" },
    ],
  },
  {
    type: "SELECT",
    order: 3,
    question: `Which ${provider} service centralizes audit and delivery of operational logs for compliance teams?`,
    options: [
      { text: strings.logging, correct: true },
      { text: strings.automation },
      { text: strings.asyncService },
    ],
  },
]

const addCapstoneUnit = (course: CourseSeed): CourseSeed => {
  const provider = detectProvider(course.title)
  const hasCapstone = course.units.some((unit) => unit.title === "Real-World Application Lab")
  if (hasCapstone) {
    return course
  }

  const newUnitOrder = Math.max(0, ...course.units.map((unit) => unit.order ?? 0)) + 1

  const capstoneUnit = {
    title: "Real-World Application Lab",
    description: `Apply ${course.title} skills to architecture, operations, and optimization scenarios.`,
    order: newUnitOrder,
    lessons: [
      {
        title: "Architecture Decision Review",
        order: 1,
        challenges: buildScenarioChallenges(provider),
      },
      {
        title: "Operations & Optimization Review",
        order: 2,
        challenges: buildOperationsChallenges(provider),
      },
    ],
  }

  return {
    ...course,
    units: [...course.units, capstoneUnit],
  }
}

const run = async () => {
  const files = (await fs.readdir(COURSES_DIR)).filter(
    (file) => file.endsWith(".ts") && file !== "index.ts",
  )

  for (const file of files) {
    const filePath = path.join(COURSES_DIR, file)
    const moduleUrl = pathToFileURL(filePath).href
    const module = await import(moduleUrl)

    const exportKey = Object.keys(module).find((key) => key.endsWith("Course"))
    if (!exportKey) {
      console.warn(`Skipping ${file} (no course export found)`)
      continue
    }

    const augmentedCourse = addCapstoneUnit(module[exportKey])
    const course = enrichCourseWithGuidance(augmentedCourse, { overwrite: true })
    const serialized = serialize(course)

    const content = `import { CourseSeed } from "../types"

export const ${exportKey}: CourseSeed = ${serialized}
`

    await fs.writeFile(filePath, content)
  }
}

run().catch((error) => {
  console.error("Failed to expand seed files:", error)
  process.exit(1)
})
