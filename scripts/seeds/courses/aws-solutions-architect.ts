import { CourseSeed } from "../types"

export const awsSolutionsArchitectCourse: CourseSeed = {
  id: 2,
  title: "AWS Solutions Architect Associate",
  imageSrc: "/icons/aws-solutions-architect-icon.png",
  category: "Architecture",
  description:
    "Learn to design distributed systems and applications on AWS. Essential for cloud architects and engineers.",
  level: "Intermediate",
  duration: "4-6 hours",
  units: [
    {
      title: "Design Resilient Architectures",
      description: "Build fault-tolerant, highly-available application stacks",
      order: 1,
      lessons: [
        {
          title: "Multi-Tier Architectures",
          order: 1,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question:
                "Which AWS service is commonly used as the presentation tier in a multi-tier architecture?",
              options: [
                {
                  text: "Amazon CloudFront",
                  correct: true,
                  guide:
                    "Correct: CloudFront caches static assets close to users, making it an ideal presentation-tier edge layer for multi-tier web apps.",
                },
                {
                  text: "Amazon RDS",
                  guide:
                    "RDS belongs in the data tier; exposing a database directly to end users breaks the separation of responsibilities.",
                },
                {
                  text: "AWS Backup",
                  guide:
                    "AWS Backup only handles snapshots and policies—it can’t serve front-end assets or handle HTTP requests.",
                },
              ],
              hint: "Remember the edge service from the lesson that delivers static content close to users for faster page loads.",
            },
            {
              type: "DRAG_DROP",
              order: 2,
              question:
                "Arrange the layers of a classic three-tier architecture from top to bottom:",
              options: [
                {
                  text: "Presentation Tier",
                  order: 1,
                  guide:
                    "Client-facing nodes belong at the top because they serve the UI and static assets to browsers and mobile devices.",
                },
                {
                  text: "Application Tier",
                  order: 2,
                  guide:
                    "Business logic sits in the middle to process requests before reaching the database layer.",
                },
                {
                  text: "Data Tier",
                  order: 3,
                  guide:
                    "Databases anchor the stack at the bottom to keep stateful storage isolated from the web tier.",
                },
              ],
              hint: "Stack the tiers in the same order a request travels: UI first, business logic second, persistent storage last.",
            },
            {
              type: "TRUE_FALSE",
              order: 3,
              question:
                "Stateless application servers make it easier to build resilient architectures.",
              options: [
                {
                  text: "True",
                  correct: true,
                  guide:
                    "Correct: When servers don’t store session data you can replace or scale them freely, which simplifies high-availability designs.",
                },
                {
                  text: "False",
                  guide:
                    "The lesson highlighted that sticky sessions tie clients to a single node, which makes failover harder—exactly what statelessness avoids.",
                },
              ],
              hint: "Recall why the architecture guide recommended keeping session data in DynamoDB or ElastiCache instead of on the EC2 instances themselves.",
            },
            {
              type: "TEXT_INPUT",
              order: 4,
              question:
                "Name the AWS service that provides managed relational databases for the data tier.",
              correctAnswer: "Amazon RDS",
              hint: "Think about the managed service that automates backups, patching, and multi-AZ failover for relational engines.",
            },
          ],
        },
        {
          title: "Decoupling Strategies",
          order: 2,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "Which service best enables loose coupling between application components?",
              options: [
                {
                  text: "Amazon SQS",
                  correct: true,
                  guide:
                    "Correct: SQS queues decouple producers and consumers with buffering and retry logic, letting each tier scale independently.",
                },
                {
                  text: "Amazon EC2",
                  guide:
                    "EC2 is compute infrastructure; by itself it doesn’t provide the messaging layer required to loosely couple application tiers.",
                },
                {
                  text: "AWS Backup",
                  guide:
                    "AWS Backup handles data protection tasks, not asynchronous communication between microservices.",
                },
              ],
              hint: "Think about the managed messaging service the lesson emphasized for buffering work between producers and consumers.",
            },
            {
              type: "ASSIST",
              order: 2,
              question: "Complete: Event-driven architectures rely on ______ coupling.",
              options: [
                {
                  text: "tight",
                  guide:
                    "Tight coupling forces services to know too much about each other, which the lesson warned against.",
                },
                {
                  text: "loose",
                  correct: true,
                  guide:
                    "Correct: loose coupling keeps integrations asynchronous and resilient, which is the foundation of event-driven design.",
                },
                {
                  text: "manual",
                  guide:
                    "Manual workflows reintroduce human coordination and latency—neither trait belongs in an automated event flow.",
                },
              ],
              hint: "Recall how the module described services emitting events without depending on the consumers’ availability.",
            },
            {
              type: "DRAG_DROP",
              order: 3,
              question: "Match each service with the problem it solves by ordering:",
              options: [
                {
                  text: "Amazon SNS - Pub/Sub messaging",
                  order: 1,
                  guide:
                    "SNS broadcasts notifications to many subscribers, making it the best fit for pub/sub messaging.",
                },
                {
                  text: "Amazon SQS - Queue buffering",
                  order: 2,
                  guide:
                    "SQS queues absorb bursts of work and deliver messages when consumers are ready, so it clearly maps to queue buffering.",
                },
                {
                  text: "AWS Step Functions - Workflow orchestration",
                  order: 3,
                  guide:
                    "Step Functions coordinate complex workflows with state machines—perfect for orchestration scenarios.",
                },
              ],
              hint: "Pair each managed service with the integration challenge it solves: broadcast, buffer, or orchestrate.",
            },
            {
              type: "TRUE_FALSE",
              order: 4,
              question: "Amazon API Gateway can throttle requests to protect downstream services.",
              options: [
                {
                  text: "True",
                  correct: true,
                  guide:
                    "Correct: API Gateway lets you define usage plans and throttling so backend services aren’t overwhelmed.",
                },
                {
                  text: "False",
                  guide:
                    "Saying “false” would ignore API Gateway’s built-in throttling and rate-limiting features showcased in the lesson.",
                },
              ],
              hint: "Think about how API Gateway shields Lambda functions and microservices by enforcing usage plans at the edge.",
            },
          ],
        },
        {
          title: "Disaster Recovery",
          order: 3,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question:
                "Which disaster recovery strategy provides the fastest recovery time objective (RTO)?",
              options: [
                {
                  text: "Multi-site active/active",
                  correct: true,
                  guide:
                    "Correct: With active/active each Region serves traffic immediately, so failover is instantaneous and RTO approaches zero.",
                },
                {
                  text: "Pilot light",
                  guide:
                    "Pilot light keeps only critical services warm; you still need time to scale the rest, so the RTO is longer.",
                },
                {
                  text: "Warm standby",
                  guide:
                    "Warm standby runs a scaled-down environment that must be promoted, so it can’t beat the instant failover of active/active.",
                },
              ],
              hint: "Pick the strategy where both Regions serve production traffic all the time, eliminating the need for a failover action.",
            },
            {
              type: "VIDEO",
              order: 2,
              question:
                "Watch the video and identify which DR strategy relies on pre-provisioned but idle infrastructure.",
              videoSrc:
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
              options: [
                {
                  text: "Backup & restore",
                  guide:
                    "Backup & restore keeps only data backups—you still rebuild the stack from scratch, so infrastructure isn’t pre-provisioned.",
                },
                {
                  text: "Warm standby",
                  correct: true,
                  guide:
                    "Correct: Warm standby maintains a running but scaled-down copy that can quickly be promoted when the primary fails.",
                },
                {
                  text: "Multi-site active/active",
                  guide:
                    "Active/active infrastructure isn’t idle—it already serves production traffic in multiple Regions.",
                },
                {
                  text: "Pilot light",
                  guide:
                    "Pilot light keeps only the minimal critical stack running and requires scaling, whereas the video described a fuller warm environment.",
                },
              ],
              hint: "Focus on the strategy where a smaller copy of the stack is already deployed and simply needs scale-up, not a rebuild.",
            },
            {
              type: "TEXT_INPUT",
              order: 3,
              question: "What AWS tool helps you document and test DR plans?",
              correctAnswer: "AWS Resilience Hub",
              hint: "Name the service introduced for evaluating compliance with resilience targets and running game-day experiments.",
            },
          ],
        },
      ],
    },
    {
      title: "Performant Architectures",
      description: "Design systems for high performance and low latency",
      order: 2,
      lessons: [
        {
          title: "High Performance Storage",
          order: 1,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question:
                "Which storage option best serves analytics workloads requiring columnar storage?",
              options: [
                {
                  text: "Amazon Redshift",
                  correct: true,
                  guide:
                    "Correct: Redshift’s columnar engine and MPP architecture are purpose-built for analytics workloads.",
                },
                {
                  text: "Amazon Aurora",
                  guide:
                    "Aurora is an OLTP database optimized for transactions, not columnar analytics queries.",
                },
                {
                  text: "Amazon Neptune",
                  guide:
                    "Neptune targets graph workloads, so it doesn’t provide the columnar storage format analytics pipelines need.",
                },
              ],
              hint: "Pick the data warehouse service that stores information in columns and parallelizes queries across nodes.",
            },
            {
              type: "ASSIST",
              order: 2,
              question: "Complete: Provisioned IOPS volumes on EBS deliver consistent ______.",
              options: [
                {
                  text: "latency",
                  correct: true,
                  guide:
                    "Correct: Provisioned IOPS volumes reserve IO capacity so latency stays predictable even under heavy load.",
                },
                {
                  text: "pricing",
                  guide:
                    "The feature guarantees IO performance, not billing discounts, so pricing isn’t the missing word.",
                },
                {
                  text: "availability",
                  guide:
                    "Although EBS is durable, the key emphasis of Provisioned IOPS was predictable IO latency.",
                },
              ],
              hint: "Remember the graph showing how Provisioned IOPS volumes keep response times flat even when throughput spikes.",
            },
            {
              type: "TRUE_FALSE",
              order: 3,
              question: "ElastiCache supports both Redis and Memcached engines.",
              options: [
                {
                  text: "True",
                  correct: true,
                  guide:
                    "Correct: ElastiCache offers managed clusters for either Redis or Memcached, letting you choose the engine that fits.",
                },
                {
                  text: "False",
                  guide:
                    "The lesson explicitly mentioned selecting either Redis or Memcached when creating an ElastiCache cluster, so “false” contradicts that.",
                },
              ],
              hint: "Think back to the cache comparison slide that listed Redis features next to Memcached within ElastiCache.",
            },
          ],
        },
        {
          title: "Caching Strategies",
          order: 2,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "Which service is best suited for caching dynamic web content?",
              options: [
                {
                  text: "Amazon ElastiCache",
                  correct: true,
                  guide:
                    'Correct: Amazon ElastiCache matches the Service Best Suited Caching behavior highlighted in "Caching Strategies".',
                },
                {
                  text: "Amazon S3",
                  guide:
                    'This assumes Amazon S3, but "Caching Strategies" showed Service Best Suited Caching behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "AWS Backup",
                  guide:
                    'This assumes AWS Backup, but "Caching Strategies" showed Service Best Suited Caching behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Caching Strategies" about Service Best Suited Caching to guide your answer.',
            },
            {
              type: "ASSIST",
              order: 2,
              question: "Complete: Cached data should have a defined ______ policy.",
              options: [
                {
                  text: "logging",
                  guide:
                    'This assumes logging, but "Caching Strategies" showed Cached Data Should Have behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "invalidation",
                  correct: true,
                  guide:
                    'Correct: invalidation matches the Cached Data Should Have behavior highlighted in "Caching Strategies".',
                },
                {
                  text: "backup",
                  guide:
                    'This assumes backup, but "Caching Strategies" showed Cached Data Should Have behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Caching Strategies" about Cached Data Should Have to guide your answer.',
            },
            {
              type: "DRAG_DROP",
              order: 3,
              question: "Order the steps to add an Amazon CloudFront distribution:",
              options: [
                {
                  text: "Create origin",
                  order: 1,
                  guide:
                    'This assumes Create origin, but "Caching Strategies" showed Order Steps Add Amazon behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Configure behaviors",
                  order: 2,
                  guide:
                    'This assumes Configure behaviors, but "Caching Strategies" showed Order Steps Add Amazon behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Associate SSL/TLS",
                  order: 3,
                  guide:
                    'This assumes Associate SSL/TLS, but "Caching Strategies" showed Order Steps Add Amazon behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Deploy distribution",
                  order: 4,
                  guide:
                    'This assumes Deploy distribution, but "Caching Strategies" showed Order Steps Add Amazon behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Caching Strategies" about Order Steps Add Amazon to guide your answer.',
            },
          ],
        },
        {
          title: "Edge Optimization Deep Dive",
          order: 3,
          challenges: [
            {
              type: "VIDEO",
              order: 1,
              question:
                "Watch the animation about AWS Global Accelerator. Which benefit is highlighted?",
              videoSrc:
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
              options: [
                {
                  text: "Automated database tuning",
                  guide:
                    'This assumes Automated database tuning, but "Edge Optimization Deep Dive" showed Watch Animation About Aws behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Improved availability and performance",
                  correct: true,
                  guide:
                    'Correct: Improved availability and performance matches the Watch Animation About Aws behavior highlighted in "Edge Optimization Deep Dive".',
                },
                {
                  text: "Reduced Lambda cold starts",
                  guide:
                    'This assumes Reduced Lambda cold starts, but "Edge Optimization Deep Dive" showed Watch Animation About Aws behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Cheaper spot pricing",
                  guide:
                    'This assumes Cheaper spot pricing, but "Edge Optimization Deep Dive" showed Watch Animation About Aws behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Edge Optimization Deep Dive" about Watch Animation About Aws to guide your answer.',
            },
            {
              type: "LISTENING",
              order: 2,
              question:
                "Listen to the operations team stand-up. Which edge service did they use to mitigate DDoS attacks?",
              audioSrc: "/audio/aws-edge-security.mp3",
              options: [
                {
                  text: "AWS Shield Advanced",
                  correct: true,
                  guide:
                    'Correct: AWS Shield Advanced matches the Listen Operations Team Stand behavior highlighted in "Edge Optimization Deep Dive".',
                },
                {
                  text: "Amazon Macie",
                  guide:
                    'This assumes Amazon Macie, but "Edge Optimization Deep Dive" showed Listen Operations Team Stand behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "AWS DataSync",
                  guide:
                    'This assumes AWS DataSync, but "Edge Optimization Deep Dive" showed Listen Operations Team Stand behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "AWS Transfer Family",
                  guide:
                    'This assumes AWS Transfer Family, but "Edge Optimization Deep Dive" showed Listen Operations Team Stand behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Edge Optimization Deep Dive" about Listen Operations Team Stand to guide your answer.',
            },
            {
              type: "TEXT_INPUT",
              order: 3,
              question: "What AWS service allows you to run code at CloudFront edge locations?",
              correctAnswer: "Lambda@Edge",
              hint: 'Use the example from "Edge Optimization Deep Dive" about Aws Service Allows You to guide your answer.',
            },
          ],
        },
      ],
    },
    {
      title: "Secure Architectures",
      description: "Embed security controls across every layer of your architecture",
      order: 3,
      lessons: [
        {
          title: "Network Security Patterns",
          order: 1,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "Which component provides network-level traffic inspection in a VPC?",
              options: [
                {
                  text: "AWS Network Firewall",
                  correct: true,
                  guide:
                    'Correct: AWS Network Firewall matches the Component Provides Network Level behavior highlighted in "Network Security Patterns".',
                },
                {
                  text: "AWS Outposts",
                  guide:
                    'This assumes AWS Outposts, but "Network Security Patterns" showed Component Provides Network Level behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "AWS App Runner",
                  guide:
                    'This assumes AWS App Runner, but "Network Security Patterns" showed Component Provides Network Level behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Network Security Patterns" about Component Provides Network Level to guide your answer.',
            },
            {
              type: "DRAG_DROP",
              order: 2,
              question: "Order the steps to implement inspection with a Gateway Load Balancer:",
              options: [
                {
                  text: "Deploy appliance fleet",
                  order: 1,
                  guide:
                    'This assumes Deploy appliance fleet, but "Network Security Patterns" showed Order Steps Implement Inspection behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Create Gateway Load Balancer",
                  order: 2,
                  guide:
                    'This assumes Create Gateway Load Balancer, but "Network Security Patterns" showed Order Steps Implement Inspection behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Attach to VPC endpoint services",
                  order: 3,
                  guide:
                    'This assumes Attach to VPC endpoint services, but "Network Security Patterns" showed Order Steps Implement Inspection behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Route traffic from spoke VPCs",
                  order: 4,
                  guide:
                    'This assumes Route traffic from spoke VPCs, but "Network Security Patterns" showed Order Steps Implement Inspection behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Network Security Patterns" about Order Steps Implement Inspection to guide your answer.',
            },
            {
              type: "TEXT_INPUT",
              order: 3,
              question:
                "Name the AWS service that monitors VPC traffic for anomalous behavior using machine learning.",
              correctAnswer: "Amazon GuardDuty",
              hint: 'Use the example from "Network Security Patterns" about Aws Service Monitors Vpc to guide your answer.',
            },
          ],
        },
        {
          title: "Authorization Patterns",
          order: 2,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "Which service provides user sign-up and federated identity for web apps?",
              options: [
                {
                  text: "Amazon Cognito",
                  correct: true,
                  guide:
                    'Correct: Amazon Cognito matches the Service Provides User Sign behavior highlighted in "Authorization Patterns".',
                },
                {
                  text: "AWS Shield",
                  guide:
                    'This assumes AWS Shield, but "Authorization Patterns" showed Service Provides User Sign behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Amazon Detective",
                  guide:
                    'This assumes Amazon Detective, but "Authorization Patterns" showed Service Provides User Sign behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Authorization Patterns" and how it framed Service Provides User Sign. Apply the same reasoning here.',
            },
            {
              type: "ASSIST",
              order: 2,
              question: "Complete: IAM policies should follow the principle of ______ privilege.",
              options: [
                {
                  text: "maximum",
                  guide:
                    'This assumes maximum, but "Authorization Patterns" showed Iam Policies Should Follow behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "least",
                  correct: true,
                  guide:
                    'Correct: least matches the Iam Policies Should Follow behavior highlighted in "Authorization Patterns".',
                },
                {
                  text: "shared",
                  guide:
                    'This assumes shared, but "Authorization Patterns" showed Iam Policies Should Follow behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Authorization Patterns" and how it framed Iam Policies Should Follow. Apply the same reasoning here.',
            },
            {
              type: "DRAG_DROP",
              order: 3,
              question: "Order the authorization flow for a Cognito-hosted UI:",
              options: [
                {
                  text: "User authenticates with provider",
                  order: 1,
                  guide:
                    'This assumes User authenticates with provider, but "Authorization Patterns" showed Order Authorization Flow Cognito behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Cognito issues tokens",
                  order: 2,
                  guide:
                    'This assumes Cognito issues tokens, but "Authorization Patterns" showed Order Authorization Flow Cognito behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "App exchanges token for AWS credentials",
                  order: 3,
                  guide:
                    'This assumes App exchanges token for AWS credentials, but "Authorization Patterns" showed Order Authorization Flow Cognito behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "User accesses secured resource",
                  order: 4,
                  guide:
                    'This assumes User accesses secured resource, but "Authorization Patterns" showed Order Authorization Flow Cognito behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Authorization Patterns" and how it framed Order Authorization Flow Cognito. Apply the same reasoning here.',
            },
          ],
        },
        {
          title: "Monitoring & Alerts",
          order: 3,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "Which AWS service detects anomalous login behavior?",
              options: [
                {
                  text: "Amazon GuardDuty",
                  correct: true,
                  guide:
                    'Correct: Amazon GuardDuty matches the Aws Service Detects Anomalous behavior highlighted in "Monitoring & Alerts".',
                },
                {
                  text: "AWS Batch",
                  guide:
                    'This assumes AWS Batch, but "Monitoring & Alerts" showed Aws Service Detects Anomalous behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Amazon MQ",
                  guide:
                    'This assumes Amazon MQ, but "Monitoring & Alerts" showed Aws Service Detects Anomalous behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Monitoring & Alerts" about Aws Service Detects Anomalous to guide your answer.',
            },
            {
              type: "TRUE_FALSE",
              order: 2,
              question: "Amazon CloudWatch Alarms can trigger Lambda functions for remediation.",
              options: [
                {
                  text: "True",
                  correct: true,
                  guide:
                    'Correct: True matches the Amazon Cloudwatch Alarms Can behavior highlighted in "Monitoring & Alerts".',
                },
                {
                  text: "False",
                  guide:
                    'This assumes False, but "Monitoring & Alerts" showed Amazon Cloudwatch Alarms Can behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Monitoring & Alerts" about Amazon Cloudwatch Alarms Can to guide your answer.',
            },
            {
              type: "TEXT_INPUT",
              order: 3,
              question:
                "Name the managed service that builds security visibility dashboards across AWS accounts.",
              correctAnswer: "AWS Security Hub",
              hint: 'Use the example from "Monitoring & Alerts" about Managed Service Builds Security to guide your answer.',
            },
          ],
        },
      ],
    },
    {
      title: "Operational Excellence",
      description: "Instrument observability and automation for enterprise workloads",
      order: 4,
      lessons: [
        {
          title: "Infrastructure as Code",
          order: 1,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "Which service enables repeatable deployments using declarative templates?",
              options: [
                {
                  text: "AWS CloudFormation",
                  correct: true,
                  guide:
                    'Correct: AWS CloudFormation matches the Service Enables Repeatable Deployments behavior highlighted in "Infrastructure as Code".',
                },
                {
                  text: "AWS CodeGuru",
                  guide:
                    'This assumes AWS CodeGuru, but "Infrastructure as Code" showed Service Enables Repeatable Deployments behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "AWS Proton",
                  guide:
                    'This assumes AWS Proton, but "Infrastructure as Code" showed Service Enables Repeatable Deployments behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Infrastructure as Code" and how it framed Service Enables Repeatable Deployments. Apply the same reasoning here.',
            },
            {
              type: "TEXT_INPUT",
              order: 2,
              question:
                "What CloudFormation feature lets you preview changes before updating a stack?",
              correctAnswer: "Change sets",
              hint: 'Think back to "Infrastructure as Code" and how it framed Cloudformation Feature Lets You. Apply the same reasoning here.',
            },
            {
              type: "ASSIST",
              order: 3,
              question:
                "Complete: AWS CDK allows you to define infrastructure using ______ languages.",
              options: [
                {
                  text: "imperative programming",
                  correct: true,
                  guide:
                    'Correct: imperative programming matches the Aws Cdk Allows You behavior highlighted in "Infrastructure as Code".',
                },
                {
                  text: "only JSON",
                  guide:
                    'This assumes only JSON, but "Infrastructure as Code" showed Aws Cdk Allows You behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "diagramming",
                  guide:
                    'This assumes diagramming, but "Infrastructure as Code" showed Aws Cdk Allows You behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Infrastructure as Code" and how it framed Aws Cdk Allows You. Apply the same reasoning here.',
            },
          ],
        },
        {
          title: "Observability Patterns",
          order: 2,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "Which service aggregates traces to analyze distributed applications?",
              options: [
                {
                  text: "AWS X-Ray",
                  correct: true,
                  guide:
                    'Correct: AWS X-Ray matches the Service Aggregates Traces Analyze behavior highlighted in "Observability Patterns".',
                },
                {
                  text: "AWS Personalize",
                  guide:
                    'This assumes AWS Personalize, but "Observability Patterns" showed Service Aggregates Traces Analyze behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "AWS App Runner",
                  guide:
                    'This assumes AWS App Runner, but "Observability Patterns" showed Service Aggregates Traces Analyze behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Observability Patterns" and how it framed Service Aggregates Traces Analyze. Apply the same reasoning here.',
            },
            {
              type: "TRUE_FALSE",
              order: 2,
              question: "CloudWatch Logs Insights uses SQL syntax for queries.",
              options: [
                {
                  text: "True",
                  guide:
                    'This assumes True, but "Observability Patterns" showed Cloudwatch Logs Insights Uses behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "False",
                  correct: true,
                  guide:
                    'Correct: False matches the Cloudwatch Logs Insights Uses behavior highlighted in "Observability Patterns".',
                },
              ],
              hint: 'Think back to "Observability Patterns" and how it framed Cloudwatch Logs Insights Uses. Apply the same reasoning here.',
            },
            {
              type: "DRAG_DROP",
              order: 3,
              question: "Arrange the steps to implement end-to-end observability with ServiceLens:",
              options: [
                {
                  text: "Enable X-Ray tracing",
                  order: 1,
                  guide:
                    'This assumes Enable X-Ray tracing, but "Observability Patterns" showed Arrange Steps Implement End behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Stream logs to CloudWatch",
                  order: 2,
                  guide:
                    'This assumes Stream logs to CloudWatch, but "Observability Patterns" showed Arrange Steps Implement End behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Configure metrics and alarms",
                  order: 3,
                  guide:
                    'This assumes Configure metrics and alarms, but "Observability Patterns" showed Arrange Steps Implement End behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Correlate data in ServiceLens map",
                  order: 4,
                  guide:
                    'This assumes Correlate data in ServiceLens map, but "Observability Patterns" showed Arrange Steps Implement End behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Observability Patterns" and how it framed Arrange Steps Implement End. Apply the same reasoning here.',
            },
          ],
        },
        {
          title: "Automation Playbooks",
          order: 3,
          challenges: [
            {
              type: "VIDEO",
              order: 1,
              question:
                "Watch the runbook demonstration. Which Systems Manager capability orchestrates multi-step tasks?",
              videoSrc:
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
              options: [
                {
                  text: "Automation",
                  correct: true,
                  guide:
                    'Correct: Automation matches the Watch Runbook Demonstration Systems behavior highlighted in "Automation Playbooks".',
                },
                {
                  text: "Session Manager",
                  guide:
                    'This assumes Session Manager, but "Automation Playbooks" showed Watch Runbook Demonstration Systems behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Patch Manager",
                  guide:
                    'This assumes Patch Manager, but "Automation Playbooks" showed Watch Runbook Demonstration Systems behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Parameter Store",
                  guide:
                    'This assumes Parameter Store, but "Automation Playbooks" showed Watch Runbook Demonstration Systems behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Automation Playbooks" and how it framed Watch Runbook Demonstration Systems. Apply the same reasoning here.',
            },
            {
              type: "TEXT_INPUT",
              order: 2,
              question: "Name the SSM feature used to maintain configuration drift compliance.",
              correctAnswer: "State Manager",
              hint: 'Think back to "Automation Playbooks" and how it framed Ssm Feature Used Maintain. Apply the same reasoning here.',
            },
            {
              type: "LISTENING",
              order: 3,
              question:
                "Listen to the ops review. Which notification channel do they integrate with EventBridge?",
              audioSrc: "/audio/aws-ops-review.mp3",
              options: [
                {
                  text: "PagerDuty",
                  correct: true,
                  guide:
                    'Correct: PagerDuty matches the Listen Ops Review Notification behavior highlighted in "Automation Playbooks".',
                },
                {
                  text: "QuickSight",
                  guide:
                    'This assumes QuickSight, but "Automation Playbooks" showed Listen Ops Review Notification behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "IAM",
                  guide:
                    'This assumes IAM, but "Automation Playbooks" showed Listen Ops Review Notification behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "AWS Audit Manager",
                  guide:
                    'This assumes AWS Audit Manager, but "Automation Playbooks" showed Listen Ops Review Notification behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Automation Playbooks" and how it framed Listen Ops Review Notification. Apply the same reasoning here.',
            },
          ],
        },
      ],
    },
    {
      title: "Real-World Application Lab",
      description:
        "Apply AWS Solutions Architect Associate skills to architecture, operations, and optimization scenarios.",
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
