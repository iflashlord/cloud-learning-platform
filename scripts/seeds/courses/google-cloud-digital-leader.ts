import { CourseSeed } from "../types"

export const googleCloudDigitalLeaderCourse: CourseSeed = {
  id: 5,
  title: "Google Cloud Digital Leader",
  imageSrc: "/gcp-digital-leader.svg",
  category: "Google Cloud",
  description:
    "Build foundational knowledge of core Google Cloud Platform services, billing structure, and security concepts.",
  level: "Beginner",
  duration: "2-3 hours",
  units: [
    {
      title: "GCP Foundations",
      description:
        "Understand how Google Cloud organizes resources and core infrastructure services.",
      order: 1,
      lessons: [
        {
          title: "Core Services Overview",
          order: 1,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "Which Google Cloud service provides globally distributed object storage?",
              options: [
                {
                  text: "Cloud Storage",
                  correct: true,
                  guide:
                    'Correct: Cloud Storage matches the Google Cloud Service Provides behavior highlighted in "Core Services Overview".',
                },
                {
                  text: "Compute Engine",
                  guide:
                    'This assumes Compute Engine, but "Core Services Overview" showed Google Cloud Service Provides behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Cloud SQL",
                  guide:
                    'This assumes Cloud SQL, but "Core Services Overview" showed Google Cloud Service Provides behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Core Services Overview" and how it framed Google Cloud Service Provides. Apply the same reasoning here.',
            },
            {
              type: "TRUE_FALSE",
              order: 2,
              question: "Google Cloud resources are organized under projects by default.",
              options: [
                {
                  text: "True",
                  correct: true,
                  guide:
                    'Correct: True matches the Google Cloud Resources Organized behavior highlighted in "Core Services Overview".',
                },
                {
                  text: "False",
                  guide:
                    'This assumes False, but "Core Services Overview" showed Google Cloud Resources Organized behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Core Services Overview" and how it framed Google Cloud Resources Organized. Apply the same reasoning here.',
            },
            {
              type: "TEXT_INPUT",
              order: 3,
              question: "Name the Google Cloud service used for managed relational databases.",
              correctAnswer: "Cloud SQL",
              hint: 'Think back to "Core Services Overview" and how it framed Google Cloud Service Used. Apply the same reasoning here.',
            },
          ],
        },
        {
          title: "Compute and Networking Basics",
          order: 2,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "Which service provides customizable virtual machines in Google Cloud?",
              options: [
                {
                  text: "Compute Engine",
                  correct: true,
                  guide:
                    'Correct: Compute Engine matches the Service Provides Customizable Virtual behavior highlighted in "Compute and Networking Basics".',
                },
                {
                  text: "Kubernetes Engine",
                  guide:
                    'This assumes Kubernetes Engine, but "Compute and Networking Basics" showed Service Provides Customizable Virtual behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Cloud Functions",
                  guide:
                    'This assumes Cloud Functions, but "Compute and Networking Basics" showed Service Provides Customizable Virtual behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Compute and Networking Basics" about Service Provides Customizable Virtual to guide your answer.',
            },
            {
              type: "ASSIST",
              order: 2,
              question:
                "Complete: A Virtual Private Cloud (VPC) is a ______ network in Google Cloud.",
              options: [
                {
                  text: "global",
                  guide:
                    'This assumes global, but "Compute and Networking Basics" showed Virtual Private Cloud Vpc behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "virtual",
                  correct: true,
                  guide:
                    'Correct: virtual matches the Virtual Private Cloud Vpc behavior highlighted in "Compute and Networking Basics".',
                },
                {
                  text: "legacy",
                  guide:
                    'This assumes legacy, but "Compute and Networking Basics" showed Virtual Private Cloud Vpc behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Compute and Networking Basics" about Virtual Private Cloud Vpc to guide your answer.',
            },
            {
              type: "DRAG_DROP",
              order: 3,
              question: "Arrange the steps to prepare a new Google Cloud project:",
              options: [
                {
                  text: "Create project",
                  order: 1,
                  guide:
                    'This assumes Create project, but "Compute and Networking Basics" showed Arrange Steps Prepare New behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Enable billing",
                  order: 2,
                  guide:
                    'This assumes Enable billing, but "Compute and Networking Basics" showed Arrange Steps Prepare New behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Configure VPC networking",
                  order: 3,
                  guide:
                    'This assumes Configure VPC networking, but "Compute and Networking Basics" showed Arrange Steps Prepare New behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Deploy compute resources",
                  order: 4,
                  guide:
                    'This assumes Deploy compute resources, but "Compute and Networking Basics" showed Arrange Steps Prepare New behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Compute and Networking Basics" about Arrange Steps Prepare New to guide your answer.',
            },
          ],
        },
      ],
    },
    {
      title: "Operations and Security",
      description: "Manage access, monitor workloads, and control spending on Google Cloud.",
      order: 2,
      lessons: [
        {
          title: "Identity and Access Management",
          order: 1,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question:
                "Which IAM concept groups permissions that can be granted to users or service accounts?",
              options: [
                {
                  text: "Roles",
                  correct: true,
                  guide:
                    'Correct: Roles matches the Iam Concept Groups Permissions behavior highlighted in "Identity and Access Management".',
                },
                {
                  text: "Folders",
                  guide:
                    'This assumes Folders, but "Identity and Access Management" showed Iam Concept Groups Permissions behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Budgets",
                  guide:
                    'This assumes Budgets, but "Identity and Access Management" showed Iam Concept Groups Permissions behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Identity and Access Management" about Iam Concept Groups Permissions to guide your answer.',
            },
            {
              type: "TRUE_FALSE",
              order: 2,
              question: "Service accounts are intended for applications and automated workloads.",
              options: [
                {
                  text: "True",
                  correct: true,
                  guide:
                    'Correct: True matches the Service Accounts Intended Applications behavior highlighted in "Identity and Access Management".',
                },
                {
                  text: "False",
                  guide:
                    'This assumes False, but "Identity and Access Management" showed Service Accounts Intended Applications behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Identity and Access Management" about Service Accounts Intended Applications to guide your answer.',
            },
            {
              type: "TEXT_INPUT",
              order: 3,
              question: "What IAM principle recommends granting only the minimum access required?",
              correctAnswer: "Least privilege",
              hint: 'Use the example from "Identity and Access Management" about Iam Principle Recommends Granting to guide your answer.',
            },
          ],
        },
        {
          title: "Monitoring and Cost Management",
          order: 2,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "Which Google Cloud service provides metrics dashboards and alerting?",
              options: [
                {
                  text: "Cloud Monitoring",
                  correct: true,
                  guide:
                    'Correct: Cloud Monitoring matches the Google Cloud Service Provides behavior highlighted in "Monitoring and Cost Management".',
                },
                {
                  text: "Cloud Armor",
                  guide:
                    'This assumes Cloud Armor, but "Monitoring and Cost Management" showed Google Cloud Service Provides behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Cloud Build",
                  guide:
                    'This assumes Cloud Build, but "Monitoring and Cost Management" showed Google Cloud Service Provides behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Monitoring and Cost Management" and how it framed Google Cloud Service Provides. Apply the same reasoning here.',
            },
            {
              type: "ASSIST",
              order: 2,
              question: "Complete: Cloud Billing budgets help you set spending ______.",
              options: [
                {
                  text: "accounts",
                  guide:
                    'This assumes accounts, but "Monitoring and Cost Management" showed Cloud Billing Budgets Help behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "thresholds",
                  correct: true,
                  guide:
                    'Correct: thresholds matches the Cloud Billing Budgets Help behavior highlighted in "Monitoring and Cost Management".',
                },
                {
                  text: "regions",
                  guide:
                    'This assumes regions, but "Monitoring and Cost Management" showed Cloud Billing Budgets Help behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Monitoring and Cost Management" and how it framed Cloud Billing Budgets Help. Apply the same reasoning here.',
            },
            {
              type: "DRAG_DROP",
              order: 3,
              question: "Order the actions to respond to a Google Cloud budget alert:",
              options: [
                {
                  text: "Review spend in Cost Table",
                  order: 1,
                  guide:
                    'This assumes Review spend in Cost Table, but "Monitoring and Cost Management" showed Order Actions Respond Google behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Identify high-cost services",
                  order: 2,
                  guide:
                    'This assumes Identify high-cost services, but "Monitoring and Cost Management" showed Order Actions Respond Google behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Apply committed use discounts",
                  order: 3,
                  guide:
                    'This assumes Apply committed use discounts, but "Monitoring and Cost Management" showed Order Actions Respond Google behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Monitor results",
                  order: 4,
                  guide:
                    'This assumes Monitor results, but "Monitoring and Cost Management" showed Order Actions Respond Google behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Monitoring and Cost Management" and how it framed Order Actions Respond Google. Apply the same reasoning here.',
            },
          ],
        },
      ],
    },
    {
      title: "Innovation & Sustainability",
      description: "Connect business transformation goals with Google Cloud capabilities.",
      order: 3,
      lessons: [
        {
          title: "Industry Solutions",
          order: 1,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "Which Google Cloud product accelerates retail demand forecasting?",
              options: [
                {
                  text: "Vertex AI Forecasting",
                  correct: true,
                  guide:
                    'Correct: Vertex AI Forecasting matches the Google Cloud Product Accelerates behavior highlighted in "Industry Solutions".',
                },
                {
                  text: "Cloud Composer",
                  guide:
                    'This assumes Cloud Composer, but "Industry Solutions" showed Google Cloud Product Accelerates behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Cloud Run",
                  guide:
                    'This assumes Cloud Run, but "Industry Solutions" showed Google Cloud Product Accelerates behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Industry Solutions"—it explained how Google Cloud Product Accelerates works within Google Cloud.',
            },
            {
              type: "TEXT_INPUT",
              order: 2,
              question:
                "Name the managed service used to build conversational AI for contact centers.",
              correctAnswer: "Dialogflow",
              hint: 'Remember the pattern you practiced in "Industry Solutions"—it explained how Managed Service Used Build works within Google Cloud.',
            },
            {
              type: "VIDEO",
              order: 3,
              question:
                "Watch the customer story and identify which solution enabled real-time personalization.",
              videoSrc:
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
              options: [
                {
                  text: "Recommendations AI",
                  correct: true,
                  guide:
                    'Correct: Recommendations AI matches the Watch Customer Story Identify behavior highlighted in "Industry Solutions".',
                },
                {
                  text: "Cloud Pub/Sub",
                  guide:
                    'This assumes Cloud Pub/Sub, but "Industry Solutions" showed Watch Customer Story Identify behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Filestore",
                  guide:
                    'This assumes Filestore, but "Industry Solutions" showed Watch Customer Story Identify behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Cloud Functions",
                  guide:
                    'This assumes Cloud Functions, but "Industry Solutions" showed Watch Customer Story Identify behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Industry Solutions"—it explained how Watch Customer Story Identify works within Google Cloud.',
            },
          ],
        },
        {
          title: "Sustainability Initiatives",
          order: 2,
          challenges: [
            {
              type: "TRUE_FALSE",
              order: 1,
              question:
                "Google Cloud matches 100% of electricity consumption with renewable energy purchases.",
              options: [
                {
                  text: "True",
                  correct: true,
                  guide:
                    'Correct: True matches the Google Cloud Matches 100 behavior highlighted in "Sustainability Initiatives".',
                },
                {
                  text: "False",
                  guide:
                    'This assumes False, but "Sustainability Initiatives" showed Google Cloud Matches 100 behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Sustainability Initiatives" about Google Cloud Matches 100 to guide your answer.',
            },
            {
              type: "ASSIST",
              order: 2,
              question: "Complete: Carbon Footprint helps organizations measure ______ emissions.",
              options: [
                {
                  text: "scope 1",
                  guide:
                    'This assumes scope 1, but "Sustainability Initiatives" showed Carbon Footprint Helps Organizations behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "cloud-related",
                  correct: true,
                  guide:
                    'Correct: cloud-related matches the Carbon Footprint Helps Organizations behavior highlighted in "Sustainability Initiatives".',
                },
                {
                  text: "on-premises",
                  guide:
                    'This assumes on-premises, but "Sustainability Initiatives" showed Carbon Footprint Helps Organizations behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Sustainability Initiatives" about Carbon Footprint Helps Organizations to guide your answer.',
            },
            {
              type: "DRAG_DROP",
              order: 3,
              question: "Arrange the steps to launch a sustainability reporting dashboard:",
              options: [
                {
                  text: "Export Carbon Footprint data",
                  order: 1,
                  guide:
                    'This assumes Export Carbon Footprint data, but "Sustainability Initiatives" showed Arrange Steps Launch Sustainability behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Ingest metrics into BigQuery",
                  order: 2,
                  guide:
                    'This assumes Ingest metrics into BigQuery, but "Sustainability Initiatives" showed Arrange Steps Launch Sustainability behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Visualize KPIs in Looker Studio",
                  order: 3,
                  guide:
                    'This assumes Visualize KPIs in Looker Studio, but "Sustainability Initiatives" showed Arrange Steps Launch Sustainability behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Share insights with stakeholders",
                  order: 4,
                  guide:
                    'This assumes Share insights with stakeholders, but "Sustainability Initiatives" showed Arrange Steps Launch Sustainability behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Sustainability Initiatives" about Arrange Steps Launch Sustainability to guide your answer.',
            },
          ],
        },
      ],
    },
    {
      title: "Real-World Application Lab",
      description:
        "Apply Google Cloud Digital Leader skills to architecture, operations, and optimization scenarios.",
      order: 4,
      lessons: [
        {
          title: "Architecture Decision Review",
          order: 1,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question:
                "Which Google Cloud service best coordinates loosely coupled workloads in an event-driven architecture?",
              options: [
                {
                  text: "Cloud Pub/Sub",
                  correct: true,
                  guide:
                    'Correct: Cloud Pub/Sub matches the Google Cloud Service Best behavior highlighted in "Architecture Decision Review".',
                },
                {
                  text: "Cloud Functions",
                  guide:
                    'This assumes Cloud Functions, but "Architecture Decision Review" showed Google Cloud Service Best behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Cloud Monitoring",
                  guide:
                    'This assumes Cloud Monitoring, but "Architecture Decision Review" showed Google Cloud Service Best behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Architecture Decision Review" about Google Cloud Service Best to guide your answer.',
            },
            {
              type: "TRUE_FALSE",
              order: 2,
              question:
                "Designing for multi-zone redundancy reduces blast radius for regulated workloads.",
              options: [
                {
                  text: "True",
                  correct: true,
                  guide:
                    'Correct: True matches the Designing Multi Zone Redundancy behavior highlighted in "Architecture Decision Review".',
                },
                {
                  text: "False",
                  guide:
                    'This assumes False, but "Architecture Decision Review" showed Designing Multi Zone Redundancy behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Architecture Decision Review" about Designing Multi Zone Redundancy to guide your answer.',
            },
            {
              type: "DRAG_DROP",
              order: 3,
              question:
                "Arrange the recommended steps when reviewing a critical workload architecture:",
              options: [
                {
                  text: "Capture business requirements",
                  order: 1,
                  guide:
                    'This assumes Capture business requirements, but "Architecture Decision Review" showed Arrange Recommended Steps Reviewing behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Map managed services to requirements",
                  order: 2,
                  guide:
                    'This assumes Map managed services to requirements, but "Architecture Decision Review" showed Arrange Recommended Steps Reviewing behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Design for failure and resiliency",
                  order: 3,
                  guide:
                    'This assumes Design for failure and resiliency, but "Architecture Decision Review" showed Arrange Recommended Steps Reviewing behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Validate with the Well-Architected/framework review",
                  order: 4,
                  guide:
                    'This assumes Validate with the Well-Architected/framework review, but "Architecture Decision Review" showed Arrange Recommended Steps Reviewing behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Architecture Decision Review" about Arrange Recommended Steps Reviewing to guide your answer.',
            },
          ],
        },
        {
          title: "Operations & Optimization Review",
          order: 2,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question:
                "Which tool surfaces rightsizing and cost-efficiency recommendations for Google Cloud workloads?",
              options: [
                {
                  text: "Active Assist Recommender",
                  correct: true,
                  guide:
                    'Correct: Active Assist Recommender matches the Tool Surfaces Rightsizing Cost behavior highlighted in "Operations & Optimization Review".',
                },
                {
                  text: "Cloud Monitoring",
                  guide:
                    'This assumes Cloud Monitoring, but "Operations & Optimization Review" showed Tool Surfaces Rightsizing Cost behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Cloud Functions",
                  guide:
                    'This assumes Cloud Functions, but "Operations & Optimization Review" showed Tool Surfaces Rightsizing Cost behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Operations & Optimization Review"—it explained how Tool Surfaces Rightsizing Cost works within Google Cloud.',
            },
            {
              type: "ASSIST",
              order: 2,
              question:
                "Complete: Effective observability runbooks should include ______ triggers for automation.",
              options: [
                {
                  text: "manual",
                  guide:
                    'This assumes manual, but "Operations & Optimization Review" showed Effective Observability Runbooks Should behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "event-driven",
                  correct: true,
                  guide:
                    'Correct: event-driven matches the Effective Observability Runbooks Should behavior highlighted in "Operations & Optimization Review".',
                },
                {
                  text: "quarterly",
                  guide:
                    'This assumes quarterly, but "Operations & Optimization Review" showed Effective Observability Runbooks Should behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Operations & Optimization Review"—it explained how Effective Observability Runbooks Should works within Google Cloud.',
            },
            {
              type: "SELECT",
              order: 3,
              question:
                "Which Google Cloud service centralizes audit and delivery of operational logs for compliance teams?",
              options: [
                {
                  text: "Cloud Logging",
                  correct: true,
                  guide:
                    'Correct: Cloud Logging matches the Google Cloud Service Centralizes behavior highlighted in "Operations & Optimization Review".',
                },
                {
                  text: "Cloud Deploy",
                  guide:
                    'This assumes Cloud Deploy, but "Operations & Optimization Review" showed Google Cloud Service Centralizes behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Cloud Pub/Sub",
                  guide:
                    'This assumes Cloud Pub/Sub, but "Operations & Optimization Review" showed Google Cloud Service Centralizes behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Operations & Optimization Review"—it explained how Google Cloud Service Centralizes works within Google Cloud.',
            },
          ],
        },
      ],
    },
  ],
}
