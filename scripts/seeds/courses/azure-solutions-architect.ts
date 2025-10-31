import { CourseSeed } from "../types"

export const azureSolutionsArchitectCourse: CourseSeed = {
  id: 10,
  title: "Azure Solutions Architect Expert AZ-305",
  imageSrc: "/icons/azure-solutions-architect-icon.png",
  category: "Azure",
  description:
    "Design secure, resilient Azure solutions that meet enterprise architecture requirements.",
  level: "Advanced",
  duration: "4-6 hours",
  units: [
    {
      title: "Designing Infrastructure Solutions",
      description: "Plan compute, networking, and storage for large-scale Azure workloads.",
      order: 1,
      lessons: [
        {
          title: "Hybrid Connectivity",
          order: 1,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question:
                "Which service provides private connectivity between on-premises networks and Azure?",
              options: [
                {
                  text: "Azure ExpressRoute",
                  correct: true,
                  guide:
                    'Correct: Azure ExpressRoute matches the Service Provides Private Connectivity behavior highlighted in "Hybrid Connectivity".',
                },
                {
                  text: "Azure Bastion",
                  guide:
                    'This assumes Azure Bastion, but "Hybrid Connectivity" showed Service Provides Private Connectivity behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Azure Front Door",
                  guide:
                    'This assumes Azure Front Door, but "Hybrid Connectivity" showed Service Provides Private Connectivity behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Hybrid Connectivity" about Service Provides Private Connectivity to guide your answer.',
            },
            {
              type: "TRUE_FALSE",
              order: 2,
              question:
                "Virtual network peering allows resources to communicate across regions with low latency.",
              options: [
                {
                  text: "True",
                  correct: true,
                  guide:
                    'Correct: True matches the Virtual Network Peering Allows behavior highlighted in "Hybrid Connectivity".',
                },
                {
                  text: "False",
                  guide:
                    'This assumes False, but "Hybrid Connectivity" showed Virtual Network Peering Allows behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Hybrid Connectivity" about Virtual Network Peering Allows to guide your answer.',
            },
            {
              type: "TEXT_INPUT",
              order: 3,
              question:
                "Name the Azure service that simplifies deploying and scaling containerized applications using Kubernetes.",
              correctAnswer: "Azure Kubernetes Service",
              hint: 'Use the example from "Hybrid Connectivity" about Azure Service Simplifies Deploying to guide your answer.',
            },
          ],
        },
        {
          title: "Storage Strategy",
          order: 2,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question:
                "Which storage option provides sub-millisecond latency for mission-critical workloads?",
              options: [
                {
                  text: "Premium SSD v2",
                  correct: true,
                  guide:
                    'Correct: Premium SSD v2 matches the Storage Option Provides Sub behavior highlighted in "Storage Strategy".',
                },
                {
                  text: "Cool tier Blob Storage",
                  guide:
                    'This assumes Cool tier Blob Storage, but "Storage Strategy" showed Storage Option Provides Sub behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Azure Files standard",
                  guide:
                    'This assumes Azure Files standard, but "Storage Strategy" showed Storage Option Provides Sub behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Storage Strategy" and how it framed Storage Option Provides Sub. Apply the same reasoning here.',
            },
            {
              type: "ASSIST",
              order: 2,
              question:
                "Complete: Azure Storage Accounts can enable ______ replication for region-pair failover.",
              options: [
                {
                  text: "geo-redundant",
                  correct: true,
                  guide:
                    'Correct: geo-redundant matches the Azure Storage Accounts Can behavior highlighted in "Storage Strategy".',
                },
                {
                  text: "temporary",
                  guide:
                    'This assumes temporary, but "Storage Strategy" showed Azure Storage Accounts Can behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "manual",
                  guide:
                    'This assumes manual, but "Storage Strategy" showed Azure Storage Accounts Can behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Storage Strategy" and how it framed Azure Storage Accounts Can. Apply the same reasoning here.',
            },
            {
              type: "DRAG_DROP",
              order: 3,
              question: "Arrange the steps to protect critical data with Azure Backup:",
              options: [
                {
                  text: "Create Recovery Services vault",
                  order: 1,
                  guide:
                    'This assumes Create Recovery Services vault, but "Storage Strategy" showed Arrange Steps Protect Critical behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Define backup policy",
                  order: 2,
                  guide:
                    'This assumes Define backup policy, but "Storage Strategy" showed Arrange Steps Protect Critical behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Enable backup on target resources",
                  order: 3,
                  guide:
                    'This assumes Enable backup on target resources, but "Storage Strategy" showed Arrange Steps Protect Critical behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Review reports and alerts",
                  order: 4,
                  guide:
                    'This assumes Review reports and alerts, but "Storage Strategy" showed Arrange Steps Protect Critical behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Storage Strategy" and how it framed Arrange Steps Protect Critical. Apply the same reasoning here.',
            },
          ],
        },
      ],
    },
    {
      title: "Security and Governance Architecture",
      description: "Implement advanced identity, monitoring, and governance patterns.",
      order: 2,
      lessons: [
        {
          title: "Advanced Identity Design",
          order: 1,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question:
                "Which feature provides just-in-time privileged access with approval workflows?",
              options: [
                {
                  text: "Azure AD Privileged Identity Management",
                  correct: true,
                  guide:
                    'Correct: Azure AD Privileged Identity Management matches the Feature Provides Just Time behavior highlighted in "Advanced Identity Design".',
                },
                {
                  text: "Azure Lighthouse",
                  guide:
                    'This assumes Azure Lighthouse, but "Advanced Identity Design" showed Feature Provides Just Time behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Azure Monitor",
                  guide:
                    'This assumes Azure Monitor, but "Advanced Identity Design" showed Feature Provides Just Time behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Advanced Identity Design" and how it framed Feature Provides Just Time. Apply the same reasoning here.',
            },
            {
              type: "TRUE_FALSE",
              order: 2,
              question:
                "Azure AD Conditional Access policies can incorporate user risk signals from Identity Protection.",
              options: [
                {
                  text: "True",
                  correct: true,
                  guide:
                    'Correct: True matches the Azure Ad Conditional Access behavior highlighted in "Advanced Identity Design".',
                },
                {
                  text: "False",
                  guide:
                    'This assumes False, but "Advanced Identity Design" showed Azure Ad Conditional Access behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Advanced Identity Design" and how it framed Azure Ad Conditional Access. Apply the same reasoning here.',
            },
            {
              type: "TEXT_INPUT",
              order: 3,
              question:
                "What Azure AD feature enforces multifactor authentication based on contextual policies?",
              correctAnswer: "Conditional Access",
              hint: 'Think back to "Advanced Identity Design" and how it framed Azure Ad Feature Enforces. Apply the same reasoning here.',
            },
          ],
        },
        {
          title: "Operations and Monitoring",
          order: 2,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question:
                "Which service unifies log analytics and alerting for Azure and hybrid environments?",
              options: [
                {
                  text: "Azure Monitor",
                  correct: true,
                  guide:
                    'Correct: Azure Monitor matches the Service Unifies Log Analytics behavior highlighted in "Operations and Monitoring".',
                },
                {
                  text: "Azure Data Explorer",
                  guide:
                    'This assumes Azure Data Explorer, but "Operations and Monitoring" showed Service Unifies Log Analytics behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Azure Service Bus",
                  guide:
                    'This assumes Azure Service Bus, but "Operations and Monitoring" showed Service Unifies Log Analytics behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Operations and Monitoring" and how it framed Service Unifies Log Analytics. Apply the same reasoning here.',
            },
            {
              type: "ASSIST",
              order: 2,
              question:
                "Complete: Azure Sentinel delivers cloud-native ______ information and event management.",
              options: [
                {
                  text: "security",
                  correct: true,
                  guide:
                    'Correct: security matches the Azure Sentinel Delivers Cloud behavior highlighted in "Operations and Monitoring".',
                },
                {
                  text: "storage",
                  guide:
                    'This assumes storage, but "Operations and Monitoring" showed Azure Sentinel Delivers Cloud behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "development",
                  guide:
                    'This assumes development, but "Operations and Monitoring" showed Azure Sentinel Delivers Cloud behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Operations and Monitoring" and how it framed Azure Sentinel Delivers Cloud. Apply the same reasoning here.',
            },
            {
              type: "DRAG_DROP",
              order: 3,
              question: "Order the process for responding to a critical Azure Monitor alert:",
              options: [
                {
                  text: "Triaging the alert",
                  order: 1,
                  guide:
                    'This assumes Triaging the alert, but "Operations and Monitoring" showed Order Process Responding Critical behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Executing automation runbooks",
                  order: 2,
                  guide:
                    'This assumes Executing automation runbooks, but "Operations and Monitoring" showed Order Process Responding Critical behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Documenting remediation steps",
                  order: 3,
                  guide:
                    'This assumes Documenting remediation steps, but "Operations and Monitoring" showed Order Process Responding Critical behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Reviewing metrics for regression",
                  order: 4,
                  guide:
                    'This assumes Reviewing metrics for regression, but "Operations and Monitoring" showed Order Process Responding Critical behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Operations and Monitoring" and how it framed Order Process Responding Critical. Apply the same reasoning here.',
            },
          ],
        },
      ],
    },
    {
      title: "Enterprise Design Decisions",
      description: "Balance resiliency, cost, and security for complex scenarios.",
      order: 3,
      lessons: [
        {
          title: "Business Continuity",
          order: 1,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question:
                "Which Azure service orchestrates multi-region failover for mission-critical databases?",
              options: [
                {
                  text: "Azure SQL Auto-failover groups",
                  correct: true,
                  guide:
                    'Correct: Azure SQL Auto-failover groups matches the Azure Service Orchestrates Multi behavior highlighted in "Business Continuity".',
                },
                {
                  text: "Azure Elastic Job Agent",
                  guide:
                    'This assumes Azure Elastic Job Agent, but "Business Continuity" showed Azure Service Orchestrates Multi behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Azure Synapse Serverless",
                  guide:
                    'This assumes Azure Synapse Serverless, but "Business Continuity" showed Azure Service Orchestrates Multi behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Business Continuity" about Azure Service Orchestrates Multi to guide your answer.',
            },
            {
              type: "VIDEO",
              order: 2,
              question:
                "Watch the continuity planning session. Which redundancy pattern was ultimately selected?",
              videoSrc:
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
              options: [
                {
                  text: "Active/Passive with warm standby",
                  correct: true,
                  guide:
                    'Correct: Active/Passive with warm standby matches the Watch Continuity Planning Session behavior highlighted in "Business Continuity".',
                },
                {
                  text: "Cold standby only",
                  guide:
                    'This assumes Cold standby only, but "Business Continuity" showed Watch Continuity Planning Session behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Single-region deployment",
                  guide:
                    'This assumes Single-region deployment, but "Business Continuity" showed Watch Continuity Planning Session behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Queue-based failover",
                  guide:
                    'This assumes Queue-based failover, but "Business Continuity" showed Watch Continuity Planning Session behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Business Continuity" about Watch Continuity Planning Session to guide your answer.',
            },
            {
              type: "TEXT_INPUT",
              order: 3,
              question: "Name the Azure governance tool used to audit disaster recovery readiness.",
              correctAnswer: "Azure Resource Graph",
              hint: 'Use the example from "Business Continuity" about Azure Governance Tool Used to guide your answer.',
            },
          ],
        },
        {
          title: "Cost Governance Decisions",
          order: 2,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "Which feature enforces cost guardrails using policy-driven budgets?",
              options: [
                {
                  text: "Azure Cost Management budgets with action groups",
                  correct: true,
                  guide:
                    'Correct: Azure Cost Management budgets with action groups matches the Feature Enforces Cost Guardrails behavior highlighted in "Cost Governance Decisions".',
                },
                {
                  text: "Azure Traffic Manager",
                  guide:
                    'This assumes Azure Traffic Manager, but "Cost Governance Decisions" showed Feature Enforces Cost Guardrails behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Azure Service Fabric",
                  guide:
                    'This assumes Azure Service Fabric, but "Cost Governance Decisions" showed Feature Enforces Cost Guardrails behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Cost Governance Decisions" about Feature Enforces Cost Guardrails to guide your answer.',
            },
            {
              type: "ASSIST",
              order: 2,
              question:
                "Complete: Azure Advisor provides ______ recommendations to optimize workloads.",
              options: [
                {
                  text: "manual",
                  guide:
                    'This assumes manual, but "Cost Governance Decisions" showed Azure Advisor Provides Blank behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "AI-backed",
                  correct: true,
                  guide:
                    'Correct: AI-backed matches the Azure Advisor Provides Blank behavior highlighted in "Cost Governance Decisions".',
                },
                {
                  text: "unsupported",
                  guide:
                    'This assumes unsupported, but "Cost Governance Decisions" showed Azure Advisor Provides Blank behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Cost Governance Decisions" about Azure Advisor Provides Blank to guide your answer.',
            },
            {
              type: "DRAG_DROP",
              order: 3,
              question: "Arrange the decision points when selecting Azure reservations:",
              options: [
                {
                  text: "Assess baseline usage",
                  order: 1,
                  guide:
                    'This assumes Assess baseline usage, but "Cost Governance Decisions" showed Arrange Decision Points Selecting behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Choose commitment term",
                  order: 2,
                  guide:
                    'This assumes Choose commitment term, but "Cost Governance Decisions" showed Arrange Decision Points Selecting behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Select payment option",
                  order: 3,
                  guide:
                    'This assumes Select payment option, but "Cost Governance Decisions" showed Arrange Decision Points Selecting behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Track utilization in reports",
                  order: 4,
                  guide:
                    'This assumes Track utilization in reports, but "Cost Governance Decisions" showed Arrange Decision Points Selecting behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Cost Governance Decisions" about Arrange Decision Points Selecting to guide your answer.',
            },
          ],
        },
      ],
    },
    {
      title: "Real-World Application Lab",
      description:
        "Apply Azure Solutions Architect Expert AZ-305 skills to architecture, operations, and optimization scenarios.",
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
                "Which Microsoft Azure service best coordinates loosely coupled workloads in an event-driven architecture?",
              options: [
                {
                  text: "Azure Event Grid",
                  correct: true,
                  guide:
                    'Correct: Azure Event Grid matches the Microsoft Azure Service Best behavior highlighted in "Architecture Decision Review".',
                },
                {
                  text: "Azure Functions",
                  guide:
                    'This assumes Azure Functions, but "Architecture Decision Review" showed Microsoft Azure Service Best behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Azure Monitor",
                  guide:
                    'This assumes Azure Monitor, but "Architecture Decision Review" showed Microsoft Azure Service Best behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Architecture Decision Review" about Microsoft Azure Service Best to guide your answer.',
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
                "Which tool surfaces rightsizing and cost-efficiency recommendations for Microsoft Azure workloads?",
              options: [
                {
                  text: "Azure Advisor",
                  correct: true,
                  guide:
                    'Correct: Azure Advisor matches the Tool Surfaces Rightsizing Cost behavior highlighted in "Operations & Optimization Review".',
                },
                {
                  text: "Azure Monitor",
                  guide:
                    'This assumes Azure Monitor, but "Operations & Optimization Review" showed Tool Surfaces Rightsizing Cost behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Azure Functions",
                  guide:
                    'This assumes Azure Functions, but "Operations & Optimization Review" showed Tool Surfaces Rightsizing Cost behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Operations & Optimization Review"—it explained how Tool Surfaces Rightsizing Cost works within Microsoft Azure.',
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
              hint: 'Remember the pattern you practiced in "Operations & Optimization Review"—it explained how Effective Observability Runbooks Should works within Microsoft Azure.',
            },
            {
              type: "SELECT",
              order: 3,
              question:
                "Which Microsoft Azure service centralizes audit and delivery of operational logs for compliance teams?",
              options: [
                {
                  text: "Azure Monitor Logs",
                  correct: true,
                  guide:
                    'Correct: Azure Monitor Logs matches the Microsoft Azure Service Centralizes behavior highlighted in "Operations & Optimization Review".',
                },
                {
                  text: "Azure Automation Runbooks",
                  guide:
                    'This assumes Azure Automation Runbooks, but "Operations & Optimization Review" showed Microsoft Azure Service Centralizes behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Azure Event Grid",
                  guide:
                    'This assumes Azure Event Grid, but "Operations & Optimization Review" showed Microsoft Azure Service Centralizes behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Operations & Optimization Review"—it explained how Microsoft Azure Service Centralizes works within Microsoft Azure.',
            },
          ],
        },
      ],
    },
  ],
}
