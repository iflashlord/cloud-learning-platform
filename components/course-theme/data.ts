import { 
  Cpu, 
  Database, 
  Shield, 
  Globe, 
  Monitor,
  Zap
} from 'lucide-react';
import { CourseTheme } from './types';

export const courseThemes: CourseTheme[] = [
  {
    id: 'compute',
    name: 'Compute Services',
    category: 'Core Services',
    icon: Cpu,
    colors: {
      primary: 'orange-500',
      secondary: 'red-500',
      accent: 'orange-100',
      background: 'from-orange-50 to-red-50'
    },
    services: ['EC2', 'Lambda', 'ECS', 'Fargate', 'Batch'],
    description: 'Learn about AWS compute services including virtual servers, serverless computing, and containerization.'
  },
  {
    id: 'storage',
    name: 'Storage & Database',
    category: 'Data Services',
    icon: Database,
    colors: {
      primary: 'blue-500',
      secondary: 'indigo-500',
      accent: 'blue-100',
      background: 'from-blue-50 to-indigo-50'
    },
    services: ['S3', 'RDS', 'DynamoDB', 'EBS', 'EFS'],
    description: 'Master AWS storage solutions and database services for scalable data management.'
  },
  {
    id: 'security',
    name: 'Security & Identity',
    category: 'Security',
    icon: Shield,
    colors: {
      primary: 'purple-500',
      secondary: 'pink-500',
      accent: 'purple-100',
      background: 'from-purple-50 to-pink-50'
    },
    services: ['IAM', 'KMS', 'Cognito', 'WAF', 'GuardDuty'],
    description: 'Understand AWS security services and best practices for protecting your cloud infrastructure.'
  },
  {
    id: 'networking',
    name: 'Networking & CDN',
    category: 'Infrastructure',
    icon: Globe,
    colors: {
      primary: 'teal-500',
      secondary: 'cyan-500',
      accent: 'teal-100',
      background: 'from-teal-50 to-cyan-50'
    },
    services: ['VPC', 'CloudFront', 'Route 53', 'API Gateway', 'Direct Connect'],
    description: 'Build robust network architectures and content delivery solutions on AWS.'
  },
  {
    id: 'management',
    name: 'Management & Monitoring',
    category: 'Operations',
    icon: Monitor,
    colors: {
      primary: 'emerald-500',
      secondary: 'green-500',
      accent: 'emerald-100',
      background: 'from-emerald-50 to-green-50'
    },
    services: ['CloudWatch', 'CloudTrail', 'Config', 'Systems Manager', 'CloudFormation'],
    description: 'Monitor, manage, and automate your AWS infrastructure effectively.'
  },
  {
    id: 'aiml',
    name: 'AI & Machine Learning',
    category: 'Advanced Services',
    icon: Zap,
    colors: {
      primary: 'violet-500',
      secondary: 'purple-500',
      accent: 'violet-100',
      background: 'from-violet-50 to-purple-50'
    },
    services: ['SageMaker', 'Rekognition', 'Comprehend', 'Polly', 'Lex'],
    description: 'Explore AI and ML services to build intelligent applications on AWS.'
  }
];