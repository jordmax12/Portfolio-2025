export const about = "Backend Engineer specializing in serverless architecture and cloud-native solutions. I build scalable, high-performance systems from 0 to 1 using AWS Lambda, DynamoDB, and modern serverless technologies. With a strong foundation in Node.js and growing expertise in Python and Go, I architect solutions that handle millions of requests with minimal infrastructure overhead.";



export const projects = [
  {
    title: 'Serverless Event Processing Platform',
    description: 'Built a high-throughput event processing system handling 10M+ events/day using AWS Lambda, DynamoDB, and SQS. Implemented dead letter queues, retry logic, and automated scaling.',
    tech: ['AWS Lambda', 'DynamoDB', 'SQS', 'EventBridge', 'Node.js', 'CloudFormation'],
    category: 'Backend',
    liveLink: '#',
    githubLink: 'https://github.com/jordmax12/serverless-events',
  },
  {
    title: 'GraphQL API with AppSync',
    description: 'Designed and implemented a scalable GraphQL API using AWS AppSync, Lambda resolvers, and DynamoDB. Features real-time subscriptions and fine-grained authorization.',
    tech: ['AWS AppSync', 'GraphQL', 'Lambda', 'DynamoDB', 'Cognito', 'TypeScript'],
    category: 'Backend',
    liveLink: '#',
    githubLink: 'https://github.com/jordmax12/appsync-api',
  },
  {
    title: 'Microservices Architecture',
    description: 'Architected a microservices platform using Lambda functions, API Gateway, and event-driven communication. Implemented distributed tracing and monitoring.',
    tech: ['AWS Lambda', 'API Gateway', 'EventBridge', 'X-Ray', 'CloudWatch', 'Node.js'],
    category: 'Infrastructure',
    liveLink: '#',
    githubLink: 'https://github.com/jordmax12/microservices-platform',
  },
  {
    title: 'Infrastructure as Code Pipeline',
    description: 'Built automated deployment pipelines using AWS CDK and GitHub Actions. Implemented blue-green deployments and automated rollback strategies.',
    tech: ['AWS CDK', 'CloudFormation', 'GitHub Actions', 'Lambda', 'TypeScript'],
    category: 'DevOps',
    liveLink: '#',
    githubLink: 'https://github.com/jordmax12/iac-pipeline',
  },
  {
    title: 'Real-time Analytics Dashboard',
    description: 'Created a real-time analytics platform using Kinesis Data Streams, Lambda, and DynamoDB. Processes millions of events with sub-second latency.',
    tech: ['Kinesis', 'AWS Lambda', 'DynamoDB', 'React', 'WebSocket', 'Node.js'],
    category: 'Full Stack',
    liveLink: '#',
    githubLink: 'https://github.com/jordmax12/analytics-dashboard',
  },
  {
    title: 'Serverless Image Processing Service',
    description: 'Built an image processing service using S3, Lambda, and Step Functions. Handles resizing, optimization, and metadata extraction at scale.',
    tech: ['S3', 'AWS Lambda', 'Step Functions', 'Python', 'ImageMagick', 'CloudFront'],
    category: 'Backend',
    liveLink: '#',
    githubLink: 'https://github.com/jordmax12/image-processor',
  },
  {
    title: 'Multi-tenant SaaS Platform',
    description: 'Designed and built a multi-tenant SaaS platform with isolated data, custom domains, and usage-based billing using Stripe integration.',
    tech: ['AWS Lambda', 'DynamoDB', 'Cognito', 'API Gateway', 'Stripe', 'React'],
    category: 'Full Stack',
    liveLink: '#',
    githubLink: 'https://github.com/jordmax12/saas-platform',
  },
  {
    title: 'Container Orchestration with ECS',
    description: 'Migrated monolithic application to containerized microservices using ECS Fargate, Application Load Balancer, and auto-scaling policies.',
    tech: ['ECS', 'Docker', 'Application Load Balancer', 'CloudWatch', 'Terraform'],
    category: 'Infrastructure',
    liveLink: '#',
    githubLink: 'https://github.com/jordmax12/ecs-microservices',
  }
];

export const contact = {
  email: 'jordan@jordanmax.io',
  linkedin: 'https://linkedin.com/in/jordanmax',
  resume: '/resume.pdf',
};
