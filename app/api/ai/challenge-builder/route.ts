import { NextRequest, NextResponse } from "next/server"

import { isAdmin } from "@/lib/admin"

type ChallengeType =
  | "SELECT"
  | "ASSIST"
  | "TRUE_FALSE"
  | "DRAG_DROP"
  | "TEXT_INPUT"
  | "IMAGE_SELECT"
  | "LISTENING"
  | "SPEECH_INPUT"
  | "VIDEO"

type AIDifficulty = "Beginner" | "Intermediate" | "Advanced"

type LessonContext = {
  title?: string
  unitTitle?: string
  courseTitle?: string
}

type ChallengeOptionSuggestion = {
  text: string
  correct: boolean
  guide: string
  order?: number
}

export type ChallengeBuilderSuggestion = {
  question: string
  hint: string
  explanation: string
  writingTips: string[]
  challengeOptions: ChallengeOptionSuggestion[]
}

type SuggestionMode = "full" | "answers"

type ChallengeBuilderParams = {
  prompt?: string
  challengeType?: ChallengeType
  difficulty?: AIDifficulty
  lesson?: LessonContext
  mode?: SuggestionMode
  questionContext?: {
    question: string
    hint?: string
  }
  answerCount?: number
}

type TemplateOption = {
  text: string
  guide: string
  correct: boolean
}

type Template = {
  id: string
  keywords: string[]
  topic: string
  scenario: string
  question: string
  hint: string
  explanation: string
  options: TemplateOption[]
  writingCue: string
  trueStatement: string
  trueGuide: string
  falseGuide: string
  trueIsCorrect: boolean
  dragPrompt: string
  dragSteps: string[]
}

