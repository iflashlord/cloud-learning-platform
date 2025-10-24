import { CourseSeed } from "../types"

export const googleCloudProfessionalArchitectCourse: CourseSeed = {
  id: 7,
  title: "Google Cloud Professional Architect",
  imageSrc: "/gcp-professional-architect.svg",
  category: "Google Cloud",
  description:
    "Design resilient, secure, and scalable solutions that leverage the full Google Cloud portfolio.",
  level: "Advanced",
  duration: "4-6 hours",
  units: [
    {
      title: "Resilient Architectures",
      description: "Architect multi-region, highly available workloads on Google Cloud.",
      order: 1,
      lessons: [
        {
          title: "High Availability Patterns",
          order: 1,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question:
                "Which product provides global load balancing with automatic multi-region failover?",
              options: [
                {
                  text: "Cloud Load Balancing",
                  correct: true,
                  guide:
                    'Correct: Cloud Load Balancing matches the Product Provides Global Load behavior highlighted in "High Availability Patterns".',
                },
                {
                  text: "Cloud CDN",
                  guide:
                    'This assumes Cloud CDN, but "High Availability Patterns" showed Product Provides Global Load behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Cloud Run",
                  guide:
                    'This assumes Cloud Run, but "High Availability Patterns" showed Product Provides Global Load behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "High Availability Patterns"—it explained how Product Provides Global Load works within Google Cloud.',
            },
            {
              type: "TRUE_FALSE",
              order: 2,
              question: "Managed instance groups can automatically recreate VMs in another zone.",
              options: [
                {
                  text: "True",
                  correct: true,
                  guide:
                    'Correct: True matches the Managed Instance Groups Can behavior highlighted in "High Availability Patterns".',
                },
                {
                  text: "False",
                  guide:
                    'This assumes False, but "High Availability Patterns" showed Managed Instance Groups Can behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "High Availability Patterns"—it explained how Managed Instance Groups Can works within Google Cloud.',
            },
            {
              type: "TEXT_INPUT",
              order: 3,
              question:
                "Name the globally distributed relational database service that delivers strong consistency.",
              correctAnswer: "Cloud Spanner",
              hint: 'Remember the pattern you practiced in "High Availability Patterns"—it explained how Globally Distributed Relational Database works within Google Cloud.',
            },
          ],
        },
        {
          title: "Data Platform Choices",
          order: 2,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "Which service is best suited for petabyte-scale analytical workloads?",
              options: [
                {
                  text: "BigQuery",
                  correct: true,
                  guide:
                    'Correct: BigQuery matches the Service Best Suited Petabyte behavior highlighted in "Data Platform Choices".',
                },
                {
                  text: "Cloud Dataproc",
                  guide:
                    'This assumes Cloud Dataproc, but "Data Platform Choices" showed Service Best Suited Petabyte behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Firestore",
                  guide:
                    'This assumes Firestore, but "Data Platform Choices" showed Service Best Suited Petabyte behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Data Platform Choices" about Service Best Suited Petabyte to guide your answer.',
            },
            {
              type: "ASSIST",
              order: 2,
              question: "Complete: Dataflow offers ______ data processing pipelines.",
              options: [
                {
                  text: "manual",
                  guide:
                    'This assumes manual, but "Data Platform Choices" showed Dataflow Offers Blank Data behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "serverless",
                  correct: true,
                  guide:
                    'Correct: serverless matches the Dataflow Offers Blank Data behavior highlighted in "Data Platform Choices".',
                },
                {
                  text: "batch-only",
                  guide:
                    'This assumes batch-only, but "Data Platform Choices" showed Dataflow Offers Blank Data behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Data Platform Choices" about Dataflow Offers Blank Data to guide your answer.',
            },
            {
              type: "DRAG_DROP",
              order: 3,
              question: "Arrange the steps to design a secure analytics pipeline:",
              options: [
                {
                  text: "Ingest data with Pub/Sub",
                  order: 1,
                  guide:
                    'This assumes Ingest data with Pub/Sub, but "Data Platform Choices" showed Arrange Steps Design Secure behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Process with Dataflow",
                  order: 2,
                  guide:
                    'This assumes Process with Dataflow, but "Data Platform Choices" showed Arrange Steps Design Secure behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Store curated data in BigQuery",
                  order: 3,
                  guide:
                    'This assumes Store curated data in BigQuery, but "Data Platform Choices" showed Arrange Steps Design Secure behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Expose insights with Looker",
                  order: 4,
                  guide:
                    'This assumes Expose insights with Looker, but "Data Platform Choices" showed Arrange Steps Design Secure behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Data Platform Choices" about Arrange Steps Design Secure to guide your answer.',
            },
          ],
        },
      ],
    },
    {
      title: "Security and Operations",
      description: "Apply zero-trust security principles and operate production workloads.",
      order: 2,
      lessons: [
        {
          title: "Security Architecture",
          order: 1,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question:
                "Which Google Cloud service mitigates DDoS attacks and enforces edge security policies?",
              options: [
                {
                  text: "Cloud Armor",
                  correct: true,
                  guide:
                    'Correct: Cloud Armor matches the Google Cloud Service Mitigates behavior highlighted in "Security Architecture".',
                },
                {
                  text: "Cloud Functions",
                  guide:
                    'This assumes Cloud Functions, but "Security Architecture" showed Google Cloud Service Mitigates behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Artifact Registry",
                  guide:
                    'This assumes Artifact Registry, but "Security Architecture" showed Google Cloud Service Mitigates behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Security Architecture" and how it framed Google Cloud Service Mitigates. Apply the same reasoning here.',
            },
            {
              type: "TRUE_FALSE",
              order: 2,
              question:
                "VPC Service Controls help prevent data exfiltration from managed services.",
              options: [
                {
                  text: "True",
                  correct: true,
                  guide:
                    'Correct: True matches the Vpc Service Controls Help behavior highlighted in "Security Architecture".',
                },
                {
                  text: "False",
                  guide:
                    'This assumes False, but "Security Architecture" showed Vpc Service Controls Help behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Security Architecture" and how it framed Vpc Service Controls Help. Apply the same reasoning here.',
            },
            {
              type: "TEXT_INPUT",
              order: 3,
              question:
                "What security philosophy emphasizes continuous verification and minimal trust?",
              correctAnswer: "Zero trust",
              hint: 'Think back to "Security Architecture" and how it framed Security Philosophy Emphasizes Continuous. Apply the same reasoning here.',
            },
          ],
        },
        {
          title: "Operations Excellence",
          order: 2,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question:
                "Which component of the Google Cloud Operations suite centralizes logs from infrastructure and services?",
              options: [
                {
                  text: "Cloud Logging",
                  correct: true,
                  guide:
                    'Correct: Cloud Logging matches the Component Google Cloud Operations behavior highlighted in "Operations Excellence".',
                },
                {
                  text: "Cloud Deploy",
                  guide:
                    'This assumes Cloud Deploy, but "Operations Excellence" showed Component Google Cloud Operations behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Secret Manager",
                  guide:
                    'This assumes Secret Manager, but "Operations Excellence" showed Component Google Cloud Operations behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Operations Excellence"—it explained how Component Google Cloud Operations works within Google Cloud.',
            },
            {
              type: "ASSIST",
              order: 2,
              question: "Complete: SRE runbooks should document ______ responses to alerts.",
              options: [
                {
                  text: "manual",
                  guide:
                    'This assumes manual, but "Operations Excellence" showed Sre Runbooks Should Document behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "standardized",
                  correct: true,
                  guide:
                    'Correct: standardized matches the Sre Runbooks Should Document behavior highlighted in "Operations Excellence".',
                },
                {
                  text: "optional",
                  guide:
                    'This assumes optional, but "Operations Excellence" showed Sre Runbooks Should Document behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Operations Excellence"—it explained how Sre Runbooks Should Document works within Google Cloud.',
            },
            {
              type: "DRAG_DROP",
              order: 3,
              question: "Order the lifecycle for managing production incidents in Google Cloud:",
              options: [
                {
                  text: "Detect issue with alerting",
                  order: 1,
                  guide:
                    'This assumes Detect issue with alerting, but "Operations Excellence" showed Order Lifecycle Managing Production behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Mitigate impact using playbooks",
                  order: 2,
                  guide:
                    'This assumes Mitigate impact using playbooks, but "Operations Excellence" showed Order Lifecycle Managing Production behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Conduct blameless postmortem",
                  order: 3,
                  guide:
                    'This assumes Conduct blameless postmortem, but "Operations Excellence" showed Order Lifecycle Managing Production behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Implement follow-up actions",
                  order: 4,
                  guide:
                    'This assumes Implement follow-up actions, but "Operations Excellence" showed Order Lifecycle Managing Production behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Operations Excellence"—it explained how Order Lifecycle Managing Production works within Google Cloud.',
            },
          ],
        },
      ],
    },
    {
      title: "Architecture Governance",
      description: "Align enterprise architecture standards with Google Cloud.",
      order: 3,
      lessons: [
        {
          title: "Blueprinting & Controls",
          order: 1,
          challenges: [
            {
              type: "VIDEO",
              order: 1,
              question:
                "Watch the governance briefing. Which solution automates guardrail deployment across environments?",
              videoSrc:
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
              options: [
                {
                  text: "Google Cloud Landing Zone",
                  correct: true,
                  guide:
                    'Correct: Google Cloud Landing Zone matches the Watch Governance Briefing Solution behavior highlighted in "Blueprinting & Controls".',
                },
                {
                  text: "Cloud Run Jobs",
                  guide:
                    'This assumes Cloud Run Jobs, but "Blueprinting & Controls" showed Watch Governance Briefing Solution behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Vertex AI Workbench",
                  guide:
                    'This assumes Vertex AI Workbench, but "Blueprinting & Controls" showed Watch Governance Briefing Solution behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Dataplex",
                  guide:
                    'This assumes Dataplex, but "Blueprinting & Controls" showed Watch Governance Briefing Solution behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Blueprinting & Controls" about Watch Governance Briefing Solution to guide your answer.',
            },
            {
              type: "SELECT",
              order: 2,
              question: "Which service manages automated policy compliance for BigQuery datasets?",
              options: [
                {
                  text: "Dataplex",
                  correct: true,
                  guide:
                    'Correct: Dataplex matches the Service Manages Automated Policy behavior highlighted in "Blueprinting & Controls".',
                },
                {
                  text: "Cloud Composer",
                  guide:
                    'This assumes Cloud Composer, but "Blueprinting & Controls" showed Service Manages Automated Policy behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Data Studio",
                  guide:
                    'This assumes Data Studio, but "Blueprinting & Controls" showed Service Manages Automated Policy behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Blueprinting & Controls" about Service Manages Automated Policy to guide your answer.',
            },
            {
              type: "TEXT_INPUT",
              order: 3,
              question:
                "Name the product that provides org-wide policy insights and remediation actions.",
              correctAnswer: "Policy Intelligence",
              hint: 'Use the example from "Blueprinting & Controls" about Product Provides Org Wide to guide your answer.',
            },
          ],
        },
        {
          title: "Cost and Sustainability",
          order: 2,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "Which tool forecasts Google Cloud spend using historical trends?",
              options: [
                {
                  text: "Cost Table Explorer",
                  guide:
                    'This assumes Cost Table Explorer, but "Cost and Sustainability" showed Tool Forecasts Google Cloud behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Cost forecasts in Cloud Billing",
                  correct: true,
                  guide:
                    'Correct: Cost forecasts in Cloud Billing matches the Tool Forecasts Google Cloud behavior highlighted in "Cost and Sustainability".',
                },
                {
                  text: "Activity Logs",
                  guide:
                    'This assumes Activity Logs, but "Cost and Sustainability" showed Tool Forecasts Google Cloud behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Cost and Sustainability"—it explained how Tool Forecasts Google Cloud works within Google Cloud.',
            },
            {
              type: "ASSIST",
              order: 2,
              question:
                "Complete: Active Assist provides ______ recommendations across your environment.",
              options: [
                {
                  text: "manual",
                  guide:
                    'This assumes manual, but "Cost and Sustainability" showed Active Assist Provides Blank behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "AI-powered",
                  correct: true,
                  guide:
                    'Correct: AI-powered matches the Active Assist Provides Blank behavior highlighted in "Cost and Sustainability".',
                },
                {
                  text: "billing-only",
                  guide:
                    'This assumes billing-only, but "Cost and Sustainability" showed Active Assist Provides Blank behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Cost and Sustainability"—it explained how Active Assist Provides Blank works within Google Cloud.',
            },
            {
              type: "DRAG_DROP",
              order: 3,
              question: "Arrange the steps to align projects with sustainability KPIs:",
              options: [
                {
                  text: "Collect Carbon Footprint metrics",
                  order: 1,
                  guide:
                    'This assumes Collect Carbon Footprint metrics, but "Cost and Sustainability" showed Arrange Steps Align Projects behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Compare emissions per workload",
                  order: 2,
                  guide:
                    'This assumes Compare emissions per workload, but "Cost and Sustainability" showed Arrange Steps Align Projects behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Implement regional placement policies",
                  order: 3,
                  guide:
                    'This assumes Implement regional placement policies, but "Cost and Sustainability" showed Arrange Steps Align Projects behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Report outcomes to leadership",
                  order: 4,
                  guide:
                    'This assumes Report outcomes to leadership, but "Cost and Sustainability" showed Arrange Steps Align Projects behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Cost and Sustainability"—it explained how Arrange Steps Align Projects works within Google Cloud.',
            },
          ],
        },
      ],
    },
    {
      title: "Real-World Application Lab",
      description:
        "Apply Google Cloud Professional Architect skills to architecture, operations, and optimization scenarios.",
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
