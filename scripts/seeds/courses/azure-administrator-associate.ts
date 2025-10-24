import { CourseSeed } from "../types"

export const azureAdministratorAssociateCourse: CourseSeed = {
  id: 9,
  title: "Azure Administrator Associate AZ-104",
  imageSrc: "/azure-administrator.svg",
  category: "Azure",
  description:
    "Manage Azure identities, storage, compute, and networking for production workloads.",
  level: "Intermediate",
  duration: "3-5 hours",
  units: [
    {
      title: "Operations Management",
      description: "Administer compute, storage, and monitoring solutions in Azure.",
      order: 1,
      lessons: [
        {
          title: "Virtual Machine Operations",
          order: 1,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "Which feature orchestrates updates across multiple virtual machines?",
              options: [
                {
                  text: "Update Management Center",
                  correct: true,
                  guide:
                    'Correct: Update Management Center matches the Feature Orchestrates Updates Across behavior highlighted in "Virtual Machine Operations".',
                },
                {
                  text: "Azure Monitor Metrics",
                  guide:
                    'This assumes Azure Monitor Metrics, but "Virtual Machine Operations" showed Feature Orchestrates Updates Across behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Azure Arc",
                  guide:
                    'This assumes Azure Arc, but "Virtual Machine Operations" showed Feature Orchestrates Updates Across behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Virtual Machine Operations" about Feature Orchestrates Updates Across to guide your answer.',
            },
            {
              type: "VIDEO",
              order: 2,
              question:
                "Watch the clip about VM backup options. Which service provides policy-based backups?",
              videoSrc:
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
              options: [
                {
                  text: "Azure Backup",
                  correct: true,
                  guide:
                    'Correct: Azure Backup matches the Watch Clip About Vm behavior highlighted in "Virtual Machine Operations".',
                },
                {
                  text: "Azure Files",
                  guide:
                    'This assumes Azure Files, but "Virtual Machine Operations" showed Watch Clip About Vm behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Azure Site Recovery",
                  guide:
                    'This assumes Azure Site Recovery, but "Virtual Machine Operations" showed Watch Clip About Vm behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Azure DevOps",
                  guide:
                    'This assumes Azure DevOps, but "Virtual Machine Operations" showed Watch Clip About Vm behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Virtual Machine Operations" about Watch Clip About Vm to guide your answer.',
            },
            {
              type: "TEXT_INPUT",
              order: 3,
              question: "Name the Azure tool used to capture a reusable VM configuration baseline.",
              correctAnswer: "Azure Image Builder",
              hint: 'Use the example from "Virtual Machine Operations" about Azure Tool Used Capture to guide your answer.',
            },
          ],
        },
        {
          title: "Storage and Monitoring",
          order: 2,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question:
                "Which monitoring feature aggregates log data and provides Kusto-based queries?",
              options: [
                {
                  text: "Log Analytics workspace",
                  correct: true,
                  guide:
                    'Correct: Log Analytics workspace matches the Monitoring Feature Aggregates Log behavior highlighted in "Storage and Monitoring".',
                },
                {
                  text: "Azure Advisor",
                  guide:
                    'This assumes Azure Advisor, but "Storage and Monitoring" showed Monitoring Feature Aggregates Log behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Azure Automation",
                  guide:
                    'This assumes Azure Automation, but "Storage and Monitoring" showed Monitoring Feature Aggregates Log behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Storage and Monitoring" about Monitoring Feature Aggregates Log to guide your answer.',
            },
            {
              type: "ASSIST",
              order: 2,
              question:
                "Complete: Azure Storage lifecycle policies move data between tiers ______.",
              options: [
                {
                  text: "manually",
                  guide:
                    'This assumes manually, but "Storage and Monitoring" showed Azure Storage Lifecycle Policies behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "automatically",
                  correct: true,
                  guide:
                    'Correct: automatically matches the Azure Storage Lifecycle Policies behavior highlighted in "Storage and Monitoring".',
                },
                {
                  text: "externally",
                  guide:
                    'This assumes externally, but "Storage and Monitoring" showed Azure Storage Lifecycle Policies behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Storage and Monitoring" about Azure Storage Lifecycle Policies to guide your answer.',
            },
            {
              type: "IMAGE_SELECT",
              order: 3,
              question: "Select the icon for Azure Application Insights.",
              options: [
                {
                  text: "Application Insights Logo",
                  imageSrc: "/azure-app-insights-icon.png",
                  correct: true,
                  guide:
                    'Correct: Application Insights Logo matches the Icon Azure Application Insights behavior highlighted in "Storage and Monitoring".',
                },
                {
                  text: "Azure Policy Logo",
                  imageSrc: "/azure-policy-icon.png",
                  guide:
                    'This assumes Azure Policy Logo, but "Storage and Monitoring" showed Icon Azure Application Insights behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Azure Monitor Logo",
                  imageSrc: "/azure-monitor-icon.png",
                  guide:
                    'This assumes Azure Monitor Logo, but "Storage and Monitoring" showed Icon Azure Application Insights behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Storage and Monitoring" about Icon Azure Application Insights to guide your answer.',
            },
          ],
        },
      ],
    },
    {
      title: "Networking and Security",
      description: "Configure networking, load balancing, and identity protections.",
      order: 2,
      lessons: [
        {
          title: "Connectivity Solutions",
          order: 1,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "Which service provides DNS hosting and traffic routing across regions?",
              options: [
                {
                  text: "Azure Traffic Manager",
                  correct: true,
                  guide:
                    'Correct: Azure Traffic Manager matches the Service Provides Dns Hosting behavior highlighted in "Connectivity Solutions".',
                },
                {
                  text: "Azure Load Testing",
                  guide:
                    'This assumes Azure Load Testing, but "Connectivity Solutions" showed Service Provides Dns Hosting behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Azure Bastion",
                  guide:
                    'This assumes Azure Bastion, but "Connectivity Solutions" showed Service Provides Dns Hosting behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Connectivity Solutions" about Service Provides Dns Hosting to guide your answer.',
            },
            {
              type: "DRAG_DROP",
              order: 2,
              question: "Arrange the steps to configure a VPN gateway connection:",
              options: [
                {
                  text: "Create virtual network gateway",
                  order: 1,
                  guide:
                    'This assumes Create virtual network gateway, but "Connectivity Solutions" showed Arrange Steps Configure Vpn behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Define local network gateway",
                  order: 2,
                  guide:
                    'This assumes Define local network gateway, but "Connectivity Solutions" showed Arrange Steps Configure Vpn behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Configure shared key",
                  order: 3,
                  guide:
                    'This assumes Configure shared key, but "Connectivity Solutions" showed Arrange Steps Configure Vpn behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Establish site-to-site connection",
                  order: 4,
                  guide:
                    'This assumes Establish site-to-site connection, but "Connectivity Solutions" showed Arrange Steps Configure Vpn behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Connectivity Solutions" about Arrange Steps Configure Vpn to guide your answer.',
            },
            {
              type: "TRUE_FALSE",
              order: 3,
              question:
                "Azure Load Balancer supports both inbound and outbound connectivity scenarios.",
              options: [
                {
                  text: "True",
                  correct: true,
                  guide:
                    'Correct: True matches the Azure Load Balancer Supports behavior highlighted in "Connectivity Solutions".',
                },
                {
                  text: "False",
                  guide:
                    'This assumes False, but "Connectivity Solutions" showed Azure Load Balancer Supports behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Connectivity Solutions" about Azure Load Balancer Supports to guide your answer.',
            },
          ],
        },
        {
          title: "Identity Protection",
          order: 2,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "Which feature provides just-in-time VM access with time-bound approvals?",
              options: [
                {
                  text: "Azure Security Center JIT",
                  correct: true,
                  guide:
                    'Correct: Azure Security Center JIT matches the Feature Provides Just Time behavior highlighted in "Identity Protection".',
                },
                {
                  text: "Azure Sentinel",
                  guide:
                    'This assumes Azure Sentinel, but "Identity Protection" showed Feature Provides Just Time behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Azure Bastion",
                  guide:
                    'This assumes Azure Bastion, but "Identity Protection" showed Feature Provides Just Time behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Identity Protection"—it explained how Feature Provides Just Time works within Microsoft Azure.',
            },
            {
              type: "ASSIST",
              order: 2,
              question: "Complete: Conditional Access policies evaluate user and ______ signals.",
              options: [
                {
                  text: "storage",
                  guide:
                    'This assumes storage, but "Identity Protection" showed Conditional Access Policies Evaluate behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "sign-in",
                  correct: true,
                  guide:
                    'Correct: sign-in matches the Conditional Access Policies Evaluate behavior highlighted in "Identity Protection".',
                },
                {
                  text: "billing",
                  guide:
                    'This assumes billing, but "Identity Protection" showed Conditional Access Policies Evaluate behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Identity Protection"—it explained how Conditional Access Policies Evaluate works within Microsoft Azure.',
            },
            {
              type: "TEXT_INPUT",
              order: 3,
              question:
                "Name the Azure AD capability that recommends policy changes based on risky sign-ins.",
              correctAnswer: "Identity Protection",
              hint: 'Remember the pattern you practiced in "Identity Protection"—it explained how Azure Ad Capability Recommends works within Microsoft Azure.',
            },
          ],
        },
      ],
    },
    {
      title: "Platform Automation",
      description: "Automate deployments, enforce compliance, and optimize spending.",
      order: 3,
      lessons: [
        {
          title: "Infrastructure Automation",
          order: 1,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "Which ARM-based service delivers repeatable deployments at scale?",
              options: [
                {
                  text: "Azure Bicep",
                  correct: true,
                  guide:
                    'Correct: Azure Bicep matches the Arm Based Service Delivers behavior highlighted in "Infrastructure Automation".',
                },
                {
                  text: "Azure DevTest Labs",
                  guide:
                    'This assumes Azure DevTest Labs, but "Infrastructure Automation" showed Arm Based Service Delivers behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Azure Functions",
                  guide:
                    'This assumes Azure Functions, but "Infrastructure Automation" showed Arm Based Service Delivers behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Infrastructure Automation"—it explained how Arm Based Service Delivers works within Microsoft Azure.',
            },
            {
              type: "TRUE_FALSE",
              order: 2,
              question:
                "Azure Automation Update Management can patch both Windows and Linux servers.",
              options: [
                {
                  text: "True",
                  correct: true,
                  guide:
                    'Correct: True matches the Azure Automation Update Management behavior highlighted in "Infrastructure Automation".',
                },
                {
                  text: "False",
                  guide:
                    'This assumes False, but "Infrastructure Automation" showed Azure Automation Update Management behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Infrastructure Automation"—it explained how Azure Automation Update Management works within Microsoft Azure.',
            },
            {
              type: "DRAG_DROP",
              order: 3,
              question: "Order the steps to onboard servers to Azure Automation:",
              options: [
                {
                  text: "Create automation account",
                  order: 1,
                  guide:
                    'This assumes Create automation account, but "Infrastructure Automation" showed Order Steps Onboard Servers behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Install hybrid worker",
                  order: 2,
                  guide:
                    'This assumes Install hybrid worker, but "Infrastructure Automation" showed Order Steps Onboard Servers behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Assign update schedules",
                  order: 3,
                  guide:
                    'This assumes Assign update schedules, but "Infrastructure Automation" showed Order Steps Onboard Servers behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Review compliance reports",
                  order: 4,
                  guide:
                    'This assumes Review compliance reports, but "Infrastructure Automation" showed Order Steps Onboard Servers behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Infrastructure Automation"—it explained how Order Steps Onboard Servers works within Microsoft Azure.',
            },
          ],
        },
        {
          title: "Governance & Cost",
          order: 2,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question:
                "Which service implements guardrails and blueprints for multi-tenant environments?",
              options: [
                {
                  text: "Azure Lighthouse",
                  correct: true,
                  guide:
                    'Correct: Azure Lighthouse matches the Service Implements Guardrails Blueprints behavior highlighted in "Governance & Cost".',
                },
                {
                  text: "Azure Solutions",
                  guide:
                    'This assumes Azure Solutions, but "Governance & Cost" showed Service Implements Guardrails Blueprints behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Azure Maps",
                  guide:
                    'This assumes Azure Maps, but "Governance & Cost" showed Service Implements Guardrails Blueprints behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Governance & Cost" about Service Implements Guardrails Blueprints to guide your answer.',
            },
            {
              type: "TEXT_INPUT",
              order: 2,
              question:
                "What cost management feature automatically suspends dev/test resources outside business hours?",
              correctAnswer: "Azure Automation runbooks",
              hint: 'Use the example from "Governance & Cost" about Cost Management Feature Automatically to guide your answer.',
            },
            {
              type: "LISTENING",
              order: 3,
              question:
                "Listen to the monthly governance meeting. Which tag policy was prioritized?",
              audioSrc: "/audio/azure-tag-policy.mp3",
              options: [
                {
                  text: "Enforce cost center tag",
                  correct: true,
                  guide:
                    'Correct: Enforce cost center tag matches the Listen Monthly Governance Meeting behavior highlighted in "Governance & Cost".',
                },
                {
                  text: "Remove owner tag",
                  guide:
                    'This assumes Remove owner tag, but "Governance & Cost" showed Listen Monthly Governance Meeting behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Rename subscription",
                  guide:
                    'This assumes Rename subscription, but "Governance & Cost" showed Listen Monthly Governance Meeting behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Disable diagnostics",
                  guide:
                    'This assumes Disable diagnostics, but "Governance & Cost" showed Listen Monthly Governance Meeting behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Governance & Cost" about Listen Monthly Governance Meeting to guide your answer.',
            },
          ],
        },
      ],
    },
    {
      title: "Real-World Application Lab",
      description:
        "Apply Azure Administrator Associate AZ-104 skills to architecture, operations, and optimization scenarios.",
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
