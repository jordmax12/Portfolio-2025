export const about = "Backend Engineer specializing in serverless architecture and cloud-native solutions. I build scalable, high-performance systems from 0 to 1 using AWS Lambda, DynamoDB, and modern serverless technologies. With a strong foundation in Node.js and growing expertise in Python and Go, I architect solutions that handle millions of requests with minimal infrastructure overhead.";

export const skills = [
  'AWS Lambda', 'DynamoDB', 'S3', 'Cognito',
  'AppSync', 'API Gateway', 'CloudFormation', 'CDK',
  'Node.js', 'Python', 'Go', 'TypeScript',
  'Serverless Framework', 'Docker', 'CI/CD', 'GitHub Actions',
  'GraphQL', 'REST APIs', 'Microservices', 'Event-Driven Architecture'
];

export const projects = [
  {
    title: 'Serverless Event Processing Platform',
    description: 'Built a high-throughput event processing system handling 10M+ events/day using AWS Lambda, DynamoDB, and SQS. Implemented dead letter queues, retry logic, and automated scaling.',
    tech: ['AWS Lambda', 'DynamoDB', 'SQS', 'EventBridge', 'Node.js', 'CloudFormation'],
    liveLink: '#',
    githubLink: 'https://github.com/jordmax12/serverless-events',
  },
  {
    title: 'GraphQL API with AppSync',
    description: 'Designed and implemented a scalable GraphQL API using AWS AppSync, Lambda resolvers, and DynamoDB. Features real-time subscriptions and fine-grained authorization.',
    tech: ['AWS AppSync', 'GraphQL', 'Lambda', 'DynamoDB', 'Cognito', 'TypeScript'],
    liveLink: '#',
    githubLink: 'https://github.com/jordmax12/appsync-api',
  },
  {
    title: 'Microservices Architecture',
    description: 'Architected a microservices platform using Lambda functions, API Gateway, and event-driven communication. Implemented distributed tracing and monitoring.',
    tech: ['AWS Lambda', 'API Gateway', 'EventBridge', 'X-Ray', 'CloudWatch', 'Node.js'],
    liveLink: '#',
    githubLink: 'https://github.com/jordmax12/microservices-platform',
  },
  {
    title: 'Infrastructure as Code Pipeline',
    description: 'Built automated deployment pipelines using AWS CDK and GitHub Actions. Implemented blue-green deployments and automated rollback strategies.',
    tech: ['AWS CDK', 'CloudFormation', 'GitHub Actions', 'Lambda', 'TypeScript'],
    liveLink: '#',
    githubLink: 'https://github.com/jordmax12/iac-pipeline',
  }
];

export const contact = {
  email: 'jordan@jordanmax.io',
  linkedin: 'https://linkedin.com/in/jordanmax',
  resume: '/resume.pdf',
};
