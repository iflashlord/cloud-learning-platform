import { LessonQuestion } from "./types";

// Sample lesson data for the AWS learning example
export const sampleQuestions: LessonQuestion[] = [
  {
    id: '1',
    question: 'Which AWS service is used for object storage?',
    options: ['EC2', 'S3', 'RDS', 'Lambda'],
    correctAnswer: 1,
    explanation: 'Amazon S3 (Simple Storage Service) is AWS\'s object storage service that offers industry-leading scalability, data availability, security, and performance.'
  },
  {
    id: '2', 
    question: 'What does EC2 stand for?',
    options: ['Elastic Container Cloud', 'Elastic Compute Cloud', 'Enhanced Cloud Computing', 'Enterprise Cloud Center'],
    correctAnswer: 1,
    explanation: 'EC2 stands for Elastic Compute Cloud, which provides scalable computing capacity in the Amazon Web Services cloud.'
  },
  {
    id: '3',
    question: 'Which service is used for serverless computing?',
    options: ['S3', 'EC2', 'Lambda', 'VPC'],
    correctAnswer: 2,
    explanation: 'AWS Lambda lets you run code without provisioning or managing servers. You pay only for the compute time you consume.'
  },
  {
    id: '4',
    question: 'What is AWS RDS?',
    options: ['Redis Data Service', 'Relational Database Service', 'Real-time Data Store', 'Redundant Data System'],
    correctAnswer: 1,
    explanation: 'Amazon RDS (Relational Database Service) makes it easy to set up, operate, and scale a relational database in the cloud.'
  },
  {
    id: '5',
    question: 'Which service provides content delivery network (CDN)?',
    options: ['CloudWatch', 'CloudFormation', 'CloudFront', 'CloudTrail'],
    correctAnswer: 2,
    explanation: 'Amazon CloudFront is a fast content delivery network (CDN) service that securely delivers data, videos, applications, and APIs to customers globally.'
  }
];