const TEMPLATE_LIBRARY: Template[] = [
  {
    id: "cost",
    keywords: ["cost", "budget", "spend", "billing", "finance", "optimize", "savings"],
    topic: "Cost Optimization & Visibility",
    scenario: "a finance review across multiple AWS accounts",
    question:
      "During {{scenario}} focused on {{topic}}, which action gives stakeholders the clearest insight into unexpected spend?",
    hint: "Look for AWS tooling that pairs detailed tagging with proactive alerts.",
    explanation:
      "AWS Cost Explorer surfaces trends while AWS Budgets enforces the guardrails finance teams expect.",
    options: [
      {
        text: "Enable AWS Cost Explorer with cost allocation tags and configure AWS Budgets alerts.",
        guide: "Combines historical analysis with proactive thresholds across accounts.",
        correct: true,
      },
      {
        text: "Increase Auto Scaling minimum capacity for every workload.",
        guide: "Scaling policies optimize compute, not visibility into spend drivers.",
        correct: false,
      },
      {
        text: "Archive daily invoices in S3 and manually review them each month.",
        guide: "Manual reviews delay detection and miss real-time anomalies.",
        correct: false,
      },
      {
        text: "Switch every workload to a single Reserved Instance purchase immediately.",
        guide: "Committing without analysis can lock in unnecessary cost.",
        correct: false,
      },
    ],
    writingCue: "Lead with the finance pressure, then ask which AWS service pairing answers it.",
    trueStatement:
      "Tagging workloads and analyzing them inside AWS Cost Explorer quickly reveals idle resources.",
    trueGuide: "This pair highlights spend per business owner so teams can take action.",
    falseGuide: "Auto Scaling optimizes capacity but does not analyze bills.",
    trueIsCorrect: true,
    dragPrompt: "Arrange the cost optimization steps the team should follow for {{scenario}}.",
    dragSteps: [
      "Clean up and apply cost allocation tags for every workload owner.",
      "Share AWS Cost Explorer dashboards that highlight idle resources.",
      "Configure AWS Budgets alerts tied to executive thresholds.",
      "Pipe the alerts into Slack/Email for rapid collaboration.",
    ],
  },
  {
    id: "resilience",
    keywords: ["availability", "downtime", "multi-az", "resilient", "failover", "sla"],
    topic: "High Availability & Multi-AZ Design",
    scenario: "an e-commerce workload expecting unpredictable traffic spikes",
    question:
      "For {{scenario}}, which architecture best maintains {{topic}} across the application and data tiers?",
    hint: "Think about spreading risk across Availability Zones.",
    explanation:
      "Using an Application Load Balancer with Multi-AZ compute and RDS Multi-AZ protects both tiers from AZ failure.",
    options: [
      {
        text: "Place the web tier behind an Application Load Balancer with Auto Scaling across multiple AZs and enable Amazon RDS Multi-AZ.",
        guide: "Both tiers continue serving traffic even if an AZ goes down.",
        correct: true,
      },
      {
        text: "Run the entire stack on a single, large EC2 instance inside one AZ.",
        guide: "Single AZ creates a clear single point of failure.",
        correct: false,
      },
      {
        text: "Keep two instances in one AZ and mirror snapshots to S3.",
        guide: "Snapshots help recovery but do not provide live failover.",
        correct: false,
      },
      {
        text: "Use AWS Backup jobs every hour and restore if the AZ fails.",
        guide: "Restores introduce long downtime and manual effort.",
        correct: false,
      },
    ],
    writingCue: "Reference the SLA or customer impact before describing the AWS control.",
    trueStatement: "Distributing both compute and database layers across multiple AZs increases uptime.",
    trueGuide: "Multi-AZ targets the failure mode called out in the scenario.",
    falseGuide: "Backups alone are not a high-availability strategy.",
    trueIsCorrect: true,
    dragPrompt: "Order the steps to harden {{scenario}} against AZ failures.",
    dragSteps: [
      "Place the application behind an Application Load Balancer.",
      "Enable Auto Scaling groups across at least two AZs.",
      "Configure Amazon RDS Multi-AZ or Aurora replicas.",
      "Add health checks and alarms to detect degraded nodes.",
    ],
  },
  {
    id: "security",
    keywords: ["security", "encryption", "iam", "compliance", "governance", "audit"],
    topic: "Security, Governance & Encryption",
    scenario: "a regulated workload processing sensitive healthcare data",
    question:
      "In {{scenario}}, which approach satisfies {{topic}} requirements without slowing teams down?",
    hint: "Map the requirement to managed controls rather than custom code.",
    explanation:
      "Centralizing IAM guardrails with AWS Organizations and encrypting with KMS keeps auditors happy while remaining scalable.",
    options: [
      {
        text: "Use AWS Organizations service control policies with AWS Config plus KMS-backed encryption keys.",
        guide: "Pairs preventative guardrails with continuous auditing and encryption.",
        correct: true,
      },
      {
        text: "Rely on manual code reviews to confirm every developer encrypts data.",
        guide: "Manual processes are brittle and not audit-friendly.",
        correct: false,
      },
      {
        text: "Place all workloads in a single account and trust default IAM policies.",
        guide: "Defaults rarely meet compliance baselines.",
        correct: false,
      },
      {
        text: "Encrypt only S3 buckets while leaving databases in plaintext.",
        guide: "Partial encryption leaves regulated data exposed.",
        correct: false,
      },
    ],
    writingCue: "State the compliance driver, then connect it to AWS native controls.",
    trueStatement: "Combining preventative SCPs with AWS Config rules hardens every new workload.",
    trueGuide: "This pairing proves to auditors that the control is enforced and monitored.",
    falseGuide: "Manual reviews cannot guarantee continuous compliance.",
    trueIsCorrect: true,
    dragPrompt: "Sequence the governance rollout for {{scenario}}.",
    dragSteps: [
      "Establish an AWS Organizations hierarchy with service control policies.",
      "Define encryption standards backed by AWS KMS multi-Region keys.",
      "Enable AWS Config conformance packs for the regulatory framework.",
      "Route Config and CloudTrail findings into a security operations queue.",
    ],
  },
  {
    id: "serverless",
    keywords: ["serverless", "lambda", "event", "stream", "kinesis", "sqs", "iot"],
    topic: "Serverless & Event-Driven Processing",
    scenario: "an IoT workload ingesting millions of device readings per hour",
    question:
      "Given {{scenario}}, which design lets the team scale processing without managing fleets?",
    hint: "Focus on managed streaming plus Lambda-based fan-out.",
    explanation:
      "Kinesis (or SQS) paired with AWS Lambda provides parallel, serverless processing and built-in scaling.",
    options: [
      {
        text: "Stream data into Amazon Kinesis Data Streams and process batches with AWS Lambda consumers.",
        guide: "This pairing is fully managed and scales with the published data.",
        correct: true,
      },
      {
        text: "Stand up fixed EC2 workers that poll an API every minute.",
        guide: "Manual fleets reintroduce scaling toil.",
        correct: false,
      },
      {
        text: "Write data directly to an RDS instance and query it later.",
        guide: "Relational databases struggle with spiky ingestion.",
        correct: false,
      },
      {
        text: "Send device data over email for human review.",
        guide: "Human review cannot keep up with IoT scale.",
        correct: false,
      },
    ],
    writingCue: "Describe the volume or velocity first, then highlight the managed service combo.",
    trueStatement: "Pairing streaming ingestion with Lambda keeps the pipeline serverless and elastic.",
    trueGuide: "Managed services absorb unpredictable bursts without provisioning effort.",
    falseGuide: "Manually managed fleets increase toil and reduce elasticity.",
    trueIsCorrect: true,
    dragPrompt: "Put the event-driven workflow for {{scenario}} in order.",
    dragSteps: [
      "Ingest device payloads into Amazon Kinesis or an SQS queue.",
      "Trigger AWS Lambda to validate and enrich each record.",
      "Persist curated data into DynamoDB or S3 for downstream analytics.",
      "Emit metrics to CloudWatch and alarms to the operations channel.",
    ],
  },
]

