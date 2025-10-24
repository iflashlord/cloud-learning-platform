import { CourseSeed } from "../types"

export const awsSysOpsAdministratorCourse: CourseSeed = {
  id: 4,
  title: "AWS SysOps Administrator",
  imageSrc: "/aws-sysops.svg",
  category: "DevOps",
  description:
    "Develop expertise in deploying, managing, and operating AWS systems. Perfect for system administrators.",
  level: "Advanced",
  duration: "5-7 hours",
  units: [
    {
      title: "Monitoring & Reporting",
      description: "Collect metrics, logs, and insights to operate workloads",
      order: 1,
      lessons: [
        {
          title: "CloudWatch Monitoring",
          order: 1,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "Which CloudWatch feature lets you visualize multiple metrics together?",
              options: [
                {
                  text: "Dashboards",
                  correct: true,
                  guide:
                    'Correct: Dashboards matches the Cloudwatch Feature Lets You behavior highlighted in "CloudWatch Monitoring".',
                },
                {
                  text: "Logs Insights",
                  guide:
                    'This assumes Logs Insights, but "CloudWatch Monitoring" showed Cloudwatch Feature Lets You behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Contributor Insights",
                  guide:
                    'This assumes Contributor Insights, but "CloudWatch Monitoring" showed Cloudwatch Feature Lets You behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "CloudWatch Monitoring" and how it framed Cloudwatch Feature Lets You. Apply the same reasoning here.',
            },
            {
              type: "TRUE_FALSE",
              order: 2,
              question: "CloudWatch composite alarms can evaluate multiple alarms at once.",
              options: [
                {
                  text: "True",
                  correct: true,
                  guide:
                    'Correct: True matches the Cloudwatch Composite Alarms Can behavior highlighted in "CloudWatch Monitoring".',
                },
                {
                  text: "False",
                  guide:
                    'This assumes False, but "CloudWatch Monitoring" showed Cloudwatch Composite Alarms Can behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "CloudWatch Monitoring" and how it framed Cloudwatch Composite Alarms Can. Apply the same reasoning here.',
            },
            {
              type: "TEXT_INPUT",
              order: 3,
              question:
                "Name the feature used to create custom metric queries using SQL-like syntax.",
              correctAnswer: "CloudWatch Logs Insights",
              hint: 'Think back to "CloudWatch Monitoring" and how it framed Feature Used Create Custom. Apply the same reasoning here.',
            },
          ],
        },
        {
          title: "Logging & Metrics",
          order: 2,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question:
                "Which service centralizes and analyzes VPC flow, DNS, and CloudTrail logs?",
              options: [
                {
                  text: "Amazon CloudWatch Logs",
                  guide:
                    'This assumes Amazon CloudWatch Logs, but "Logging & Metrics" showed Service Centralizes Analyzes Vpc behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Amazon OpenSearch Service",
                  correct: true,
                  guide:
                    'Correct: Amazon OpenSearch Service matches the Service Centralizes Analyzes Vpc behavior highlighted in "Logging & Metrics".',
                },
                {
                  text: "AWS Systems Manager",
                  guide:
                    'This assumes AWS Systems Manager, but "Logging & Metrics" showed Service Centralizes Analyzes Vpc behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Logging & Metrics" about Service Centralizes Analyzes Vpc to guide your answer.',
            },
            {
              type: "ASSIST",
              order: 2,
              question: "Complete: AWS CloudTrail records API activity for ______ days by default.",
              options: [
                {
                  text: "30",
                  guide:
                    'This assumes 30, but "Logging & Metrics" showed Aws Cloudtrail Records Api behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "90",
                  guide:
                    'This assumes 90, but "Logging & Metrics" showed Aws Cloudtrail Records Api behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "365",
                  correct: true,
                  guide:
                    'Correct: 365 matches the Aws Cloudtrail Records Api behavior highlighted in "Logging & Metrics".',
                },
              ],
              hint: 'Use the example from "Logging & Metrics" about Aws Cloudtrail Records Api to guide your answer.',
            },
            {
              type: "DRAG_DROP",
              order: 3,
              question: "Order the steps to ship application logs to CloudWatch Logs:",
              options: [
                {
                  text: "Install CloudWatch agent",
                  order: 1,
                  guide:
                    'This assumes Install CloudWatch agent, but "Logging & Metrics" showed Order Steps Ship Application behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Configure log file locations",
                  order: 2,
                  guide:
                    'This assumes Configure log file locations, but "Logging & Metrics" showed Order Steps Ship Application behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Attach IAM permissions",
                  order: 3,
                  guide:
                    'This assumes Attach IAM permissions, but "Logging & Metrics" showed Order Steps Ship Application behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Validate delivery",
                  order: 4,
                  guide:
                    'This assumes Validate delivery, but "Logging & Metrics" showed Order Steps Ship Application behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Logging & Metrics" about Order Steps Ship Application to guide your answer.',
            },
          ],
        },
        {
          title: "Incident Response",
          order: 3,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "Which service helps coordinate incident response playbooks?",
              options: [
                {
                  text: "AWS Systems Manager Incident Manager",
                  correct: true,
                  guide:
                    'Correct: AWS Systems Manager Incident Manager matches the Service Helps Coordinate Incident behavior highlighted in "Incident Response".',
                },
                {
                  text: "AWS Fault Injection Simulator",
                  guide:
                    'This assumes AWS Fault Injection Simulator, but "Incident Response" showed Service Helps Coordinate Incident behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Amazon Detective",
                  guide:
                    'This assumes Amazon Detective, but "Incident Response" showed Service Helps Coordinate Incident behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Incident Response" about Service Helps Coordinate Incident to guide your answer.',
            },
            {
              type: "TRUE_FALSE",
              order: 2,
              question:
                "Systems Manager OpsCenter can aggregate operational issues across accounts.",
              options: [
                {
                  text: "True",
                  correct: true,
                  guide:
                    'Correct: True matches the Systems Manager Opscenter Can behavior highlighted in "Incident Response".',
                },
                {
                  text: "False",
                  guide:
                    'This assumes False, but "Incident Response" showed Systems Manager Opscenter Can behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Incident Response" about Systems Manager Opscenter Can to guide your answer.',
            },
            {
              type: "TEXT_INPUT",
              order: 3,
              question:
                "What AWS service provides post-incident analysis with integrated metrics and logs?",
              correctAnswer: "AWS Resilience Hub",
              hint: 'Use the example from "Incident Response" about Aws Service Provides Post to guide your answer.',
            },
          ],
        },
      ],
    },
    {
      title: "High Availability & Scalability",
      description: "Ensure applications remain available and responsive under varying load",
      order: 2,
      lessons: [
        {
          title: "Auto Scaling Operations",
          order: 1,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "Which scaling policy adjusts capacity based on a target metric value?",
              options: [
                {
                  text: "Target tracking scaling",
                  correct: true,
                  guide:
                    'Correct: Target tracking scaling matches the Scaling Policy Adjusts Capacity behavior highlighted in "Auto Scaling Operations".',
                },
                {
                  text: "Step scaling",
                  guide:
                    'This assumes Step scaling, but "Auto Scaling Operations" showed Scaling Policy Adjusts Capacity behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Scheduled scaling",
                  guide:
                    'This assumes Scheduled scaling, but "Auto Scaling Operations" showed Scaling Policy Adjusts Capacity behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Auto Scaling Operations" and how it framed Scaling Policy Adjusts Capacity. Apply the same reasoning here.',
            },
            {
              type: "ASSIST",
              order: 2,
              question:
                "Complete: Launch templates replace ______ for defining instance configuration.",
              options: [
                {
                  text: "launch configurations",
                  correct: true,
                  guide:
                    'Correct: launch configurations matches the Launch Templates Replace Blank behavior highlighted in "Auto Scaling Operations".',
                },
                {
                  text: "IAM roles",
                  guide:
                    'This assumes IAM roles, but "Auto Scaling Operations" showed Launch Templates Replace Blank behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "security groups",
                  guide:
                    'This assumes security groups, but "Auto Scaling Operations" showed Launch Templates Replace Blank behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Auto Scaling Operations" and how it framed Launch Templates Replace Blank. Apply the same reasoning here.',
            },
            {
              type: "TRUE_FALSE",
              order: 3,
              question:
                "Auto Scaling groups can span multiple Availability Zones within a single region.",
              options: [
                {
                  text: "True",
                  correct: true,
                  guide:
                    'Correct: True matches the Auto Scaling Groups Can behavior highlighted in "Auto Scaling Operations".',
                },
                {
                  text: "False",
                  guide:
                    'This assumes False, but "Auto Scaling Operations" showed Auto Scaling Groups Can behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Auto Scaling Operations" and how it framed Auto Scaling Groups Can. Apply the same reasoning here.',
            },
          ],
        },
        {
          title: "Load Balancing",
          order: 2,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "Which load balancer supports routing based on URL paths and hostnames?",
              options: [
                {
                  text: "Application Load Balancer",
                  correct: true,
                  guide:
                    'Correct: Application Load Balancer matches the Load Balancer Supports Routing behavior highlighted in "Load Balancing".',
                },
                {
                  text: "Network Load Balancer",
                  guide:
                    'This assumes Network Load Balancer, but "Load Balancing" showed Load Balancer Supports Routing behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Gateway Load Balancer",
                  guide:
                    'This assumes Gateway Load Balancer, but "Load Balancing" showed Load Balancer Supports Routing behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Load Balancing" and how it framed Load Balancer Supports Routing. Apply the same reasoning here.',
            },
            {
              type: "TEXT_INPUT",
              order: 2,
              question: "Name the feature that checks instance health before sending traffic.",
              correctAnswer: "Health checks",
              hint: 'Think back to "Load Balancing" and how it framed Feature Checks Instance Health. Apply the same reasoning here.',
            },
            {
              type: "DRAG_DROP",
              order: 3,
              question: "Arrange the steps to configure cross-zone load balancing:",
              options: [
                {
                  text: "Enable setting in load balancer",
                  order: 1,
                  guide:
                    'This assumes Enable setting in load balancer, but "Load Balancing" showed Arrange Steps Configure Cross behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Verify AZs are enabled",
                  order: 2,
                  guide:
                    'This assumes Verify AZs are enabled, but "Load Balancing" showed Arrange Steps Configure Cross behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Confirm target registrations",
                  order: 3,
                  guide:
                    'This assumes Confirm target registrations, but "Load Balancing" showed Arrange Steps Configure Cross behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Test request distribution",
                  order: 4,
                  guide:
                    'This assumes Test request distribution, but "Load Balancing" showed Arrange Steps Configure Cross behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Load Balancing" and how it framed Arrange Steps Configure Cross. Apply the same reasoning here.',
            },
          ],
        },
        {
          title: "Backup Strategies",
          order: 3,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "Which service automates EBS snapshot lifecycle management?",
              options: [
                {
                  text: "Amazon Data Lifecycle Manager",
                  correct: true,
                  guide:
                    'Correct: Amazon Data Lifecycle Manager matches the Service Automates Ebs Snapshot behavior highlighted in "Backup Strategies".',
                },
                {
                  text: "AWS DataSync",
                  guide:
                    'This assumes AWS DataSync, but "Backup Strategies" showed Service Automates Ebs Snapshot behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "AWS Storage Gateway",
                  guide:
                    'This assumes AWS Storage Gateway, but "Backup Strategies" showed Service Automates Ebs Snapshot behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Backup Strategies" about Service Automates Ebs Snapshot to guide your answer.',
            },
            {
              type: "TRUE_FALSE",
              order: 2,
              question: "AWS Backup can enforce backup policies across multiple accounts.",
              options: [
                {
                  text: "True",
                  correct: true,
                  guide:
                    'Correct: True matches the Aws Backup Can Enforce behavior highlighted in "Backup Strategies".',
                },
                {
                  text: "False",
                  guide:
                    'This assumes False, but "Backup Strategies" showed Aws Backup Can Enforce behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Backup Strategies" about Aws Backup Can Enforce to guide your answer.',
            },
            {
              type: "TEXT_INPUT",
              order: 3,
              question: "What is the recommended AWS service for centralized backup auditing?",
              correctAnswer: "AWS Backup Audit Manager",
              hint: 'Use the example from "Backup Strategies" about Recommended Aws Service Centralized to guide your answer.',
            },
          ],
        },
      ],
    },
    {
      title: "Automation & Governance",
      description: "Automate operations and maintain compliant environments",
      order: 3,
      lessons: [
        {
          title: "Infrastructure Automation",
          order: 1,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question:
                "Which Systems Manager feature lets you automate common tasks with documents?",
              options: [
                {
                  text: "Automation",
                  correct: true,
                  guide:
                    'Correct: Automation matches the Systems Manager Feature Lets behavior highlighted in "Infrastructure Automation".',
                },
                {
                  text: "Fleet Manager",
                  guide:
                    'This assumes Fleet Manager, but "Infrastructure Automation" showed Systems Manager Feature Lets behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Session Manager",
                  guide:
                    'This assumes Session Manager, but "Infrastructure Automation" showed Systems Manager Feature Lets behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Infrastructure Automation"—it explained how Systems Manager Feature Lets works within AWS.',
            },
            {
              type: "ASSIST",
              order: 2,
              question:
                "Complete: Systems Manager Run Command can execute tasks across ______ instances.",
              options: [
                {
                  text: "multiple",
                  correct: true,
                  guide:
                    'Correct: multiple matches the Systems Manager Run Command behavior highlighted in "Infrastructure Automation".',
                },
                {
                  text: "single",
                  guide:
                    'This assumes single, but "Infrastructure Automation" showed Systems Manager Run Command behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "legacy",
                  guide:
                    'This assumes legacy, but "Infrastructure Automation" showed Systems Manager Run Command behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Infrastructure Automation"—it explained how Systems Manager Run Command works within AWS.',
            },
            {
              type: "TRUE_FALSE",
              order: 3,
              question: "State Manager maintains desired configuration through policy enforcement.",
              options: [
                {
                  text: "True",
                  correct: true,
                  guide:
                    'Correct: True matches the State Manager Maintains Desired behavior highlighted in "Infrastructure Automation".',
                },
                {
                  text: "False",
                  guide:
                    'This assumes False, but "Infrastructure Automation" showed State Manager Maintains Desired behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Infrastructure Automation"—it explained how State Manager Maintains Desired works within AWS.',
            },
          ],
        },
        {
          title: "Compliance & Auditing",
          order: 2,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question:
                "Which service provides a governance baseline across multi-account AWS environments?",
              options: [
                {
                  text: "AWS Control Tower",
                  correct: true,
                  guide:
                    'Correct: AWS Control Tower matches the Service Provides Governance Baseline behavior highlighted in "Compliance & Auditing".',
                },
                {
                  text: "AWS Resource Access Manager",
                  guide:
                    'This assumes AWS Resource Access Manager, but "Compliance & Auditing" showed Service Provides Governance Baseline behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "AWS Batch",
                  guide:
                    'This assumes AWS Batch, but "Compliance & Auditing" showed Service Provides Governance Baseline behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Compliance & Auditing" about Service Provides Governance Baseline to guide your answer.',
            },
            {
              type: "TEXT_INPUT",
              order: 2,
              question: "Name the service that records configuration changes for AWS resources.",
              correctAnswer: "AWS Config",
              hint: 'Use the example from "Compliance & Auditing" about Service Records Configuration Changes to guide your answer.',
            },
            {
              type: "TRUE_FALSE",
              order: 3,
              question: "AWS Config conformance packs evaluate resources against compliance rules.",
              options: [
                {
                  text: "True",
                  correct: true,
                  guide:
                    'Correct: True matches the Aws Config Conformance Packs behavior highlighted in "Compliance & Auditing".',
                },
                {
                  text: "False",
                  guide:
                    'This assumes False, but "Compliance & Auditing" showed Aws Config Conformance Packs behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Compliance & Auditing" about Aws Config Conformance Packs to guide your answer.',
            },
          ],
        },
        {
          title: "Cost Control",
          order: 3,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "Which service helps implement guardrails for cost and usage policies?",
              options: [
                {
                  text: "AWS Budgets",
                  correct: true,
                  guide:
                    'Correct: AWS Budgets matches the Service Helps Implement Guardrails behavior highlighted in "Cost Control".',
                },
                {
                  text: "Amazon Athena",
                  guide:
                    'This assumes Amazon Athena, but "Cost Control" showed Service Helps Implement Guardrails behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "AWS Batch",
                  guide:
                    'This assumes AWS Batch, but "Cost Control" showed Service Helps Implement Guardrails behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Cost Control"—it explained how Service Helps Implement Guardrails works within AWS.',
            },
            {
              type: "ASSIST",
              order: 2,
              question: "Complete: Tagging resources enables granular ______ allocations.",
              options: [
                {
                  text: "security",
                  guide:
                    'This assumes security, but "Cost Control" showed Tagging Resources Enables Granular behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "cost",
                  correct: true,
                  guide:
                    'Correct: cost matches the Tagging Resources Enables Granular behavior highlighted in "Cost Control".',
                },
                {
                  text: "latency",
                  guide:
                    'This assumes latency, but "Cost Control" showed Tagging Resources Enables Granular behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Cost Control"—it explained how Tagging Resources Enables Granular works within AWS.',
            },
            {
              type: "DRAG_DROP",
              order: 3,
              question: "Order the steps to enforce budget alerts with automation:",
              options: [
                {
                  text: "Create budget and alert",
                  order: 1,
                  guide:
                    'This assumes Create budget and alert, but "Cost Control" showed Order Steps Enforce Budget behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Subscribe SNS topic",
                  order: 2,
                  guide:
                    'This assumes Subscribe SNS topic, but "Cost Control" showed Order Steps Enforce Budget behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Trigger Lambda remediation",
                  order: 3,
                  guide:
                    'This assumes Trigger Lambda remediation, but "Cost Control" showed Order Steps Enforce Budget behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Audit results",
                  order: 4,
                  guide:
                    'This assumes Audit results, but "Cost Control" showed Order Steps Enforce Budget behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Cost Control"—it explained how Order Steps Enforce Budget works within AWS.',
            },
          ],
        },
      ],
    },
    {
      title: "Operational Playbooks",
      description: "Practice day-two operations with real-world simulations",
      order: 4,
      lessons: [
        {
          title: "Chaos Engineering",
          order: 1,
          challenges: [
            {
              type: "VIDEO",
              order: 1,
              question:
                "Watch the fault injection scenario. Which service orchestrates controlled experiments?",
              videoSrc:
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
              options: [
                {
                  text: "AWS Fault Injection Simulator",
                  correct: true,
                  guide:
                    'Correct: AWS Fault Injection Simulator matches the Watch Fault Injection Scenario behavior highlighted in "Chaos Engineering".',
                },
                {
                  text: "AWS Well-Architected Tool",
                  guide:
                    'This assumes AWS Well-Architected Tool, but "Chaos Engineering" showed Watch Fault Injection Scenario behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "AWS CloudTrail",
                  guide:
                    'This assumes AWS CloudTrail, but "Chaos Engineering" showed Watch Fault Injection Scenario behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "AWS OpsWorks",
                  guide:
                    'This assumes AWS OpsWorks, but "Chaos Engineering" showed Watch Fault Injection Scenario behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Chaos Engineering" about Watch Fault Injection Scenario to guide your answer.',
            },
            {
              type: "TRUE_FALSE",
              order: 2,
              question: "GameDays are collaborative events used to rehearse incident response.",
              options: [
                {
                  text: "True",
                  correct: true,
                  guide:
                    'Correct: True matches the Gamedays Collaborative Events Used behavior highlighted in "Chaos Engineering".',
                },
                {
                  text: "False",
                  guide:
                    'This assumes False, but "Chaos Engineering" showed Gamedays Collaborative Events Used behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Chaos Engineering" about Gamedays Collaborative Events Used to guide your answer.',
            },
            {
              type: "TEXT_INPUT",
              order: 3,
              question:
                "Name the AWS service for scripted load tests that complement chaos drills.",
              correctAnswer: "AWS Distributed Load Testing",
              hint: 'Use the example from "Chaos Engineering" about Aws Service Scripted Load to guide your answer.',
            },
          ],
        },
        {
          title: "Runbook Automation",
          order: 2,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question:
                "Which Systems Manager document type executes preapproved remediation steps?",
              options: [
                {
                  text: "Automation runbook",
                  correct: true,
                  guide:
                    'Correct: Automation runbook matches the Systems Manager Document Executes behavior highlighted in "Runbook Automation".',
                },
                {
                  text: "Parameter Store",
                  guide:
                    'This assumes Parameter Store, but "Runbook Automation" showed Systems Manager Document Executes behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Inventory",
                  guide:
                    'This assumes Inventory, but "Runbook Automation" showed Systems Manager Document Executes behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Runbook Automation" about Systems Manager Document Executes to guide your answer.',
            },
            {
              type: "LISTENING",
              order: 2,
              question:
                "Listen to the operations daily stand-up. Which notification platform do they integrate with Incident Manager?",
              audioSrc: "/audio/aws-incident-bridge.mp3",
              options: [
                {
                  text: "Slack",
                  correct: true,
                  guide:
                    'Correct: Slack matches the Listen Operations Daily Stand behavior highlighted in "Runbook Automation".',
                },
                {
                  text: "QuickSight",
                  guide:
                    'This assumes QuickSight, but "Runbook Automation" showed Listen Operations Daily Stand behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "WorkDocs",
                  guide:
                    'This assumes WorkDocs, but "Runbook Automation" showed Listen Operations Daily Stand behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Artifact",
                  guide:
                    'This assumes Artifact, but "Runbook Automation" showed Listen Operations Daily Stand behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Runbook Automation" about Listen Operations Daily Stand to guide your answer.',
            },
            {
              type: "DRAG_DROP",
              order: 3,
              question: "Arrange the steps to onboard a team into Incident Manager:",
              options: [
                {
                  text: "Create response plan",
                  order: 1,
                  guide:
                    'This assumes Create response plan, but "Runbook Automation" showed Arrange Steps Onboard Team behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Configure contacts and escalation",
                  order: 2,
                  guide:
                    'This assumes Configure contacts and escalation, but "Runbook Automation" showed Arrange Steps Onboard Team behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Define automation runbooks",
                  order: 3,
                  guide:
                    'This assumes Define automation runbooks, but "Runbook Automation" showed Arrange Steps Onboard Team behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Test incident workflow",
                  order: 4,
                  guide:
                    'This assumes Test incident workflow, but "Runbook Automation" showed Arrange Steps Onboard Team behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Runbook Automation" about Arrange Steps Onboard Team to guide your answer.',
            },
          ],
        },
      ],
    },
    {
      title: "Real-World Application Lab",
      description:
        "Apply AWS SysOps Administrator skills to architecture, operations, and optimization scenarios.",
      order: 5,
      lessons: [
        {
          title: "Architecture Decision Review",
          order: 1,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question:
                "Which AWS service best coordinates loosely coupled workloads in an event-driven architecture?",
              options: [
                {
                  text: "Amazon EventBridge",
                  correct: true,
                  guide:
                    'Correct: Amazon EventBridge matches the Aws Service Best Coordinates behavior highlighted in "Architecture Decision Review".',
                },
                {
                  text: "AWS Lambda",
                  guide:
                    'This assumes AWS Lambda, but "Architecture Decision Review" showed Aws Service Best Coordinates behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Amazon CloudWatch",
                  guide:
                    'This assumes Amazon CloudWatch, but "Architecture Decision Review" showed Aws Service Best Coordinates behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Architecture Decision Review" about Aws Service Best Coordinates to guide your answer.',
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
                "Which tool surfaces rightsizing and cost-efficiency recommendations for AWS workloads?",
              options: [
                {
                  text: "AWS Compute Optimizer",
                  correct: true,
                  guide:
                    'Correct: AWS Compute Optimizer matches the Tool Surfaces Rightsizing Cost behavior highlighted in "Operations & Optimization Review".',
                },
                {
                  text: "Amazon CloudWatch",
                  guide:
                    'This assumes Amazon CloudWatch, but "Operations & Optimization Review" showed Tool Surfaces Rightsizing Cost behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "AWS Lambda",
                  guide:
                    'This assumes AWS Lambda, but "Operations & Optimization Review" showed Tool Surfaces Rightsizing Cost behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Operations & Optimization Review"—it explained how Tool Surfaces Rightsizing Cost works within AWS.',
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
              hint: 'Remember the pattern you practiced in "Operations & Optimization Review"—it explained how Effective Observability Runbooks Should works within AWS.',
            },
            {
              type: "SELECT",
              order: 3,
              question:
                "Which AWS service centralizes audit and delivery of operational logs for compliance teams?",
              options: [
                {
                  text: "AWS CloudTrail",
                  correct: true,
                  guide:
                    'Correct: AWS CloudTrail matches the Aws Service Centralizes Audit behavior highlighted in "Operations & Optimization Review".',
                },
                {
                  text: "AWS Systems Manager Automation",
                  guide:
                    'This assumes AWS Systems Manager Automation, but "Operations & Optimization Review" showed Aws Service Centralizes Audit behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Amazon EventBridge",
                  guide:
                    'This assumes Amazon EventBridge, but "Operations & Optimization Review" showed Aws Service Centralizes Audit behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Operations & Optimization Review"—it explained how Aws Service Centralizes Audit works within AWS.',
            },
          ],
        },
      ],
    },
  ],
}
