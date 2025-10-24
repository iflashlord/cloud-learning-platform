import { CourseSeed } from "../types"

export const awsDeveloperAssociateCourse: CourseSeed = {
  id: 3,
  title: "AWS Developer Associate",
  imageSrc: "/aws-developer.svg",
  category: "Development",
  description:
    "Master AWS services for application development and deployment. Great for developers building cloud applications.",
  level: "Intermediate",
  duration: "3-5 hours",
  units: [
    {
      title: "Serverless Development",
      description: "Build scalable applications using serverless patterns",
      order: 1,
      lessons: [
        {
          title: "Lambda Fundamentals",
          order: 1,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "Which language is not natively supported by AWS Lambda?",
              options: [
                {
                  text: "Java",
                  guide:
                    'This assumes Java, but "Lambda Fundamentals" showed Language Not Natively Supported behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Go",
                  guide:
                    'This assumes Go, but "Lambda Fundamentals" showed Language Not Natively Supported behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "PHP",
                  correct: true,
                  guide:
                    'Correct: PHP matches the Language Not Natively Supported behavior highlighted in "Lambda Fundamentals".',
                },
              ],
              hint: 'Remember the pattern you practiced in "Lambda Fundamentals"—it explained how Language Not Natively Supported works within AWS.',
            },
            {
              type: "TRUE_FALSE",
              order: 2,
              question: "Lambda functions can be triggered by AWS Step Functions.",
              options: [
                {
                  text: "True",
                  correct: true,
                  guide:
                    'Correct: True matches the Lambda Functions Can Be behavior highlighted in "Lambda Fundamentals".',
                },
                {
                  text: "False",
                  guide:
                    'This assumes False, but "Lambda Fundamentals" showed Lambda Functions Can Be behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Lambda Fundamentals"—it explained how Lambda Functions Can Be works within AWS.',
            },
            {
              type: "TEXT_INPUT",
              order: 3,
              question: "What is the maximum execution timeout for a Lambda function (in seconds)?",
              correctAnswer: "900",
              hint: 'Remember the pattern you practiced in "Lambda Fundamentals"—it explained how Maximum Execution Timeout Lambda works within AWS.',
            },
          ],
        },
        {
          title: "API Integrations",
          order: 2,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "Which service provides fully managed APIs that integrate with Lambda?",
              options: [
                {
                  text: "Amazon API Gateway",
                  correct: true,
                  guide:
                    'Correct: Amazon API Gateway matches the Service Provides Fully Managed behavior highlighted in "API Integrations".',
                },
                {
                  text: "Amazon EventBridge",
                  guide:
                    'This assumes Amazon EventBridge, but "API Integrations" showed Service Provides Fully Managed behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "AWS AppSync",
                  guide:
                    'This assumes AWS AppSync, but "API Integrations" showed Service Provides Fully Managed behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "API Integrations" and how it framed Service Provides Fully Managed. Apply the same reasoning here.',
            },
            {
              type: "ASSIST",
              order: 2,
              question: "Complete: REST APIs commonly use ______ methods like GET and POST.",
              options: [
                {
                  text: "database",
                  guide:
                    'This assumes database, but "API Integrations" showed Rest Apis Commonly Use behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "HTTP",
                  correct: true,
                  guide:
                    'Correct: HTTP matches the Rest Apis Commonly Use behavior highlighted in "API Integrations".',
                },
                {
                  text: "storage",
                  guide:
                    'This assumes storage, but "API Integrations" showed Rest Apis Commonly Use behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "API Integrations" and how it framed Rest Apis Commonly Use. Apply the same reasoning here.',
            },
            {
              type: "DRAG_DROP",
              order: 3,
              question: "Place the steps to secure an API with IAM authorization:",
              options: [
                {
                  text: "Create IAM policy",
                  order: 1,
                  guide:
                    'This assumes Create IAM policy, but "API Integrations" showed Place Steps Secure Api behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Attach policy to role/user",
                  order: 2,
                  guide:
                    'This assumes Attach policy to role/user, but "API Integrations" showed Place Steps Secure Api behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Enable IAM auth on method",
                  order: 3,
                  guide:
                    'This assumes Enable IAM auth on method, but "API Integrations" showed Place Steps Secure Api behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Test with signed request",
                  order: 4,
                  guide:
                    'This assumes Test with signed request, but "API Integrations" showed Place Steps Secure Api behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "API Integrations" and how it framed Place Steps Secure Api. Apply the same reasoning here.',
            },
          ],
        },
        {
          title: "Event-Driven Patterns",
          order: 3,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "Which service routes events between SaaS apps and AWS services?",
              options: [
                {
                  text: "Amazon EventBridge",
                  correct: true,
                  guide:
                    'Correct: Amazon EventBridge matches the Service Routes Events Between behavior highlighted in "Event-Driven Patterns".',
                },
                {
                  text: "Amazon Kinesis",
                  guide:
                    'This assumes Amazon Kinesis, but "Event-Driven Patterns" showed Service Routes Events Between behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "AWS IoT Core",
                  guide:
                    'This assumes AWS IoT Core, but "Event-Driven Patterns" showed Service Routes Events Between behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Event-Driven Patterns" about Service Routes Events Between to guide your answer.',
            },
            {
              type: "TRUE_FALSE",
              order: 2,
              question:
                "EventBridge supports schema discovery to help developers generate code bindings.",
              options: [
                {
                  text: "True",
                  correct: true,
                  guide:
                    'Correct: True matches the Eventbridge Supports Schema Discovery behavior highlighted in "Event-Driven Patterns".',
                },
                {
                  text: "False",
                  guide:
                    'This assumes False, but "Event-Driven Patterns" showed Eventbridge Supports Schema Discovery behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Event-Driven Patterns" about Eventbridge Supports Schema Discovery to guide your answer.',
            },
            {
              type: "TEXT_INPUT",
              order: 3,
              question: "Name the service you would use to stream real-time data for analytics.",
              correctAnswer: "Amazon Kinesis",
              hint: 'Use the example from "Event-Driven Patterns" about Service You Would Use to guide your answer.',
            },
          ],
        },
      ],
    },
    {
      title: "Deployment & CI/CD",
      description: "Automate build, test, and deployment pipelines",
      order: 2,
      lessons: [
        {
          title: "Infrastructure as Code",
          order: 1,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question:
                "Which service enables declarative infrastructure deployments using templates?",
              options: [
                {
                  text: "AWS CloudFormation",
                  correct: true,
                  guide:
                    'Correct: AWS CloudFormation matches the Service Enables Declarative Infrastructure behavior highlighted in "Infrastructure as Code".',
                },
                {
                  text: "AWS CodeCommit",
                  guide:
                    'This assumes AWS CodeCommit, but "Infrastructure as Code" showed Service Enables Declarative Infrastructure behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "AWS CodeGuru",
                  guide:
                    'This assumes AWS CodeGuru, but "Infrastructure as Code" showed Service Enables Declarative Infrastructure behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Infrastructure as Code" and how it framed Service Enables Declarative Infrastructure. Apply the same reasoning here.',
            },
            {
              type: "ASSIST",
              order: 2,
              question: "Complete: CloudFormation change sets preview ______ before deployment.",
              options: [
                {
                  text: "logs",
                  guide:
                    'This assumes logs, but "Infrastructure as Code" showed Cloudformation Change Sets Preview behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "stack updates",
                  correct: true,
                  guide:
                    'Correct: stack updates matches the Cloudformation Change Sets Preview behavior highlighted in "Infrastructure as Code".',
                },
                {
                  text: "billing",
                  guide:
                    'This assumes billing, but "Infrastructure as Code" showed Cloudformation Change Sets Preview behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Infrastructure as Code" and how it framed Cloudformation Change Sets Preview. Apply the same reasoning here.',
            },
            {
              type: "DRAG_DROP",
              order: 3,
              question: "Arrange the lifecycle of a CodePipeline deployment:",
              options: [
                {
                  text: "Source",
                  order: 1,
                  guide:
                    'This assumes Source, but "Infrastructure as Code" showed Arrange Lifecycle Codepipeline Deployment behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Build",
                  order: 2,
                  guide:
                    'This assumes Build, but "Infrastructure as Code" showed Arrange Lifecycle Codepipeline Deployment behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Test",
                  order: 3,
                  guide:
                    'This assumes Test, but "Infrastructure as Code" showed Arrange Lifecycle Codepipeline Deployment behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Deploy",
                  order: 4,
                  guide:
                    'This assumes Deploy, but "Infrastructure as Code" showed Arrange Lifecycle Codepipeline Deployment behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Infrastructure as Code" and how it framed Arrange Lifecycle Codepipeline Deployment. Apply the same reasoning here.',
            },
          ],
        },
        {
          title: "Pipeline Automation",
          order: 2,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "Which service provides managed build environments for CI workflows?",
              options: [
                {
                  text: "AWS CodeBuild",
                  correct: true,
                  guide:
                    'Correct: AWS CodeBuild matches the Service Provides Managed Build behavior highlighted in "Pipeline Automation".',
                },
                {
                  text: "AWS Systems Manager",
                  guide:
                    'This assumes AWS Systems Manager, but "Pipeline Automation" showed Service Provides Managed Build behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Amazon Inspector",
                  guide:
                    'This assumes Amazon Inspector, but "Pipeline Automation" showed Service Provides Managed Build behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Pipeline Automation" and how it framed Service Provides Managed Build. Apply the same reasoning here.',
            },
            {
              type: "TRUE_FALSE",
              order: 2,
              question:
                "CodeDeploy can orchestrate blue/green deployments for both EC2 and Lambda.",
              options: [
                {
                  text: "True",
                  correct: true,
                  guide:
                    'Correct: True matches the Codedeploy Can Orchestrate Blue behavior highlighted in "Pipeline Automation".',
                },
                {
                  text: "False",
                  guide:
                    'This assumes False, but "Pipeline Automation" showed Codedeploy Can Orchestrate Blue behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Pipeline Automation" and how it framed Codedeploy Can Orchestrate Blue. Apply the same reasoning here.',
            },
            {
              type: "TEXT_INPUT",
              order: 3,
              question: "What pipeline action type runs unit or integration tests?",
              correctAnswer: "Test",
              hint: 'Think back to "Pipeline Automation" and how it framed Pipeline Action Runs Unit. Apply the same reasoning here.',
            },
          ],
        },
        {
          title: "Observability in Pipelines",
          order: 3,
          challenges: [
            {
              type: "VIDEO",
              order: 1,
              question:
                "Watch the observability walkthrough and identify which service surfaces pipeline metrics in dashboards.",
              videoSrc:
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
              options: [
                {
                  text: "Amazon QuickSight",
                  guide:
                    'This assumes Amazon QuickSight, but "Observability in Pipelines" showed Watch Observability Walkthrough Identify behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Amazon CloudWatch",
                  correct: true,
                  guide:
                    'Correct: Amazon CloudWatch matches the Watch Observability Walkthrough Identify behavior highlighted in "Observability in Pipelines".',
                },
                {
                  text: "AWS Health Dashboard",
                  guide:
                    'This assumes AWS Health Dashboard, but "Observability in Pipelines" showed Watch Observability Walkthrough Identify behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "AWS Control Tower",
                  guide:
                    'This assumes AWS Control Tower, but "Observability in Pipelines" showed Watch Observability Walkthrough Identify behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Observability in Pipelines"—it explained how Watch Observability Walkthrough Identify works within AWS.',
            },
            {
              type: "IMAGE_SELECT",
              order: 2,
              question: "Select the icon representing the CodePipeline state machine diagram.",
              options: [
                {
                  text: "CodePipeline Diagram",
                  imageSrc: "/aws-codepipeline-icon.png",
                  correct: true,
                  guide:
                    'Correct: CodePipeline Diagram matches the Icon Representing Codepipeline State behavior highlighted in "Observability in Pipelines".',
                },
                {
                  text: "CodeCommit Repo",
                  imageSrc: "/aws-codecommit-icon.png",
                  guide:
                    'This assumes CodeCommit Repo, but "Observability in Pipelines" showed Icon Representing Codepipeline State behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "CloudFormation Stack",
                  imageSrc: "/aws-cloudformation-icon.png",
                  guide:
                    'This assumes CloudFormation Stack, but "Observability in Pipelines" showed Icon Representing Codepipeline State behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Observability in Pipelines"—it explained how Icon Representing Codepipeline State works within AWS.',
            },
            {
              type: "LISTENING",
              order: 3,
              question:
                "Listen to the SRE team retrospective. Which automation helped shorten rollback time?",
              audioSrc: "/audio/aws-pipeline-rollback.mp3",
              options: [
                {
                  text: "Automated CloudWatch alarms",
                  guide:
                    'This assumes Automated CloudWatch alarms, but "Observability in Pipelines" showed Listen Sre Team Retrospective behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "One-click CodeDeploy rollback",
                  correct: true,
                  guide:
                    'Correct: One-click CodeDeploy rollback matches the Listen Sre Team Retrospective behavior highlighted in "Observability in Pipelines".',
                },
                {
                  text: "Manual console actions",
                  guide:
                    'This assumes Manual console actions, but "Observability in Pipelines" showed Listen Sre Team Retrospective behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Upfront provisioning",
                  guide:
                    'This assumes Upfront provisioning, but "Observability in Pipelines" showed Listen Sre Team Retrospective behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Observability in Pipelines"—it explained how Listen Sre Team Retrospective works within AWS.',
            },
          ],
        },
      ],
    },
    {
      title: "Modern Application Patterns",
      description: "Design and monitor cloud-native applications",
      order: 3,
      lessons: [
        {
          title: "Messaging Patterns",
          order: 1,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "Which service provides WebSocket APIs for real-time apps?",
              options: [
                {
                  text: "Amazon API Gateway",
                  correct: true,
                  guide:
                    'Correct: Amazon API Gateway matches the Service Provides Websocket Apis behavior highlighted in "Messaging Patterns".',
                },
                {
                  text: "Amazon SNS",
                  guide:
                    'This assumes Amazon SNS, but "Messaging Patterns" showed Service Provides Websocket Apis behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "AWS Step Functions",
                  guide:
                    'This assumes AWS Step Functions, but "Messaging Patterns" showed Service Provides Websocket Apis behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Messaging Patterns" about Service Provides Websocket Apis to guide your answer.',
            },
            {
              type: "TRUE_FALSE",
              order: 2,
              question: "Amazon MQ supports both ActiveMQ and RabbitMQ engines.",
              options: [
                {
                  text: "True",
                  correct: true,
                  guide:
                    'Correct: True matches the Amazon Mq Supports Both behavior highlighted in "Messaging Patterns".',
                },
                {
                  text: "False",
                  guide:
                    'This assumes False, but "Messaging Patterns" showed Amazon Mq Supports Both behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Messaging Patterns" about Amazon Mq Supports Both to guide your answer.',
            },
            {
              type: "TEXT_INPUT",
              order: 3,
              question:
                "Name the service used to manage asynchronous workflows with visual designers.",
              correctAnswer: "AWS Step Functions",
              hint: 'Use the example from "Messaging Patterns" about Service Used Manage Asynchronous to guide your answer.',
            },
          ],
        },
        {
          title: "Observability Basics",
          order: 2,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "Which service enables distributed tracing of microservices?",
              options: [
                {
                  text: "AWS X-Ray",
                  correct: true,
                  guide:
                    'Correct: AWS X-Ray matches the Service Enables Distributed Tracing behavior highlighted in "Observability Basics".',
                },
                {
                  text: "Amazon Polly",
                  guide:
                    'This assumes Amazon Polly, but "Observability Basics" showed Service Enables Distributed Tracing behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "AWS Batch",
                  guide:
                    'This assumes AWS Batch, but "Observability Basics" showed Service Enables Distributed Tracing behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Observability Basics" and how it framed Service Enables Distributed Tracing. Apply the same reasoning here.',
            },
            {
              type: "ASSIST",
              order: 2,
              question: "Complete: CloudWatch Embedded Metric Format improves ______ efficiency.",
              options: [
                {
                  text: "billing",
                  guide:
                    'This assumes billing, but "Observability Basics" showed Cloudwatch Embedded Metric Format behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "ingestion",
                  correct: true,
                  guide:
                    'Correct: ingestion matches the Cloudwatch Embedded Metric Format behavior highlighted in "Observability Basics".',
                },
                {
                  text: "latency",
                  guide:
                    'This assumes latency, but "Observability Basics" showed Cloudwatch Embedded Metric Format behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Observability Basics" and how it framed Cloudwatch Embedded Metric Format. Apply the same reasoning here.',
            },
            {
              type: "DRAG_DROP",
              order: 3,
              question: "Order the steps to enable canary deployments with CloudWatch Synthetics:",
              options: [
                {
                  text: "Define canary script",
                  order: 1,
                  guide:
                    'This assumes Define canary script, but "Observability Basics" showed Order Steps Enable Canary behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Schedule health checks",
                  order: 2,
                  guide:
                    'This assumes Schedule health checks, but "Observability Basics" showed Order Steps Enable Canary behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Integrate with alarms",
                  order: 3,
                  guide:
                    'This assumes Integrate with alarms, but "Observability Basics" showed Order Steps Enable Canary behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Trigger rollback on failure",
                  order: 4,
                  guide:
                    'This assumes Trigger rollback on failure, but "Observability Basics" showed Order Steps Enable Canary behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Observability Basics" and how it framed Order Steps Enable Canary. Apply the same reasoning here.',
            },
          ],
        },
        {
          title: "Cost-Aware Development",
          order: 3,
          challenges: [
            {
              type: "VIDEO",
              order: 1,
              question:
                "Watch the developer office hours. Which practice reduced Lambda execution costs?",
              videoSrc:
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
              options: [
                {
                  text: "Switch to provisioned concurrency",
                  guide:
                    'This assumes Switch to provisioned concurrency, but "Cost-Aware Development" showed Watch Developer Office Hours behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Optimize memory configuration",
                  correct: true,
                  guide:
                    'Correct: Optimize memory configuration matches the Watch Developer Office Hours behavior highlighted in "Cost-Aware Development".',
                },
                {
                  text: "Disable logging",
                  guide:
                    'This assumes Disable logging, but "Cost-Aware Development" showed Watch Developer Office Hours behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Change runtime to .NET",
                  guide:
                    'This assumes Change runtime to .NET, but "Cost-Aware Development" showed Watch Developer Office Hours behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Cost-Aware Development" about Watch Developer Office Hours to guide your answer.',
            },
            {
              type: "TEXT_INPUT",
              order: 2,
              question: "Which AWS tool helps forecast serverless spending trends?",
              correctAnswer: "AWS Cost Explorer",
              hint: 'Use the example from "Cost-Aware Development" about Aws Tool Helps Forecast to guide your answer.',
            },
            {
              type: "ASSIST",
              order: 3,
              question: "Complete: Lambda Power Tuning evaluates memory vs ______ tradeoffs.",
              options: [
                {
                  text: "latency",
                  correct: true,
                  guide:
                    'Correct: latency matches the Lambda Power Tuning Evaluates behavior highlighted in "Cost-Aware Development".',
                },
                {
                  text: "network",
                  guide:
                    'This assumes network, but "Cost-Aware Development" showed Lambda Power Tuning Evaluates behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "IAM",
                  guide:
                    'This assumes IAM, but "Cost-Aware Development" showed Lambda Power Tuning Evaluates behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Cost-Aware Development" about Lambda Power Tuning Evaluates to guide your answer.',
            },
          ],
        },
      ],
    },
    {
      title: "Real-World Application Lab",
      description:
        "Apply AWS Developer Associate skills to architecture, operations, and optimization scenarios.",
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