const DIFFICULTY_CONFIG: Record<
  AIDifficulty,
  { hintSuffix: string; tips: string[] }
> = {
  Beginner: {
    hintSuffix: " Keep the hint actionable with a single AWS service name.",
    tips: [
      "Keep the scenario short and avoid stacking multiple AWS services in the stem.",
      "Ensure only one distractor feels slightly tempting; the rest should reinforce the lesson.",
    ],
  },
  Intermediate: {
    hintSuffix: " Nudge admins toward the AWS feature that best addresses the constraint.",
    tips: [
      "Reference the lesson objective so AI outputs stay aligned with the curriculum.",
      "Contrast at least two AWS-native approaches to test nuanced understanding.",
    ],
  },
  Advanced: {
    hintSuffix: " Highlight trade-offs or implementation detail that sophisticated learners expect.",
    tips: [
      "Ask for numbers (throughput, RPO/RTO, budgets) to anchor the scenario.",
      "Include at least one distractor that sounds plausible but breaks a best practice.",
    ],
  },
}

export async function POST(req: NextRequest) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const body = await req.json()
    const { prompt, challengeType, difficulty, lesson, mode, questionContext, answerCount } = body

    const suggestion = synthesizeChallengeSuggestion({
      prompt,
      challengeType,
      difficulty,
      lesson,
      mode,
      questionContext,
      answerCount,
    })

    return NextResponse.json({ suggestion })
  } catch (error) {
    console.error("Challenge builder error:", error)
    return NextResponse.json({ error: "Failed to generate suggestion" }, { status: 500 })
  }
}

