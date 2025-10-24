import { CourseSeed } from "../types"

export const awsCloudPractitionerCourse: CourseSeed = {
  id: 1,
  title: "AWS Cloud Practitioner",
  imageSrc: "/aws-cloud-practitioner.svg",
  category: "AWS",
  description:
    "Build foundational knowledge of cloud concepts and AWS services. Perfect for beginners entering the cloud computing field.",
  level: "Beginner",
  duration: "2-3 hours",
  units: [
    {
      title: "Cloud Concepts",
      description: "Learn AWS Cloud fundamentals and value proposition",
      order: 1,
      lessons: [
        {
          title: "What is Cloud Computing?",
          order: 1,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "What is Cloud Computing?",
              hint: "Contrast AWS’s ability to hand you infrastructure instantly with the effort of building out your own server room.",
              options: [
                {
                  text: "On-demand delivery of IT resources over the internet",
                  correct: true,
                  guide:
                    "Correct: Cloud computing is exactly about requesting compute, storage, or databases when you need them instead of buying hardware up front.",
                },
                {
                  text: "A physical data center you own",
                  guide:
                    "Owning a data center means you still handle power, cooling, and maintenance, which the lesson highlighted as work AWS removes for you.",
                },
                {
                  text: "Software installed on your computer",
                  guide:
                    "Local installs serve a single machine, but the lesson focused on managed services you reach over the network from anywhere.",
                },
              ],
            },
            {
              type: "ASSIST",
              order: 2,
              question: "Complete: Cloud computing provides ____ access to IT resources",
              hint: "Remember how the lesson emphasized scaling up the moment demand appears instead of waiting for procurement.",
              options: [
                {
                  text: "on-demand",
                  correct: true,
                  guide:
                    "Correct: “On-demand” captures the instant availability of resources that AWS advertises across its services.",
                },
                {
                  text: "scheduled",
                  guide:
                    "If you have to wait for a schedule, you lose the agility the lesson highlighted, so this doesn’t fit.",
                },
                {
                  text: "limited",
                  guide:
                    "Elastic capacity is a core promise of AWS, so calling the access “limited” contradicts the point of the unit.",
                },
              ],
            },
            {
              type: "TRUE_FALSE",
              order: 3,
              question: "Cloud computing eliminates the need for physical data centers completely.",
              hint: "Even when you stop buying servers, someone still has to run the hardware that powers the cloud.",
              options: [
                {
                  text: "True",
                  guide:
                    "AWS still operates massive facilities worldwide; the need for hardware doesn’t disappear, it just shifts away from the customer.",
                },
                {
                  text: "False",
                  correct: true,
                  guide:
                    "Correct: Customers no longer own the buildings, but AWS still runs the data centers that make every managed service possible.",
                },
              ],
            },
            {
              type: "TEXT_INPUT",
              order: 4,
              question: "What does AWS stand for? (Type the full name)",
              correctAnswer: "Amazon Web Services",
              hint: "Spell out the same Amazon-branded name you see on the console banner and in certification titles.",
            },
            {
              type: "DRAG_DROP",
              order: 5,
              question:
                "Arrange these AWS service types by typical learning order (most basic first):",
              hint: "Build knowledge from storing data, to running code, to connecting components, and finally to managing everything at scale.",
              options: [
                {
                  text: "Storage Services (S3, EBS)",
                  order: 1,
                  guide:
                    "You usually begin with storage because every workload needs a place to hold data before processing it.",
                },
                {
                  text: "Compute Services (EC2, Lambda)",
                  order: 2,
                  guide:
                    "After storage basics, learners move on to running applications with EC2 or Lambda so they can act on that data.",
                },
                {
                  text: "Networking Services (VPC, CloudFront)",
                  order: 3,
                  guide:
                    "Networking comes next so you can securely connect multiple compute and storage components.",
                },
                {
                  text: "Management Services (CloudWatch, CloudFormation)",
                  order: 4,
                  guide:
                    "Automation, monitoring, and governance tools typically make sense once you understand the foundational services.",
                },
              ],
            },
            {
              type: "IMAGE_SELECT",
              order: 6,
              question: "Which image represents the AWS cloud icon?",
              hint: "Look for the white “AWS” letters with the orange Amazon smile swoosh underneath.",
              options: [
                {
                  text: "AWS Cloud Icon",
                  imageSrc: "/aws-cloud-icon.png",
                  correct: true,
                  guide:
                    "Correct: The Amazon wordmark plus the orange swoosh is AWS’s official branding.",
                },
                {
                  text: "Microsoft Azure Icon",
                  imageSrc: "/azure-icon.png",
                  guide: "Azure’s stylized blue “A” belongs to Microsoft’s cloud, not AWS.",
                },
                {
                  text: "Google Cloud Icon",
                  imageSrc: "/gcp-icon.png",
                  guide:
                    "The multicolored cloud represents Google Cloud Platform, so it isn’t the AWS icon.",
                },
              ],
            },
            {
              type: "LISTENING",
              order: 7,
              question:
                "Listen to the audio introduction about AWS compute services. Which service is being described for running virtual machines?",
              audioSrc: "/audio/aws-intro.mp3",
              hint: "The narration mentioned choosing instance types, AMIs, and operating systems—think about which service offers that level of control.",
              options: [
                {
                  text: "Amazon S3 - Simple Storage Service",
                  guide:
                    "S3 stores objects and never boots operating systems, so it can’t be the VM-focused service from the clip.",
                },
                {
                  text: "Amazon EC2 - Elastic Compute Cloud",
                  correct: true,
                  guide:
                    "Correct: EC2 hands you full control of virtual machines, matching every detail in the audio description.",
                },
                {
                  text: "AWS Lambda - Serverless Computing",
                  guide:
                    "Lambda runs short-lived functions without provisioning servers, so it doesn’t align with the VM discussion.",
                },
                {
                  text: "Amazon RDS - Relational Database Service",
                  guide:
                    "RDS manages database engines rather than general-purpose operating systems, so it isn’t the service highlighted.",
                },
              ],
            },
            {
              type: "SPEECH_INPUT",
              order: 8,
              question:
                "Speak the full name of the AWS compute service that provides virtual machines in the cloud:",
              correctAnswer: "Amazon Elastic Compute Cloud",
              hint: "Say the complete name behind the EC2 acronym that appeared throughout the compute discussion.",
            },
            {
              type: "VIDEO",
              order: 9,
              question:
                "Watch this video about AWS Global Infrastructure and answer: How many Availability Zones does AWS have?",
              videoSrc:
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
              hint: "Listen for the narrator mentioning that AWS has grown beyond eighty Availability Zones across the globe.",
              options: [
                {
                  text: "50-100",
                  guide:
                    "AWS surpassed fifty zones some time ago, so this range undershoots the figure given in the video.",
                },
                {
                  text: "80+",
                  correct: true,
                  guide:
                    "Correct: The video cited a footprint just over eighty Availability Zones, matching AWS’s published number.",
                },
                {
                  text: "100-150",
                  guide:
                    "Triple-digit counts are coming, but the narrator called out a number smaller than one hundred.",
                },
                {
                  text: "200+",
                  guide:
                    "Two hundred zones would imply far more AWS regions than currently exist, so this exaggerates the current reach.",
                },
              ],
            },
          ],
        },
        {
          title: "Benefits of AWS Cloud",
          order: 2,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "What is a key benefit of AWS Cloud?",
              options: [
                {
                  text: "Pay-as-you-go pricing",
                  correct: true,
                  guide:
                    'Correct: Pay-as-you-go pricing matches the Key Benefit Aws Cloud behavior highlighted in "Benefits of AWS Cloud".',
                },
                {
                  text: "Requires large upfront investment",
                  guide:
                    'This assumes Requires large upfront investment, but "Benefits of AWS Cloud" showed Key Benefit Aws Cloud behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Limited scalability",
                  guide:
                    'This assumes Limited scalability, but "Benefits of AWS Cloud" showed Key Benefit Aws Cloud behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Benefits of AWS Cloud" and how it framed Key Benefit Aws Cloud. Apply the same reasoning here.',
            },
            {
              type: "DRAG_DROP",
              order: 2,
              question: "Order the benefits from immediate to strategic impact:",
              options: [
                {
                  text: "Elastic scalability",
                  order: 1,
                  guide:
                    'This assumes Elastic scalability, but "Benefits of AWS Cloud" showed Order Benefits From Immediate behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Global reach",
                  order: 2,
                  guide:
                    'This assumes Global reach, but "Benefits of AWS Cloud" showed Order Benefits From Immediate behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Cost optimization",
                  order: 3,
                  guide:
                    'This assumes Cost optimization, but "Benefits of AWS Cloud" showed Order Benefits From Immediate behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Innovation speed",
                  order: 4,
                  guide:
                    'This assumes Innovation speed, but "Benefits of AWS Cloud" showed Order Benefits From Immediate behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Benefits of AWS Cloud" and how it framed Order Benefits From Immediate. Apply the same reasoning here.',
            },
            {
              type: "TRUE_FALSE",
              order: 3,
              question:
                "AWS automatically provisions capacity ahead of demand, so you never have to scale services yourself.",
              options: [
                {
                  text: "True",
                  guide:
                    'This assumes True, but "Benefits of AWS Cloud" showed Aws Automatically Provisions Capacity behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "False",
                  correct: true,
                  guide:
                    'Correct: False matches the Aws Automatically Provisions Capacity behavior highlighted in "Benefits of AWS Cloud".',
                },
              ],
              hint: 'Think back to "Benefits of AWS Cloud" and how it framed Aws Automatically Provisions Capacity. Apply the same reasoning here.',
            },
            {
              type: "TEXT_INPUT",
              order: 4,
              question:
                "Fill in the blank: AWS allows you to trade capital expense for ______ expense.",
              correctAnswer: "operational",
              hint: 'Think back to "Benefits of AWS Cloud" and how it framed Blank Aws Allows You. Apply the same reasoning here.',
            },
          ],
        },
        {
          title: "Cloud Architecture",
          order: 3,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: 'What does "elasticity" mean in cloud computing?',
              options: [
                {
                  text: "Ability to scale resources up or down based on demand",
                  correct: true,
                  guide:
                    'Correct: Ability to scale resources up or down based on demand matches the Elasticity Mean Cloud Computing behavior highlighted in "Cloud Architecture".',
                },
                {
                  text: "Fixed resource allocation",
                  guide:
                    'This assumes Fixed resource allocation, but "Cloud Architecture" showed Elasticity Mean Cloud Computing behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Manual server provisioning",
                  guide:
                    'This assumes Manual server provisioning, but "Cloud Architecture" showed Elasticity Mean Cloud Computing behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Cloud Architecture" about Elasticity Mean Cloud Computing to guide your answer.',
            },
            {
              type: "SELECT",
              order: 2,
              question: "Which AWS service helps decouple application tiers?",
              options: [
                {
                  text: "Amazon SQS",
                  correct: true,
                  guide:
                    'Correct: Amazon SQS matches the Aws Service Helps Decouple behavior highlighted in "Cloud Architecture".',
                },
                {
                  text: "Amazon RDS",
                  guide:
                    'This assumes Amazon RDS, but "Cloud Architecture" showed Aws Service Helps Decouple behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Amazon S3",
                  guide:
                    'This assumes Amazon S3, but "Cloud Architecture" showed Aws Service Helps Decouple behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Cloud Architecture" about Aws Service Helps Decouple to guide your answer.',
            },
            {
              type: "ASSIST",
              order: 3,
              question: "Complete: A well-architected system is designed for ______ failures.",
              options: [
                {
                  text: "automatic",
                  guide:
                    'This assumes automatic, but "Cloud Architecture" showed Well Architected System Designed behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "planned",
                  correct: true,
                  guide:
                    'Correct: planned matches the Well Architected System Designed behavior highlighted in "Cloud Architecture".',
                },
                {
                  text: "rare",
                  guide:
                    'This assumes rare, but "Cloud Architecture" showed Well Architected System Designed behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Cloud Architecture" about Well Architected System Designed to guide your answer.',
            },
            {
              type: "DRAG_DROP",
              order: 4,
              question: "Arrange the AWS Well-Architected Framework pillars in alphabetical order:",
              options: [
                {
                  text: "Cost Optimization",
                  order: 1,
                  guide:
                    'This assumes Cost Optimization, but "Cloud Architecture" showed Arrange Aws Well Architected behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Operational Excellence",
                  order: 2,
                  guide:
                    'This assumes Operational Excellence, but "Cloud Architecture" showed Arrange Aws Well Architected behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Performance Efficiency",
                  order: 3,
                  guide:
                    'This assumes Performance Efficiency, but "Cloud Architecture" showed Arrange Aws Well Architected behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Reliability",
                  order: 4,
                  guide:
                    'This assumes Reliability, but "Cloud Architecture" showed Arrange Aws Well Architected behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Security",
                  order: 5,
                  guide:
                    'This assumes Security, but "Cloud Architecture" showed Arrange Aws Well Architected behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Cloud Architecture" about Arrange Aws Well Architected to guide your answer.',
            },
          ],
        },
        {
          title: "AWS Global Infrastructure",
          order: 4,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "What is an AWS Region?",
              options: [
                {
                  text: "A geographical area with multiple Availability Zones",
                  correct: true,
                  guide:
                    'Correct: A geographical area with multiple Availability Zones matches the Aws Region behavior highlighted in "AWS Global Infrastructure".',
                },
                {
                  text: "A single data center",
                  guide:
                    'This assumes A single data center, but "AWS Global Infrastructure" showed Aws Region behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "A subnet within a VPC",
                  guide:
                    'This assumes A subnet within a VPC, but "AWS Global Infrastructure" showed Aws Region behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "AWS Global Infrastructure" and how it framed Aws Region. Apply the same reasoning here.',
            },
            {
              type: "SELECT",
              order: 2,
              question: "What is an Availability Zone?",
              options: [
                {
                  text: "One or more discrete data centers with redundant power and networking",
                  correct: true,
                  guide:
                    'Correct: One or more discrete data centers with redundant power and networking matches the Availability Zone behavior highlighted in "AWS Global Infrastructure".',
                },
                {
                  text: "A region",
                  guide:
                    'This assumes A region, but "AWS Global Infrastructure" showed Availability Zone behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "An edge location",
                  guide:
                    'This assumes An edge location, but "AWS Global Infrastructure" showed Availability Zone behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "AWS Global Infrastructure" and how it framed Availability Zone. Apply the same reasoning here.',
            },
            {
              type: "TRUE_FALSE",
              order: 3,
              question: "Edge locations are only used for caching static content.",
              options: [
                {
                  text: "True",
                  guide:
                    'This assumes True, but "AWS Global Infrastructure" showed Edge Locations Only Used behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "False",
                  correct: true,
                  guide:
                    'Correct: False matches the Edge Locations Only Used behavior highlighted in "AWS Global Infrastructure".',
                },
              ],
              hint: 'Think back to "AWS Global Infrastructure" and how it framed Edge Locations Only Used. Apply the same reasoning here.',
            },
            {
              type: "DRAG_DROP",
              order: 4,
              question:
                "Place the global infrastructure components from smallest to largest scope:",
              options: [
                {
                  text: "Availability Zone",
                  order: 1,
                  guide:
                    'This assumes Availability Zone, but "AWS Global Infrastructure" showed Place Global Infrastructure Components behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Region",
                  order: 2,
                  guide:
                    'This assumes Region, but "AWS Global Infrastructure" showed Place Global Infrastructure Components behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Geographic Area",
                  order: 3,
                  guide:
                    'This assumes Geographic Area, but "AWS Global Infrastructure" showed Place Global Infrastructure Components behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Global Network",
                  order: 4,
                  guide:
                    'This assumes Global Network, but "AWS Global Infrastructure" showed Place Global Infrastructure Components behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "AWS Global Infrastructure" and how it framed Place Global Infrastructure Components. Apply the same reasoning here.',
            },
          ],
        },
        {
          title: "Cloud Economics",
          order: 5,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question:
                "Which pricing model provides the deepest discount for steady-state workloads?",
              options: [
                {
                  text: "Reserved Instances",
                  correct: true,
                  guide:
                    'Correct: Reserved Instances matches the Pricing Model Provides Deepest behavior highlighted in "Cloud Economics".',
                },
                {
                  text: "On-Demand Instances",
                  guide:
                    'This assumes On-Demand Instances, but "Cloud Economics" showed Pricing Model Provides Deepest behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Spot Instances",
                  guide:
                    'This assumes Spot Instances, but "Cloud Economics" showed Pricing Model Provides Deepest behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Cloud Economics"—it explained how Pricing Model Provides Deepest works within AWS.',
            },
            {
              type: "TRUE_FALSE",
              order: 2,
              question: "AWS pricing includes charges for data transfer into the cloud.",
              options: [
                {
                  text: "True",
                  guide:
                    'This assumes True, but "Cloud Economics" showed Aws Pricing Includes Charges behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "False",
                  correct: true,
                  guide:
                    'Correct: False matches the Aws Pricing Includes Charges behavior highlighted in "Cloud Economics".',
                },
              ],
              hint: 'Remember the pattern you practiced in "Cloud Economics"—it explained how Aws Pricing Includes Charges works within AWS.',
            },
            {
              type: "ASSIST",
              order: 3,
              question: "Fill the blank: AWS Cost Explorer helps you understand your ____ trends.",
              options: [
                {
                  text: "budget",
                  guide:
                    'This assumes budget, but "Cloud Economics" showed Blank Aws Cost Explorer behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "cost",
                  correct: true,
                  guide:
                    'Correct: cost matches the Blank Aws Cost Explorer behavior highlighted in "Cloud Economics".',
                },
                {
                  text: "ticket",
                  guide:
                    'This assumes ticket, but "Cloud Economics" showed Blank Aws Cost Explorer behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Cloud Economics"—it explained how Blank Aws Cost Explorer works within AWS.',
            },
            {
              type: "TEXT_INPUT",
              order: 4,
              question: "Name the AWS service used to set up automatic billing alerts.",
              correctAnswer: "AWS Budgets",
              hint: 'Remember the pattern you practiced in "Cloud Economics"—it explained how Aws Service Used Set works within AWS.',
            },
            {
              type: "DRAG_DROP",
              order: 5,
              question: "Arrange the cost-optimization process in the recommended order:",
              options: [
                {
                  text: "Visibility and reporting",
                  order: 1,
                  guide:
                    'This assumes Visibility and reporting, but "Cloud Economics" showed Arrange Cost Optimization Process behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Right-size resources",
                  order: 2,
                  guide:
                    'This assumes Right-size resources, but "Cloud Economics" showed Arrange Cost Optimization Process behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Purchase commitment",
                  order: 3,
                  guide:
                    'This assumes Purchase commitment, but "Cloud Economics" showed Arrange Cost Optimization Process behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Optimize over time",
                  order: 4,
                  guide:
                    'This assumes Optimize over time, but "Cloud Economics" showed Arrange Cost Optimization Process behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Cloud Economics"—it explained how Arrange Cost Optimization Process works within AWS.',
            },
          ],
        },
      ],
    },
    {
      title: "Security & Compliance",
      description: "Master AWS security and compliance concepts",
      order: 2,
      lessons: [
        {
          title: "Shared Responsibility Model",
          order: 1,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "Who is responsible for patching the guest OS on EC2?",
              options: [
                {
                  text: "Customer",
                  correct: true,
                  guide:
                    'Correct: Customer matches the Who Responsible Patching Guest behavior highlighted in "Shared Responsibility Model".',
                },
                {
                  text: "AWS",
                  guide:
                    'This assumes AWS, but "Shared Responsibility Model" showed Who Responsible Patching Guest behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Both AWS and Customer",
                  guide:
                    'This assumes Both AWS and Customer, but "Shared Responsibility Model" showed Who Responsible Patching Guest behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Shared Responsibility Model" and how it framed Who Responsible Patching Guest. Apply the same reasoning here.',
            },
            {
              type: "SELECT",
              order: 2,
              question: "What is AWS responsible for in the Shared Responsibility Model?",
              options: [
                {
                  text: "Physical security of data centers",
                  correct: true,
                  guide:
                    'Correct: Physical security of data centers matches the Aws Responsible Shared Responsibility behavior highlighted in "Shared Responsibility Model".',
                },
                {
                  text: "Customer data encryption",
                  guide:
                    'This assumes Customer data encryption, but "Shared Responsibility Model" showed Aws Responsible Shared Responsibility behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Application-level security",
                  guide:
                    'This assumes Application-level security, but "Shared Responsibility Model" showed Aws Responsible Shared Responsibility behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Shared Responsibility Model" and how it framed Aws Responsible Shared Responsibility. Apply the same reasoning here.',
            },
            {
              type: "TRUE_FALSE",
              order: 3,
              question: "Customers are responsible for configuring security groups.",
              options: [
                {
                  text: "True",
                  correct: true,
                  guide:
                    'Correct: True matches the Customers Responsible Configuring Security behavior highlighted in "Shared Responsibility Model".',
                },
                {
                  text: "False",
                  guide:
                    'This assumes False, but "Shared Responsibility Model" showed Customers Responsible Configuring Security behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Shared Responsibility Model" and how it framed Customers Responsible Configuring Security. Apply the same reasoning here.',
            },
            {
              type: "TEXT_INPUT",
              order: 4,
              question:
                "What term describes AWS’s responsibility to protect the hardware, software, and facilities?",
              correctAnswer: "Security of the cloud",
              hint: 'Think back to "Shared Responsibility Model" and how it framed Term Describes Aws S. Apply the same reasoning here.',
            },
          ],
        },
        {
          title: "IAM Basics",
          order: 2,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "What does IAM stand for?",
              options: [
                {
                  text: "Identity and Access Management",
                  correct: true,
                  guide:
                    'Correct: Identity and Access Management matches the Iam Stand behavior highlighted in "IAM Basics".',
                },
                {
                  text: "Internet Access Manager",
                  guide:
                    'This assumes Internet Access Manager, but "IAM Basics" showed Iam Stand behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Integrated Application Monitor",
                  guide:
                    'This assumes Integrated Application Monitor, but "IAM Basics" showed Iam Stand behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "IAM Basics" about Iam Stand to guide your answer.',
            },
            {
              type: "SELECT",
              order: 2,
              question: "What is the best practice for the AWS root account?",
              options: [
                {
                  text: "Enable MFA and use it only for account setup",
                  correct: true,
                  guide:
                    'Correct: Enable MFA and use it only for account setup matches the Best Practice Aws Root behavior highlighted in "IAM Basics".',
                },
                {
                  text: "Use it for all daily operations",
                  guide:
                    'This assumes Use it for all daily operations, but "IAM Basics" showed Best Practice Aws Root behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Share credentials with team members",
                  guide:
                    'This assumes Share credentials with team members, but "IAM Basics" showed Best Practice Aws Root behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "IAM Basics" about Best Practice Aws Root to guide your answer.',
            },
            {
              type: "DRAG_DROP",
              order: 3,
              question: "Arrange IAM components from most general to most specific:",
              options: [
                {
                  text: "Account",
                  order: 1,
                  guide:
                    'This assumes Account, but "IAM Basics" showed Arrange Iam Components From behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "User",
                  order: 2,
                  guide:
                    'This assumes User, but "IAM Basics" showed Arrange Iam Components From behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Group",
                  order: 3,
                  guide:
                    'This assumes Group, but "IAM Basics" showed Arrange Iam Components From behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Policy",
                  order: 4,
                  guide:
                    'This assumes Policy, but "IAM Basics" showed Arrange Iam Components From behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "IAM Basics" about Arrange Iam Components From to guide your answer.',
            },
            {
              type: "TRUE_FALSE",
              order: 4,
              question: "IAM roles can be assumed by services and users.",
              options: [
                {
                  text: "True",
                  correct: true,
                  guide:
                    'Correct: True matches the Iam Roles Can Be behavior highlighted in "IAM Basics".',
                },
                {
                  text: "False",
                  guide:
                    'This assumes False, but "IAM Basics" showed Iam Roles Can Be behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "IAM Basics" about Iam Roles Can Be to guide your answer.',
            },
          ],
        },
        {
          title: "Security Services",
          order: 3,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "Which service provides centralized governance across AWS accounts?",
              options: [
                {
                  text: "AWS Organizations",
                  correct: true,
                  guide:
                    'Correct: AWS Organizations matches the Service Provides Centralized Governance behavior highlighted in "Security Services".',
                },
                {
                  text: "AWS Shield",
                  guide:
                    'This assumes AWS Shield, but "Security Services" showed Service Provides Centralized Governance behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Amazon Inspector",
                  guide:
                    'This assumes Amazon Inspector, but "Security Services" showed Service Provides Centralized Governance behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Security Services"—it explained how Service Provides Centralized Governance works within AWS.',
            },
            {
              type: "ASSIST",
              order: 2,
              question: "Complete: AWS WAF protects applications from ______ attacks.",
              options: [
                {
                  text: "application layer",
                  correct: true,
                  guide:
                    'Correct: application layer matches the Aws Waf Protects Applications behavior highlighted in "Security Services".',
                },
                {
                  text: "network layer",
                  guide:
                    'This assumes network layer, but "Security Services" showed Aws Waf Protects Applications behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "hardware",
                  guide:
                    'This assumes hardware, but "Security Services" showed Aws Waf Protects Applications behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Security Services"—it explained how Aws Waf Protects Applications works within AWS.',
            },
            {
              type: "TRUE_FALSE",
              order: 3,
              question:
                "Amazon GuardDuty is a log archiving service that stores CloudTrail events.",
              options: [
                {
                  text: "True",
                  guide:
                    'This assumes True, but "Security Services" showed Amazon Guardduty Log Archiving behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "False",
                  correct: true,
                  guide:
                    'Correct: False matches the Amazon Guardduty Log Archiving behavior highlighted in "Security Services".',
                },
              ],
              hint: 'Remember the pattern you practiced in "Security Services"—it explained how Amazon Guardduty Log Archiving works within AWS.',
            },
            {
              type: "TEXT_INPUT",
              order: 4,
              question:
                "Which AWS service helps detect unintended resource access by evaluating configuration changes?",
              correctAnswer: "AWS Config",
              hint: 'Remember the pattern you practiced in "Security Services"—it explained how Aws Service Helps Detect works within AWS.',
            },
          ],
        },
        {
          title: "Compliance Programs",
          order: 4,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "Which AWS artifact helps customers review compliance reports?",
              options: [
                {
                  text: "AWS Artifact",
                  correct: true,
                  guide:
                    'Correct: AWS Artifact matches the Aws Artifact Helps Customers behavior highlighted in "Compliance Programs".',
                },
                {
                  text: "AWS Audit Manager",
                  guide:
                    'This assumes AWS Audit Manager, but "Compliance Programs" showed Aws Artifact Helps Customers behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "AWS License Manager",
                  guide:
                    'This assumes AWS License Manager, but "Compliance Programs" showed Aws Artifact Helps Customers behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Compliance Programs" about Aws Artifact Helps Customers to guide your answer.',
            },
            {
              type: "TRUE_FALSE",
              order: 2,
              question: "AWS Compliance Programs cover only US-based regulations.",
              options: [
                {
                  text: "True",
                  guide:
                    'This assumes True, but "Compliance Programs" showed Aws Compliance Programs Cover behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "False",
                  correct: true,
                  guide:
                    'Correct: False matches the Aws Compliance Programs Cover behavior highlighted in "Compliance Programs".',
                },
              ],
              hint: 'Use the example from "Compliance Programs" about Aws Compliance Programs Cover to guide your answer.',
            },
            {
              type: "ASSIST",
              order: 3,
              question: "Complete: AWS Artifact provides on-demand access to ______ reports.",
              options: [
                {
                  text: "financial",
                  guide:
                    'This assumes financial, but "Compliance Programs" showed Aws Artifact Provides On behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "compliance",
                  correct: true,
                  guide:
                    'Correct: compliance matches the Aws Artifact Provides On behavior highlighted in "Compliance Programs".',
                },
                {
                  text: "marketing",
                  guide:
                    'This assumes marketing, but "Compliance Programs" showed Aws Artifact Provides On behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Compliance Programs" about Aws Artifact Provides On to guide your answer.',
            },
            {
              type: "DRAG_DROP",
              order: 4,
              question:
                "Arrange the compliance review steps organizations should follow using AWS Artifact:",
              options: [
                {
                  text: "Identify applicable standards",
                  order: 1,
                  guide:
                    'This assumes Identify applicable standards, but "Compliance Programs" showed Arrange Compliance Review Steps behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Download relevant reports",
                  order: 2,
                  guide:
                    'This assumes Download relevant reports, but "Compliance Programs" showed Arrange Compliance Review Steps behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Validate control coverage",
                  order: 3,
                  guide:
                    'This assumes Validate control coverage, but "Compliance Programs" showed Arrange Compliance Review Steps behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Document evidence for auditors",
                  order: 4,
                  guide:
                    'This assumes Document evidence for auditors, but "Compliance Programs" showed Arrange Compliance Review Steps behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Compliance Programs" about Arrange Compliance Review Steps to guide your answer.',
            },
          ],
        },
      ],
    },
    {
      title: "Core AWS Services",
      description: "Explore foundational compute, storage, database, and networking services",
      order: 3,
      lessons: [
        {
          title: "Compute Services",
          order: 1,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "Which service is serverless and runs code without provisioning servers?",
              options: [
                {
                  text: "AWS Lambda",
                  correct: true,
                  guide:
                    'Correct: AWS Lambda matches the Service Serverless Runs Code behavior highlighted in "Compute Services".',
                },
                {
                  text: "Amazon EC2",
                  guide:
                    'This assumes Amazon EC2, but "Compute Services" showed Service Serverless Runs Code behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Amazon Lightsail",
                  guide:
                    'This assumes Amazon Lightsail, but "Compute Services" showed Service Serverless Runs Code behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Compute Services"—it explained how Service Serverless Runs Code works within AWS.',
            },
            {
              type: "TRUE_FALSE",
              order: 2,
              question: "AWS Fargate requires you to manage EC2 instances directly.",
              options: [
                {
                  text: "True",
                  guide:
                    'This assumes True, but "Compute Services" showed Aws Fargate Requires You behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "False",
                  correct: true,
                  guide:
                    'Correct: False matches the Aws Fargate Requires You behavior highlighted in "Compute Services".',
                },
              ],
              hint: 'Remember the pattern you practiced in "Compute Services"—it explained how Aws Fargate Requires You works within AWS.',
            },
            {
              type: "DRAG_DROP",
              order: 3,
              question: "Match the compute service with its typical use case:",
              options: [
                {
                  text: "EC2 - Highly customizable workloads",
                  order: 1,
                  guide:
                    'This assumes EC2 - Highly customizable workloads, but "Compute Services" showed Match Compute Service Its behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Lambda - Event-driven functions",
                  order: 2,
                  guide:
                    'This assumes Lambda - Event-driven functions, but "Compute Services" showed Match Compute Service Its behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "ECS - Container orchestration",
                  order: 3,
                  guide:
                    'This assumes ECS - Container orchestration, but "Compute Services" showed Match Compute Service Its behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Batch - Managed batch jobs",
                  order: 4,
                  guide:
                    'This assumes Batch - Managed batch jobs, but "Compute Services" showed Match Compute Service Its behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Compute Services"—it explained how Match Compute Service Its works within AWS.',
            },
          ],
        },
        {
          title: "Storage Options",
          order: 2,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "Which storage service is ideal for object storage?",
              options: [
                {
                  text: "Amazon S3",
                  correct: true,
                  guide:
                    'Correct: Amazon S3 matches the Storage Service Ideal Object behavior highlighted in "Storage Options".',
                },
                {
                  text: "Amazon EBS",
                  guide:
                    'This assumes Amazon EBS, but "Storage Options" showed Storage Service Ideal Object behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Amazon EFS",
                  guide:
                    'This assumes Amazon EFS, but "Storage Options" showed Storage Service Ideal Object behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Storage Options"—it explained how Storage Service Ideal Object works within AWS.',
            },
            {
              type: "TEXT_INPUT",
              order: 2,
              question: "What S3 storage class is optimized for long-term archival?",
              correctAnswer: "Glacier",
              hint: 'Remember the pattern you practiced in "Storage Options"—it explained how S3 Storage Class Optimized works within AWS.',
            },
            {
              type: "ASSIST",
              order: 3,
              question:
                "Complete: Amazon EFS provides ______ file storage for Linux-based workloads.",
              options: [
                {
                  text: "object",
                  guide:
                    'This assumes object, but "Storage Options" showed Amazon Efs Provides Blank behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "shared",
                  correct: true,
                  guide:
                    'Correct: shared matches the Amazon Efs Provides Blank behavior highlighted in "Storage Options".',
                },
                {
                  text: "block",
                  guide:
                    'This assumes block, but "Storage Options" showed Amazon Efs Provides Blank behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Storage Options"—it explained how Amazon Efs Provides Blank works within AWS.',
            },
            {
              type: "TRUE_FALSE",
              order: 4,
              question: "AWS Backup can centrally manage backup policies for EFS and RDS.",
              options: [
                {
                  text: "True",
                  correct: true,
                  guide:
                    'Correct: True matches the Aws Backup Can Centrally behavior highlighted in "Storage Options".',
                },
                {
                  text: "False",
                  guide:
                    'This assumes False, but "Storage Options" showed Aws Backup Can Centrally behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Storage Options"—it explained how Aws Backup Can Centrally works within AWS.',
            },
          ],
        },
        {
          title: "Database Services",
          order: 3,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "Which AWS service is a managed NoSQL database?",
              options: [
                {
                  text: "Amazon DynamoDB",
                  correct: true,
                  guide:
                    'Correct: Amazon DynamoDB matches the Aws Service Managed Nosql behavior highlighted in "Database Services".',
                },
                {
                  text: "Amazon RDS",
                  guide:
                    'This assumes Amazon RDS, but "Database Services" showed Aws Service Managed Nosql behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Amazon Redshift",
                  guide:
                    'This assumes Amazon Redshift, but "Database Services" showed Aws Service Managed Nosql behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Database Services" about Aws Service Managed Nosql to guide your answer.',
            },
            {
              type: "TEXT_INPUT",
              order: 2,
              question: "What feature of RDS provides automatic failover to a standby instance?",
              correctAnswer: "Multi-AZ",
              hint: 'Use the example from "Database Services" about Feature Rds Provides Automatic to guide your answer.',
            },
            {
              type: "DRAG_DROP",
              order: 3,
              question: "Order the database deployment steps from first to last:",
              options: [
                {
                  text: "Choose engine",
                  order: 1,
                  guide:
                    'This assumes Choose engine, but "Database Services" showed Order Database Deployment Steps behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Configure instance class",
                  order: 2,
                  guide:
                    'This assumes Configure instance class, but "Database Services" showed Order Database Deployment Steps behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Set up networking",
                  order: 3,
                  guide:
                    'This assumes Set up networking, but "Database Services" showed Order Database Deployment Steps behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Finalize backups",
                  order: 4,
                  guide:
                    'This assumes Finalize backups, but "Database Services" showed Order Database Deployment Steps behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Database Services" about Order Database Deployment Steps to guide your answer.',
            },
          ],
        },
        {
          title: "Networking Essentials",
          order: 4,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "Which service lets you define an isolated virtual network within AWS?",
              options: [
                {
                  text: "Amazon VPC",
                  correct: true,
                  guide:
                    'Correct: Amazon VPC matches the Service Lets You Define behavior highlighted in "Networking Essentials".',
                },
                {
                  text: "AWS Direct Connect",
                  guide:
                    'This assumes AWS Direct Connect, but "Networking Essentials" showed Service Lets You Define behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Amazon Route 53",
                  guide:
                    'This assumes Amazon Route 53, but "Networking Essentials" showed Service Lets You Define behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Networking Essentials"—it explained how Service Lets You Define works within AWS.',
            },
            {
              type: "TRUE_FALSE",
              order: 2,
              question: "Security groups act as stateful firewalls for EC2 instances.",
              options: [
                {
                  text: "True",
                  correct: true,
                  guide:
                    'Correct: True matches the Security Groups Act As behavior highlighted in "Networking Essentials".',
                },
                {
                  text: "False",
                  guide:
                    'This assumes False, but "Networking Essentials" showed Security Groups Act As behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Networking Essentials"—it explained how Security Groups Act As works within AWS.',
            },
            {
              type: "ASSIST",
              order: 3,
              question: "Complete: Route 53 provides DNS and ______ balancing services.",
              options: [
                {
                  text: "database",
                  guide:
                    'This assumes database, but "Networking Essentials" showed Route 53 Provides Dns behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "traffic",
                  correct: true,
                  guide:
                    'Correct: traffic matches the Route 53 Provides Dns behavior highlighted in "Networking Essentials".',
                },
                {
                  text: "storage",
                  guide:
                    'This assumes storage, but "Networking Essentials" showed Route 53 Provides Dns behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Networking Essentials"—it explained how Route 53 Provides Dns works within AWS.',
            },
            {
              type: "DRAG_DROP",
              order: 4,
              question: "Arrange the steps to create a secure public-facing application in a VPC:",
              options: [
                {
                  text: "Create VPC and subnets",
                  order: 1,
                  guide:
                    'This assumes Create VPC and subnets, but "Networking Essentials" showed Arrange Steps Create Secure behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Launch EC2 instances in public subnet",
                  order: 2,
                  guide:
                    'This assumes Launch EC2 instances in public subnet, but "Networking Essentials" showed Arrange Steps Create Secure behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Attach security groups and NACLs",
                  order: 3,
                  guide:
                    'This assumes Attach security groups and NACLs, but "Networking Essentials" showed Arrange Steps Create Secure behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Configure load balancer and Route 53",
                  order: 4,
                  guide:
                    'This assumes Configure load balancer and Route 53, but "Networking Essentials" showed Arrange Steps Create Secure behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Networking Essentials"—it explained how Arrange Steps Create Secure works within AWS.',
            },
          ],
        },
      ],
    },
    {
      title: "Billing & Pricing",
      description: "Understand AWS pricing models and cost management",
      order: 4,
      lessons: [
        {
          title: "Pricing Models",
          order: 1,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "Which option best describes the AWS Free Tier offering?",
              options: [
                {
                  text: "Free usage for new accounts on select services up to defined limits",
                  correct: true,
                  guide:
                    'Correct: Free usage for new accounts on select services up to defined limits matches the Option Best Describes Aws behavior highlighted in "Pricing Models".',
                },
                {
                  text: "Unlimited free usage for all services for 12 months",
                  guide:
                    'This assumes Unlimited free usage for all services for 12 months, but "Pricing Models" showed Option Best Describes Aws behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Discounts available only through enterprise support",
                  guide:
                    'This assumes Discounts available only through enterprise support, but "Pricing Models" showed Option Best Describes Aws behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Pricing Models" about Option Best Describes Aws to guide your answer.',
            },
            {
              type: "SELECT",
              order: 2,
              question: "Which pricing model gives you the ability to bid on unused capacity?",
              options: [
                {
                  text: "Spot Instances",
                  correct: true,
                  guide:
                    'Correct: Spot Instances matches the Pricing Model Gives You behavior highlighted in "Pricing Models".',
                },
                {
                  text: "On-Demand",
                  guide:
                    'This assumes On-Demand, but "Pricing Models" showed Pricing Model Gives You behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Savings Plans",
                  guide:
                    'This assumes Savings Plans, but "Pricing Models" showed Pricing Model Gives You behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Pricing Models" about Pricing Model Gives You to guide your answer.',
            },
            {
              type: "TRUE_FALSE",
              order: 3,
              question: "Savings Plans apply to both EC2 and Fargate usage when eligible.",
              options: [
                {
                  text: "True",
                  correct: true,
                  guide:
                    'Correct: True matches the Savings Plans Apply Both behavior highlighted in "Pricing Models".',
                },
                {
                  text: "False",
                  guide:
                    'This assumes False, but "Pricing Models" showed Savings Plans Apply Both behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Pricing Models" about Savings Plans Apply Both to guide your answer.',
            },
            {
              type: "DRAG_DROP",
              order: 4,
              question: "Match the pricing model to the use case by ordering:",
              options: [
                {
                  text: "On-Demand - Unpredictable workloads",
                  order: 1,
                  guide:
                    'This assumes On-Demand - Unpredictable workloads, but "Pricing Models" showed Match Pricing Model Use behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Savings Plans - Steady usage",
                  order: 2,
                  guide:
                    'This assumes Savings Plans - Steady usage, but "Pricing Models" showed Match Pricing Model Use behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Reserved - Long-term predictability",
                  order: 3,
                  guide:
                    'This assumes Reserved - Long-term predictability, but "Pricing Models" showed Match Pricing Model Use behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Spot - Flexible, interruption-tolerant",
                  order: 4,
                  guide:
                    'This assumes Spot - Flexible, interruption-tolerant, but "Pricing Models" showed Match Pricing Model Use behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Pricing Models" about Match Pricing Model Use to guide your answer.',
            },
          ],
        },
        {
          title: "Cost Management",
          order: 2,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "Which service provides dashboards and reports for cost tracking?",
              options: [
                {
                  text: "AWS Cost Explorer",
                  correct: true,
                  guide:
                    'Correct: AWS Cost Explorer matches the Service Provides Dashboards Reports behavior highlighted in "Cost Management".',
                },
                {
                  text: "AWS Trusted Advisor",
                  guide:
                    'This assumes AWS Trusted Advisor, but "Cost Management" showed Service Provides Dashboards Reports behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Amazon QuickSight",
                  guide:
                    'This assumes Amazon QuickSight, but "Cost Management" showed Service Provides Dashboards Reports behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Cost Management" about Service Provides Dashboards Reports to guide your answer.',
            },
            {
              type: "TEXT_INPUT",
              order: 2,
              question:
                "What AWS service can send notifications when spending exceeds a threshold?",
              correctAnswer: "AWS Budgets",
              hint: 'Use the example from "Cost Management" about Aws Service Can Send to guide your answer.',
            },
            {
              type: "TRUE_FALSE",
              order: 3,
              question: "AWS Cost and Usage Reports can be delivered to an S3 bucket.",
              options: [
                {
                  text: "True",
                  correct: true,
                  guide:
                    'Correct: True matches the Aws Cost Usage Reports behavior highlighted in "Cost Management".',
                },
                {
                  text: "False",
                  guide:
                    'This assumes False, but "Cost Management" showed Aws Cost Usage Reports behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Cost Management" about Aws Cost Usage Reports to guide your answer.',
            },
            {
              type: "ASSIST",
              order: 4,
              question:
                "Complete: AWS Trusted Advisor provides real-time guidance for ____ optimization.",
              options: [
                {
                  text: "resource",
                  guide:
                    'This assumes resource, but "Cost Management" showed Aws Trusted Advisor Provides behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "cost",
                  correct: true,
                  guide:
                    'Correct: cost matches the Aws Trusted Advisor Provides behavior highlighted in "Cost Management".',
                },
                {
                  text: "ticket",
                  guide:
                    'This assumes ticket, but "Cost Management" showed Aws Trusted Advisor Provides behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Cost Management" about Aws Trusted Advisor Provides to guide your answer.',
            },
            {
              type: "DRAG_DROP",
              order: 5,
              question: "Arrange the lifecycle of cost governance from first to last:",
              options: [
                {
                  text: "Set budgets",
                  order: 1,
                  guide:
                    'This assumes Set budgets, but "Cost Management" showed Arrange Lifecycle Cost Governance behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Monitor usage",
                  order: 2,
                  guide:
                    'This assumes Monitor usage, but "Cost Management" showed Arrange Lifecycle Cost Governance behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Analyze variance",
                  order: 3,
                  guide:
                    'This assumes Analyze variance, but "Cost Management" showed Arrange Lifecycle Cost Governance behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Take action",
                  order: 4,
                  guide:
                    'This assumes Take action, but "Cost Management" showed Arrange Lifecycle Cost Governance behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Cost Management" about Arrange Lifecycle Cost Governance to guide your answer.',
            },
          ],
        },
        {
          title: "Hands-on Cost Optimization",
          order: 3,
          challenges: [
            {
              type: "VIDEO",
              order: 1,
              question:
                "Watch the AWS re:Invent recap and identify the tool recommended for automated rightsizing.",
              videoSrc:
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
              options: [
                {
                  text: "AWS Compute Optimizer",
                  correct: true,
                  guide:
                    'Correct: AWS Compute Optimizer matches the Watch Aws Re Invent behavior highlighted in "Hands-on Cost Optimization".',
                },
                {
                  text: "AWS Savings Plans",
                  guide:
                    'This assumes AWS Savings Plans, but "Hands-on Cost Optimization" showed Watch Aws Re Invent behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "AWS Launch Wizard",
                  guide:
                    'This assumes AWS Launch Wizard, but "Hands-on Cost Optimization" showed Watch Aws Re Invent behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "AWS Step Functions",
                  guide:
                    'This assumes AWS Step Functions, but "Hands-on Cost Optimization" showed Watch Aws Re Invent behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Hands-on Cost Optimization" and how it framed Watch Aws Re Invent. Apply the same reasoning here.',
            },
            {
              type: "LISTENING",
              order: 2,
              question:
                "Listen to the finance lead describing monthly review steps. Which action happens last?",
              audioSrc: "/audio/aws-cost-optimization.mp3",
              options: [
                {
                  text: "Aggregate costs by tag",
                  guide:
                    'This assumes Aggregate costs by tag, but "Hands-on Cost Optimization" showed Listen Finance Lead Describing behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Share reports with stakeholders",
                  guide:
                    'This assumes Share reports with stakeholders, but "Hands-on Cost Optimization" showed Listen Finance Lead Describing behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Discuss optimization backlog",
                  correct: true,
                  guide:
                    'Correct: Discuss optimization backlog matches the Listen Finance Lead Describing behavior highlighted in "Hands-on Cost Optimization".',
                },
                {
                  text: "Export blended rates",
                  guide:
                    'This assumes Export blended rates, but "Hands-on Cost Optimization" showed Listen Finance Lead Describing behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Hands-on Cost Optimization" and how it framed Listen Finance Lead Describing. Apply the same reasoning here.',
            },
            {
              type: "TEXT_INPUT",
              order: 3,
              question: "Name the AWS service used to forecast spend using machine learning.",
              correctAnswer: "AWS Cost Explorer",
              hint: 'Think back to "Hands-on Cost Optimization" and how it framed Aws Service Used Forecast. Apply the same reasoning here.',
            },
          ],
        },
      ],
    },
    {
      title: "Real-World Application Lab",
      description:
        "Apply AWS Cloud Practitioner skills to architecture, operations, and optimization scenarios.",
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
