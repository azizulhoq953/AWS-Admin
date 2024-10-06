// src/data/awsServices.js (or .tsx)

export const awsServices = [
    {
      category: 'Compute',
      logo: '/images/compute-logo.png', // Add logo path
      services: [
        { name: 'EC2', description: 'Virtual servers in the cloud', link: 'https://aws.amazon.com/ec2/' },
        { name: 'Lambda', description: 'Run code without thinking about servers', link: 'https://aws.amazon.com/lambda/' },
        { name: 'Elastic Beanstalk', description: 'Run and manage web apps', link: 'https://aws.amazon.com/elasticbeanstalk/' },
      ],
    },
    {
      category: 'Storage',
      logo: '/images/storage-logo.png', // Add logo path
      services: [
        { name: 'S3', description: 'Object storage built to store and retrieve data', link: 'https://aws.amazon.com/s3/' },
        { name: 'EBS', description: 'Block storage for EC2', link: 'https://aws.amazon.com/ebs/' },
        { name: 'EFS', description: 'File storage for EC2', link: 'https://aws.amazon.com/efs/' },
      ],
    },
    {
      category: 'Database',
      logo: '/images/database-logo.png', // Add logo path
      services: [
        { name: 'RDS', description: 'Managed relational databases', link: 'https://aws.amazon.com/rds/' },
        { name: 'DynamoDB', description: 'NoSQL database service', link: 'https://aws.amazon.com/dynamodb/' },
        { name: 'Aurora', description: 'MySQL and PostgreSQL-compatible relational database', link: 'https://aws.amazon.com/rds/aurora/' },
      ],
    },

    {
        category: 'Developer Tools',
        logo: '/images/database-logo.png', // Add logo path
        services: [
          { name: 'RDS', description: 'Managed relational databases', link: 'https://aws.amazon.com/rds/' },
          { name: 'DynamoDB', description: 'NoSQL database service', link: 'https://aws.amazon.com/dynamodb/' },
          { name: 'Aurora', description: 'MySQL and PostgreSQL-compatible relational database', link: 'https://aws.amazon.com/rds/aurora/' },
        ],
      },
      {
        category: 'Machine Learning',
        logo: '/images/database-logo.png', // Add logo path
        services: [
          { name: 'RDS', description: 'Managed relational databases', link: 'https://aws.amazon.com/rds/' },
          { name: 'DynamoDB', description: 'NoSQL database service', link: 'https://aws.amazon.com/dynamodb/' },
          { name: 'Aurora', description: 'MySQL and PostgreSQL-compatible relational database', link: 'https://aws.amazon.com/rds/aurora/' },
        ],
      },
      {
        category: 'Cloud Financial Management',
        logo: '/images/database-logo.png', // Add logo path
        services: [
          { name: 'RDS', description: 'Managed relational databases', link: 'https://aws.amazon.com/rds/' },
          { name: 'DynamoDB', description: 'NoSQL database service', link: 'https://aws.amazon.com/dynamodb/' },
          { name: 'Aurora', description: 'MySQL and PostgreSQL-compatible relational database', link: 'https://aws.amazon.com/rds/aurora/' },
        ],
      },
    // Add more categories and services as needed
  ];
  