import { CourseSeed } from "../types"

export const googleCloudAssociateCloudEngineerCourse: CourseSeed = {
  id: 6,
  title: "Google Cloud Associate Cloud Engineer",
  imageSrc: "/gcp-associate-cloud-engineer.svg",
  category: "Google Cloud",
  description:
    "Deploy, secure, and operate Google Cloud workloads using best practices for compute, networking, and observability.",
  level: "Intermediate",
  duration: "3-5 hours",
  units: [
    {
      title: "Compute and Deployment",
      description:
        "Provision compute resources and streamline application releases on Google Cloud.",
      order: 1,
      lessons: [
        {
          title: "Instance Management",
          order: 1,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "Which feature lets you capture and reuse VM disk images across projects?",
              options: [
                {
                  text: "Custom images",
                  correct: true,
                  guide:
                    'Correct: Custom images matches the Feature Lets You Capture behavior highlighted in "Instance Management".',
                },
                {
                  text: "Instance templates",
                  guide:
                    'This assumes Instance templates, but "Instance Management" showed Feature Lets You Capture behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Snapshots",
                  guide:
                    'This assumes Snapshots, but "Instance Management" showed Feature Lets You Capture behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Instance Management"—it explained how Feature Lets You Capture works within Google Cloud.',
            },
            {
              type: "DRAG_DROP",
              order: 2,
              question: "Arrange the steps to deploy a managed instance group:",
              options: [
                {
                  text: "Create instance template",
                  order: 1,
                  guide:
                    'This assumes Create instance template, but "Instance Management" showed Arrange Steps Deploy Managed behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Define autoscaling policy",
                  order: 2,
                  guide:
                    'This assumes Define autoscaling policy, but "Instance Management" showed Arrange Steps Deploy Managed behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Attach health checks",
                  order: 3,
                  guide:
                    'This assumes Attach health checks, but "Instance Management" showed Arrange Steps Deploy Managed behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Deploy group to zones",
                  order: 4,
                  guide:
                    'This assumes Deploy group to zones, but "Instance Management" showed Arrange Steps Deploy Managed behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Remember the pattern you practiced in "Instance Management"—it explained how Arrange Steps Deploy Managed works within Google Cloud.',
            },
            {
              type: "TRUE_FALSE",
              order: 3,
              question: "Preemptible VMs can run indefinitely if capacity remains available.",
              options: [
                {
                  text: "True",
                  guide:
                    'This assumes True, but "Instance Management" showed Preemptible Vms Can Run behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "False",
                  correct: true,
                  guide:
                    'Correct: False matches the Preemptible Vms Can Run behavior highlighted in "Instance Management".',
                },
              ],
              hint: 'Remember the pattern you practiced in "Instance Management"—it explained how Preemptible Vms Can Run works within Google Cloud.',
            },
          ],
        },
        {
          title: "Deployment Automation",
          order: 2,
          challenges: [
            {
              type: "VIDEO",
              order: 1,
              question:
                "Watch the video on Cloud Build triggers. Which trigger type runs builds when code is merged to a branch?",
              videoSrc:
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
              options: [
                {
                  text: "Tag trigger",
                  guide:
                    'This assumes Tag trigger, but "Deployment Automation" showed Watch Video On Cloud behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Push trigger",
                  correct: true,
                  guide:
                    'Correct: Push trigger matches the Watch Video On Cloud behavior highlighted in "Deployment Automation".',
                },
                {
                  text: "Manual trigger",
                  guide:
                    'This assumes Manual trigger, but "Deployment Automation" showed Watch Video On Cloud behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Scheduled trigger",
                  guide:
                    'This assumes Scheduled trigger, but "Deployment Automation" showed Watch Video On Cloud behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Deployment Automation" about Watch Video On Cloud to guide your answer.',
            },
            {
              type: "TEXT_INPUT",
              order: 2,
              question:
                "Which service provides a fully managed environment for running containers without servers?",
              correctAnswer: "Cloud Run",
              hint: 'Use the example from "Deployment Automation" about Service Provides Fully Managed to guide your answer.',
            },
            {
              type: "IMAGE_SELECT",
              order: 3,
              question: "Select the icon that represents Google Kubernetes Engine (GKE).",
              options: [
                {
                  text: "GKE Logo",
                  imageSrc: "/gcp-gke-icon.png",
                  correct: true,
                  guide:
                    'Correct: GKE Logo matches the Icon Represents Google Kubernetes behavior highlighted in "Deployment Automation".',
                },
                {
                  text: "Cloud Storage Logo",
                  imageSrc: "/gcp-storage-icon.png",
                  guide:
                    'This assumes Cloud Storage Logo, but "Deployment Automation" showed Icon Represents Google Kubernetes behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Cloud Build Logo",
                  imageSrc: "/gcp-build-icon.png",
                  guide:
                    'This assumes Cloud Build Logo, but "Deployment Automation" showed Icon Represents Google Kubernetes behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Deployment Automation" about Icon Represents Google Kubernetes to guide your answer.',
            },
          ],
        },
      ],
    },
    {
      title: "Networking and Operations",
      description: "Configure secure connectivity and maintain healthy Google Cloud workloads.",
      order: 2,
      lessons: [
        {
          title: "Networking Fundamentals",
          order: 1,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question:
                "Which service provides global HTTPS load balancing with automatic certificate management?",
              options: [
                {
                  text: "Cloud Load Balancing",
                  correct: true,
                  guide:
                    'Correct: Cloud Load Balancing matches the Service Provides Global Https behavior highlighted in "Networking Fundamentals".',
                },
                {
                  text: "Cloud Interconnect",
                  guide:
                    'This assumes Cloud Interconnect, but "Networking Fundamentals" showed Service Provides Global Https behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Cloud VPN",
                  guide:
                    'This assumes Cloud VPN, but "Networking Fundamentals" showed Service Provides Global Https behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Networking Fundamentals" and how it framed Service Provides Global Https. Apply the same reasoning here.',
            },
            {
              type: "ASSIST",
              order: 2,
              question:
                "Complete: Cloud NAT enables outbound internet access for instances without ______ IP addresses.",
              options: [
                {
                  text: "static",
                  guide:
                    'This assumes static, but "Networking Fundamentals" showed Cloud Nat Enables Outbound behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "external",
                  correct: true,
                  guide:
                    'Correct: external matches the Cloud Nat Enables Outbound behavior highlighted in "Networking Fundamentals".',
                },
                {
                  text: "regional",
                  guide:
                    'This assumes regional, but "Networking Fundamentals" showed Cloud Nat Enables Outbound behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Networking Fundamentals" and how it framed Cloud Nat Enables Outbound. Apply the same reasoning here.',
            },
            {
              type: "DRAG_DROP",
              order: 3,
              question: "Order the steps to establish a VPC peering connection:",
              options: [
                {
                  text: "Request peering from project A",
                  order: 1,
                  guide:
                    'This assumes Request peering from project A, but "Networking Fundamentals" showed Order Steps Establish Vpc behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Accept peering in project B",
                  order: 2,
                  guide:
                    'This assumes Accept peering in project B, but "Networking Fundamentals" showed Order Steps Establish Vpc behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Configure route exchange",
                  order: 3,
                  guide:
                    'This assumes Configure route exchange, but "Networking Fundamentals" showed Order Steps Establish Vpc behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Verify connectivity",
                  order: 4,
                  guide:
                    'This assumes Verify connectivity, but "Networking Fundamentals" showed Order Steps Establish Vpc behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Networking Fundamentals" and how it framed Order Steps Establish Vpc. Apply the same reasoning here.',
            },
          ],
        },
        {
          title: "Monitoring and Automation",
          order: 2,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question:
                "Which Operations suite feature lets you define alerting policies on log-based metrics?",
              options: [
                {
                  text: "Cloud Monitoring",
                  correct: true,
                  guide:
                    'Correct: Cloud Monitoring matches the Operations Suite Feature Lets behavior highlighted in "Monitoring and Automation".',
                },
                {
                  text: "Cloud Logging",
                  guide:
                    'This assumes Cloud Logging, but "Monitoring and Automation" showed Operations Suite Feature Lets behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Cloud Trace",
                  guide:
                    'This assumes Cloud Trace, but "Monitoring and Automation" showed Operations Suite Feature Lets behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Monitoring and Automation" and how it framed Operations Suite Feature Lets. Apply the same reasoning here.',
            },
            {
              type: "TRUE_FALSE",
              order: 2,
              question: "Cloud Functions can be triggered directly from Cloud Logging sinks.",
              options: [
                {
                  text: "True",
                  correct: true,
                  guide:
                    'Correct: True matches the Cloud Functions Can Be behavior highlighted in "Monitoring and Automation".',
                },
                {
                  text: "False",
                  guide:
                    'This assumes False, but "Monitoring and Automation" showed Cloud Functions Can Be behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Think back to "Monitoring and Automation" and how it framed Cloud Functions Can Be. Apply the same reasoning here.',
            },
            {
              type: "TEXT_INPUT",
              order: 3,
              question:
                "Name the Google Cloud service used to automate infrastructure tasks with declarative configurations.",
              correctAnswer: "Deployment Manager",
              hint: 'Think back to "Monitoring and Automation" and how it framed Google Cloud Service Used. Apply the same reasoning here.',
            },
          ],
        },
      ],
    },
    {
      title: "Operations Excellence",
      description: "Keep production workloads reliable and compliant.",
      order: 3,
      lessons: [
        {
          title: "Observability Stack",
          order: 1,
          challenges: [
            {
              type: "VIDEO",
              order: 1,
              question:
                "Watch the operations demo. Which dashboard component highlights SLO burn rates?",
              videoSrc:
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
              options: [
                {
                  text: "Log Explorer",
                  guide:
                    'This assumes Log Explorer, but "Observability Stack" showed Watch Operations Demo Dashboard behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Cloud Monitoring SLO widget",
                  correct: true,
                  guide:
                    'Correct: Cloud Monitoring SLO widget matches the Watch Operations Demo Dashboard behavior highlighted in "Observability Stack".',
                },
                {
                  text: "Error Reporting timeline",
                  guide:
                    'This assumes Error Reporting timeline, but "Observability Stack" showed Watch Operations Demo Dashboard behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Security Command Center findings",
                  guide:
                    'This assumes Security Command Center findings, but "Observability Stack" showed Watch Operations Demo Dashboard behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Observability Stack" about Watch Operations Demo Dashboard to guide your answer.',
            },
            {
              type: "TEXT_INPUT",
              order: 2,
              question: "Which service surfaces latency distributions for HTTP workloads?",
              correctAnswer: "Cloud Trace",
              hint: 'Use the example from "Observability Stack" about Service Surfaces Latency Distributions to guide your answer.',
            },
            {
              type: "ASSIST",
              order: 3,
              question: "Complete: Error Reporting groups stack traces by ______ value.",
              options: [
                {
                  text: "fingerprint",
                  correct: true,
                  guide:
                    'Correct: fingerprint matches the Error Reporting Groups Stack behavior highlighted in "Observability Stack".',
                },
                {
                  text: "UUID",
                  guide:
                    'This assumes UUID, but "Observability Stack" showed Error Reporting Groups Stack behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "timestamp",
                  guide:
                    'This assumes timestamp, but "Observability Stack" showed Error Reporting Groups Stack behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Observability Stack" about Error Reporting Groups Stack to guide your answer.',
            },
          ],
        },
        {
          title: "Security Operations",
          order: 2,
          challenges: [
            {
              type: "SELECT",
              order: 1,
              question: "Which Google Cloud service offers managed threat detection for workloads?",
              options: [
                {
                  text: "Security Command Center",
                  correct: true,
                  guide:
                    'Correct: Security Command Center matches the Google Cloud Service Offers behavior highlighted in "Security Operations".',
                },
                {
                  text: "Cloud Pub/Sub",
                  guide:
                    'This assumes Cloud Pub/Sub, but "Security Operations" showed Google Cloud Service Offers behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Cloud Deploy",
                  guide:
                    'This assumes Cloud Deploy, but "Security Operations" showed Google Cloud Service Offers behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Security Operations" about Google Cloud Service Offers to guide your answer.',
            },
            {
              type: "TRUE_FALSE",
              order: 2,
              question: "Binary Authorization enforces container image attestation policies.",
              options: [
                {
                  text: "True",
                  correct: true,
                  guide:
                    'Correct: True matches the Binary Authorization Enforces Container behavior highlighted in "Security Operations".',
                },
                {
                  text: "False",
                  guide:
                    'This assumes False, but "Security Operations" showed Binary Authorization Enforces Container behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Security Operations" about Binary Authorization Enforces Container to guide your answer.',
            },
            {
              type: "DRAG_DROP",
              order: 3,
              question:
                "Order the incident response steps recommended in the Google Cloud security guide:",
              options: [
                {
                  text: "Detect suspicious activity",
                  order: 1,
                  guide:
                    'This assumes Detect suspicious activity, but "Security Operations" showed Order Incident Response Steps behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Isolate impacted resources",
                  order: 2,
                  guide:
                    'This assumes Isolate impacted resources, but "Security Operations" showed Order Incident Response Steps behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Remediate configuration",
                  order: 3,
                  guide:
                    'This assumes Remediate configuration, but "Security Operations" showed Order Incident Response Steps behaves differently, so this isn’t the best choice.',
                },
                {
                  text: "Perform post-incident review",
                  order: 4,
                  guide:
                    'This assumes Perform post-incident review, but "Security Operations" showed Order Incident Response Steps behaves differently, so this isn’t the best choice.',
                },
              ],
              hint: 'Use the example from "Security Operations" about Order Incident Response Steps to guide your answer.',
            },
          ],
        },
      ],
    },
    {
      title: "Real-World Application Lab",
      description:
        "Apply Google Cloud Associate Cloud Engineer skills to architecture, operations, and optimization scenarios.",
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