export function synthesizeChallengeSuggestion({
  prompt,
  challengeType = "SELECT",
  difficulty = "Intermediate",
  lesson,
  mode = "full",
  questionContext,
  answerCount,
}: ChallengeBuilderParams): ChallengeBuilderSuggestion {
  const fallbackTopic = "AWS cloud foundations"
  const topicInput =
    prompt?.trim() ||
    lesson?.title ||
    lesson?.unitTitle ||
    lesson?.courseTitle ||
    fallbackTopic

  const template = pickTemplate(topicInput)
  const breadcrumb = [lesson?.courseTitle, lesson?.unitTitle, lesson?.title]
    .filter(Boolean)
    .join(" › ")
  const scenario = breadcrumb || template.scenario
  const formattedTopic = capitalizeFirstLetter(topicInput)
  const formatText = (text: string) =>
    text.replace(/{{topic}}/g, formattedTopic).replace(/{{scenario}}/g, scenario)

  const difficultyConfig = DIFFICULTY_CONFIG[difficulty] || DIFFICULTY_CONFIG.Intermediate

  let question = questionContext?.question?.trim() || formatText(template.question)
  if (challengeType === "TRUE_FALSE") {
    question = `True or False: ${
      questionContext?.question?.trim() || formatText(template.trueStatement)
    }`
  } else if (challengeType === "DRAG_DROP" && mode !== "answers") {
    question = formatText(template.dragPrompt)
  }

  let challengeOptions: ChallengeOptionSuggestion[] = template.options.map((option) => ({
    text: formatText(option.text),
    correct: option.correct,
    guide: formatText(option.guide),
  }))

  if (challengeType === "TRUE_FALSE") {
    challengeOptions = [
      {
        text: "True",
        correct: template.trueIsCorrect,
        guide: formatText(template.trueGuide),
      },
      {
        text: "False",
        correct: !template.trueIsCorrect,
        guide: formatText(template.falseGuide),
      },
    ]
  } else if (challengeType === "DRAG_DROP") {
    challengeOptions = template.dragSteps.map((step, index) => ({
      text: formatText(step),
      correct: false,
      guide: index === 0 ? "Start here to set context." : "",
      order: index + 1,
    }))
  } else if (challengeType === "IMAGE_SELECT") {
    // Encourage admins to map the answer text into imagery when they apply it
    challengeOptions = challengeOptions.map((option) => ({
      ...option,
      guide: option.correct
        ? `${option.guide} Pair this with an architectural diagram that highlights the service.`
        : option.guide,
    }))
  }

  const hintBase = questionContext?.hint?.trim() || formatText(template.hint)
  const hint = `${hintBase}${difficultyConfig.hintSuffix}`.trim()
  const writingTips = Array.from(
    new Set([
      template.writingCue,
      ...difficultyConfig.tips,
      breadcrumb
        ? `Mention how this scenario ties back to “${breadcrumb}”.`
        : `Tie the stem back to ${formattedTopic} so admins remember the lesson focus.`,
      questionContext?.question
        ? `Keep the answers aligned with the admin prompt: “${questionContext.question.slice(0, 80)}${
            questionContext.question.length > 80 ? "…" : ""
          }”.`
        : undefined,
    ]),
  ).filter(Boolean) as string[]

  if (mode === "answers") {
    challengeOptions = normalizeAnswerOptions(
      challengeOptions,
      challengeType,
      answerCount,
    )
  }

  return {
    question,
    hint,
    explanation: formatText(template.explanation),
    writingTips,
    challengeOptions,
  }
}

function pickTemplate(topicInput: string): Template {
  const lower = topicInput.toLowerCase()
  for (const template of TEMPLATE_LIBRARY) {
    if (template.keywords.some((keyword) => lower.includes(keyword))) {
      return template
    }
  }
  return TEMPLATE_LIBRARY[0]
}

function capitalizeFirstLetter(value: string) {
  if (!value) return ""
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function normalizeAnswerOptions(
  options: ChallengeOptionSuggestion[],
  challengeType: ChallengeType,
  desiredCount?: number,
): ChallengeOptionSuggestion[] {
  if (challengeType === "TRUE_FALSE" || challengeType === "DRAG_DROP") {
    return options
  }

  const baseOptions = options.length
    ? options
    : [
        {
          text: "Highlight the AWS-native service that solves the constraint",
          guide: "Auto generated",
          correct: true,
        },
        {
          text: "Rely on manual processes with no automation",
          guide: "Auto generated",
          correct: false,
        },
      ]

  const target = Math.min(Math.max(desiredCount ?? baseOptions.length, 3), 8)
  const correctOption =
    baseOptions.find((option) => option.correct) || { ...baseOptions[0], correct: true }
  const incorrectPool = baseOptions
    .filter((option) => option !== correctOption)
    .map((option) => ({ ...option, correct: false }))

  if (incorrectPool.length === 0) {
    incorrectPool.push({ ...correctOption, correct: false })
  }

  const result: ChallengeOptionSuggestion[] = [correctOption]
  let poolIndex = 0
  const variantLabels = ["Alt", "Variant", "Scenario", "Focus", "Consideration", "Idea", "Curveball"]

  while (result.length < target) {
    const baseOption = incorrectPool[poolIndex % incorrectPool.length]
    const variantLabel = variantLabels[(result.length - 1) % variantLabels.length]
    const newOption =
      poolIndex >= incorrectPool.length
        ? {
            ...baseOption,
            text: `${baseOption.text} (${variantLabel})`,
            guide: baseOption.guide,
            correct: false,
          }
        : baseOption
    result.push({ ...newOption, correct: false })
    poolIndex += 1
  }

  return result
}
