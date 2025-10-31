import { CourseSeed } from "../types"

export const azureFundamentalsCourse: CourseSeed = {
  id: 8,
  title: "Azure Fundamentals AZ-900",
  imageSrc: "/icons/azure-fundamentals-icon.png",
  category: "Azure",
  description: "Learn essential Azure concepts, global infrastructure, and pricing fundamentals.",
  level: "Beginner",
  duration: "2-3 hours",
  units: [
    {
      title: "Core Azure Concepts",
      description: "Explore Azure services, global infrastructure, and management structure.",
      order: 1,
      lessons: [
        {
          title: "Azure Services Overview",
          order: 1,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "Which Azure service provides on-demand virtual machines?",
              options: [
                {
                  text: "Azure Virtual Machines",
                  correct: true,
                  guide:
                    'Correct: Azure Virtual Machines matches the Azure Service Provides On behavior highlighted in "Azure Services Overview".',
                },
                {
                  text: "Azure Functions",
                  guide:
                    'This assumes Azure Functions, but "Azure Services Overview" showed Azure Service Provides On behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Azure Logic Apps",
                  guide:
                    'This assumes Azure Logic Apps, but "Azure Services Overview" showed Azure Service Provides On behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Azure Services Overview" and how it framed Azure Service Provides On. Apply the same reasoning here.',
            },
            {
              type: "TRUE_FALSE",
              order: 2,
              question: "Resource groups act as logical containers for Azure resources.",
              options: [
                {
                  text: "True",
                  correct: true,
                  guide:
                    'Correct: True matches the Resource Groups Act As behavior highlighted in "Azure Services Overview".',
                },
                {
                  text: "False",
                  guide:
                    'This assumes False, but "Azure Services Overview" showed Resource Groups Act As behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Azure Services Overview" and how it framed Resource Groups Act As. Apply the same reasoning here.',
            },
            {
              type: "TEXT_INPUT",
              order: 3,
              question:
                "What Azure service is used to host structured NoSQL data with global distribution?",
              correctAnswer: "Azure Cosmos DB",
              hint: 'Think back to "Azure Services Overview" and how it framed Azure Service Used Host. Apply the same reasoning here.',
            },
          ],
        },
        {
          title: "Pricing and Support",
          order: 2,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "Which tool estimates cloud costs before deploying Azure resources?",
              options: [
                {
                  text: "Azure Pricing Calculator",
                  correct: true,
                  guide:
                    'Correct: Azure Pricing Calculator matches the Tool Estimates Cloud Costs behavior highlighted in "Pricing and Support".',
                },
                {
                  text: "Azure Migrate",
                  guide:
                    'This assumes Azure Migrate, but "Pricing and Support" showed Tool Estimates Cloud Costs behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Azure Advisor",
                  guide:
                    'This assumes Azure Advisor, but "Pricing and Support" showed Tool Estimates Cloud Costs behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Pricing and Support" about Tool Estimates Cloud Costs to guide your answer.',
            },
            {
              type: "ASSIST",
              order: 2,
              question:
                "Complete: Azure reservations provide savings when you commit to ______ usage.",
              options: [
                {
                  text: "spot",
                  guide:
                    'This assumes spot, but "Pricing and Support" showed Azure Reservations Provide Savings behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "predictable",
                  correct: true,
                  guide:
                    'Correct: predictable matches the Azure Reservations Provide Savings behavior highlighted in "Pricing and Support".',
                },
                {
                  text: "ephemeral",
                  guide:
                    'This assumes ephemeral, but "Pricing and Support" showed Azure Reservations Provide Savings behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Pricing and Support" about Azure Reservations Provide Savings to guide your answer.',
            },
            {
              type: "DRAG_DROP",
              order: 3,
              question: "Arrange the steps to evaluate Azure cost support options:",
              options: [
                {
                  text: "Estimate spend with Pricing Calculator",
                  order: 1,
                  guide:
                    'This assumes Estimate spend with Pricing Calculator, but "Pricing and Support" showed Arrange Steps Evaluate Azure behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Review Advisor cost recommendations",
                  order: 2,
                  guide:
                    'This assumes Review Advisor cost recommendations, but "Pricing and Support" showed Arrange Steps Evaluate Azure behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Choose a support plan",
                  order: 3,
                  guide:
                    'This assumes Choose a support plan, but "Pricing and Support" showed Arrange Steps Evaluate Azure behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Monitor usage in Cost Management",
                  order: 4,
                  guide:
                    'This assumes Monitor usage in Cost Management, but "Pricing and Support" showed Arrange Steps Evaluate Azure behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Pricing and Support" about Arrange Steps Evaluate Azure to guide your answer.',
            },
          ],
        },
      ],
    },
    {
      title: "Security and Governance",
      description: "Apply Azure identity, security, and governance best practices.",
      order: 2,
      lessons: [
        {
          title: "Identity and Access",
          order: 1,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "Which Azure service manages users, groups, and authentication?",
              options: [
                {
                  text: "Azure Active Directory",
                  correct: true,
                  guide:
                    'Correct: Azure Active Directory matches the Azure Service Manages Users behavior highlighted in "Identity and Access".',
                },
                {
                  text: "Azure Policy",
                  guide:
                    'This assumes Azure Policy, but "Identity and Access" showed Azure Service Manages Users behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Azure Monitor",
                  guide:
                    'This assumes Azure Monitor, but "Identity and Access" showed Azure Service Manages Users behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Identity and Access" about Azure Service Manages Users to guide your answer.',
            },
            {
              type: "TRUE_FALSE",
              order: 2,
              question:
                "Multi-factor authentication can be enforced through Conditional Access policies.",
              options: [
                {
                  text: "True",
                  correct: true,
                  guide:
                    'Correct: True matches the Multi Factor Authentication Can behavior highlighted in "Identity and Access".',
                },
                {
                  text: "False",
                  guide:
                    'This assumes False, but "Identity and Access" showed Multi Factor Authentication Can behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Identity and Access" about Multi Factor Authentication Can to guide your answer.',
            },
            {
              type: "TEXT_INPUT",
              order: 3,
              question: "What principle recommends assigning permissions only when required?",
              correctAnswer: "Least privilege",
              hint: 'Use the example from "Identity and Access" about Principle Recommends Assigning Permissions to guide your answer.',
            },
          ],
        },
        {
          title: "Governance and Compliance",
          order: 2,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question:
                "Which service enforces organizational standards through policy definitions?",
              options: [
                {
                  text: "Azure Policy",
                  correct: true,
                  guide:
                    'Correct: Azure Policy matches the Service Enforces Organizational Standards behavior highlighted in "Governance and Compliance".',
                },
                {
                  text: "Azure Blueprints",
                  guide:
                    'This assumes Azure Blueprints, but "Governance and Compliance" showed Service Enforces Organizational Standards behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Azure Site Recovery",
                  guide:
                    'This assumes Azure Site Recovery, but "Governance and Compliance" showed Service Enforces Organizational Standards behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Governance and Compliance" about Service Enforces Organizational Standards to guide your answer.',
            },
            {
              type: "ASSIST",
              order: 2,
              question: "Complete: Azure Blueprints package ______, policies, and resource groups.",
              options: [
                {
                  text: "templates",
                  correct: true,
                  guide:
                    'Correct: templates matches the Azure Blueprints Package Blank behavior highlighted in "Governance and Compliance".',
                },
                {
                  text: "scripts",
                  guide:
                    'This assumes scripts, but "Governance and Compliance" showed Azure Blueprints Package Blank behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "tickets",
                  guide:
                    'This assumes tickets, but "Governance and Compliance" showed Azure Blueprints Package Blank behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Governance and Compliance" about Azure Blueprints Package Blank to guide your answer.',
            },
            {
              type: "DRAG_DROP",
              order: 3,
              question: "Order the tasks to establish compliant Azure environments:",
              options: [
                {
                  text: "Define governance requirements",
                  order: 1,
                  guide:
                    'This assumes Define governance requirements, but "Governance and Compliance" showed Order Tasks Establish Compliant behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Author policy definitions",
                  order: 2,
                  guide:
                    'This assumes Author policy definitions, but "Governance and Compliance" showed Order Tasks Establish Compliant behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Assign policies to scopes",
                  order: 3,
                  guide:
                    'This assumes Assign policies to scopes, but "Governance and Compliance" showed Order Tasks Establish Compliant behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Monitor compliance state",
                  order: 4,
                  guide:
                    'This assumes Monitor compliance state, but "Governance and Compliance" showed Order Tasks Establish Compliant behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Governance and Compliance" about Order Tasks Establish Compliant to guide your answer.',
            },
          ],
        },
      ],
    },
    {
      title: "Azure in the Real World",
      description: "Connect core Azure services to practical cloud adoption scenarios.",
      order: 3,
      lessons: [
        {
          title: "Migration Pathways",
          order: 1,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question:
                "Which service inventories on-premises workloads and provides readiness reports?",
              options: [
                {
                  text: "Azure Migrate",
                  correct: true,
                  guide:
                    'Correct: Azure Migrate matches the Service Inventories On Premises behavior highlighted in "Migration Pathways".',
                },
                {
                  text: "Azure Arc",
                  guide:
                    'This assumes Azure Arc, but "Migration Pathways" showed Service Inventories On Premises behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Azure Monitor",
                  guide:
                    'This assumes Azure Monitor, but "Migration Pathways" showed Service Inventories On Premises behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Migration Pathways" about Service Inventories On Premises to guide your answer.',
            },
            {
              type: "VIDEO",
              order: 2,
              question:
                "Watch the migration case study. Which landing zone pattern was recommended for the customer?",
              videoSrc:
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
              options: [
                {
                  text: "Enterprise-scale landing zone",
                  correct: true,
                  guide:
                    'Correct: Enterprise-scale landing zone matches the Watch Migration Case Study behavior highlighted in "Migration Pathways".',
                },
                {
                  text: "Hub-spoke only",
                  guide:
                    'This assumes Hub-spoke only, but "Migration Pathways" showed Watch Migration Case Study behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Single subscription",
                  guide:
                    'This assumes Single subscription, but "Migration Pathways" showed Watch Migration Case Study behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Manual resource groups",
                  guide:
                    'This assumes Manual resource groups, but "Migration Pathways" showed Watch Migration Case Study behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Migration Pathways" about Watch Migration Case Study to guide your answer.',
            },
            {
              type: "TEXT_INPUT",
              order: 3,
              question:
                "Name the Azure tool that helps track modernization progress with guided checklists.",
              correctAnswer: "Cloud Adoption Framework",
              hint: 'Use the example from "Migration Pathways" about Azure Tool Helps Track to guide your answer.',
            },
          ],
        },
        {
          title: "Sustainability Overview",
          order: 2,
          challenges: [
            {
              type: "TRUE_FALSE",
              order: 1,
              question:
                "Azure Sustainability Calculator provides data on estimated carbon emissions.",
              options: [
                {
                  text: "True",
                  correct: true,
                  guide:
                    'Correct: True matches the Azure Sustainability Calculator Provides behavior highlighted in "Sustainability Overview".',
                },
                {
                  text: "False",
                  guide:
                    'This assumes False, but "Sustainability Overview" showed Azure Sustainability Calculator Provides behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Sustainability Overview" about Azure Sustainability Calculator Provides to guide your answer.',
            },
            {
              type: "ASSIST",
              order: 2,
              question: "Complete: Azure Advisor Sustainability offers ______ recommendations.",
              options: [
                {
                  text: "cost",
                  guide:
                    'This assumes cost, but "Sustainability Overview" showed Azure Advisor Sustainability Offers behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "efficiency",
                  correct: true,
                  guide:
                    'Correct: efficiency matches the Azure Advisor Sustainability Offers behavior highlighted in "Sustainability Overview".',
                },
                {
                  text: "support",
                  guide:
                    'This assumes support, but "Sustainability Overview" showed Azure Advisor Sustainability Offers behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Sustainability Overview" about Azure Advisor Sustainability Offers to guide your answer.',
            },
            {
              type: "DRAG_DROP",
              order: 3,
              question: "Arrange the steps to evaluate sustainability impact:",
              options: [
                {
                  text: "Collect emissions data",
                  order: 1,
                  guide:
                    'This assumes Collect emissions data, but "Sustainability Overview" showed Arrange Steps Evaluate Sustainability behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Analyze energy usage trends",
                  order: 2,
                  guide:
                    'This assumes Analyze energy usage trends, but "Sustainability Overview" showed Arrange Steps Evaluate Sustainability behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Implement optimization actions",
                  order: 3,
                  guide:
                    'This assumes Implement optimization actions, but "Sustainability Overview" showed Arrange Steps Evaluate Sustainability behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Report outcomes to stakeholders",
                  order: 4,
                  guide:
                    'This assumes Report outcomes to stakeholders, but "Sustainability Overview" showed Arrange Steps Evaluate Sustainability behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Sustainability Overview" about Arrange Steps Evaluate Sustainability to guide your answer.',
            },
          ],
        },
      ],
    },
    {
      title: "Real-World Application Lab",
      description:
        "Apply Azure Fundamentals AZ-900 skills to architecture, operations, and optimization scenarios.",
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
