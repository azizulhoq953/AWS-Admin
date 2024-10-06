import React, { useState } from 'react';
import TopNavigation from '@cloudscape-design/components/top-navigation';
import './pages.css';

// Placeholder values (update with your actual values)
const logo = 'pah/to/compute-logo.png';

// AWS service categories and their sub-options

// import shellIcon from '../../../public/images/icons8-console-24.png';

const awsServiceCategories = [
  {
    text: 'Analytics',
    logo: 'path/to/compute-logo.png',
    services: [
      { name: 'Athena', description: 'Serverless interactive analytics service', link: '/athena' },
      { name: 'AWS Clean Rooms', description: 'Collaborate on datasets without revealing raw data', link: '/aws-clean-rooms' },
      { name: 'CloudSearch', description: 'Managed Search Service', link: '/cloudsearch' },
      { name: 'AWS Data Exchange', description: 'Find, subscribe, and use third-party data', link: '/aws-data-exchange' },
      { name: 'Amazon Data Firehose', description: 'Real-time streaming delivery for any data at any scale', link: '/data-firehose' },
      { name: 'Data Pipeline', description: 'Orchestration for Data-Driven Workflows', link: '/data-pipeline' },
      { name: 'Amazon DataZone', description: 'Unlock data with built-in governance', link: '/datazone' },
      { name: 'EMR', description: 'Managed Hadoop Framework', link: '/emr' },
      { name: 'AWS Entity Resolution', description: 'ML-powered entity resolution service', link: '/entity-resolution' },
      { name: 'Amazon FinSpace', description: 'Data processing for Capital Markets', link: '/finspace' },
      { name: 'AWS Glue', description: 'Serverless data integration service', link: '/glue' },
      { name: 'AWS Glue DataBrew', description: 'Visual data preparation tool', link: '/glue-databrew' },
      { name: 'Kinesis', description: 'Real-time streaming data service', link: '/kinesis' },
      { name: 'AWS Lake Formation', description: 'Setup secure data lake', link: '/lake-formation' },
      { name: 'Managed Apache Flink', description: 'Managed service for Apache Flink', link: '/apache-flink' },
      { name: 'MSK', description: 'Managed service for Apache Kafka', link: '/msk' },
      { name: 'Amazon OpenSearch Service', description: 'Managed OpenSearch or Elasticsearch', link: '/opensearch' },
      { name: 'QuickSight', description: 'Fast business analytics', link: '/quicksight' },
      { name: 'Amazon Redshift', description: 'Cost-effective data warehousing', link: '/redshift' },
    ],
  },
  // Add other categories here...
  {
    text: 'Compute',
    logo: 'path/to/compute-logo.png',
    services: [
      { name: 'EC2', description: 'Scalable virtual servers in the cloud', link: '/ec2' },
      { name: 'Lambda', description: 'Run code without provisioning servers', link: '/lambda' },
      { name: 'Elastic Beanstalk', description: 'Easily deploy and scale applications', link: '/beanstalk' },
      // Add more compute-related services...
    ],
  },

  {
    text: 'Application Integration',
    logo: 'path/to/compute-logo.png',
    services: [
      { name: 'EC2', description: 'Scalable virtual servers in the cloud', link: '/ec2' },
      { name: 'Lambda', description: 'Run code without provisioning servers', link: '/lambda' },
      { name: 'Elastic Beanstalk', description: 'Easily deploy and scale applications', link: '/beanstalk' },
      // Add more compute-related services...
    ],
  },

  {
    text: 'Customer Enablement',
    logo: 'path/to/compute-logo.png',
    services: [
      { name: 'EC2', description: 'Scalable virtual servers in the cloud', link: '/ec2' },
      { name: 'Lambda', description: 'Run code without provisioning servers', link: '/lambda' },
      { name: 'Elastic Beanstalk', description: 'Easily deploy and scale applications', link: '/beanstalk' },
      // Add more compute-related services...
    ],
  },
  {
    text: 'Blockchain',
    logo: 'path/to/compute-logo.png',
    services: [
      { name: 'EC2', description: 'Scalable virtual servers in the cloud', link: '/ec2' },
      { name: 'Lambda', description: 'Run code without provisioning servers', link: '/lambda' },
      { name: 'Elastic Beanstalk', description: 'Easily deploy and scale applications', link: '/beanstalk' },
      // Add more compute-related services...
    ],
  },
  {
    text: 'Business Applications'
,
    logo: 'path/to/compute-logo.png',
    services: [
      { name: 'EC2', description: 'Scalable virtual servers in the cloud', link: '/ec2' },
      { name: 'Lambda', description: 'Run code without provisioning servers', link: '/lambda' },
      { name: 'Elastic Beanstalk', description: 'Easily deploy and scale applications', link: '/beanstalk' },
      // Add more compute-related services...
    ],
  },
  {
    text: 'Cloud Financial Management',
    logo: 'path/to/compute-logo.png',
    services: [
      { name: 'EC2', description: 'Scalable virtual servers in the cloud', link: '/ec2' },
      { name: 'Lambda', description: 'Run code without provisioning servers', link: '/lambda' },
      { name: 'Elastic Beanstalk', description: 'Easily deploy and scale applications', link: '/beanstalk' },
      // Add more compute-related services...
    ],
  },
  {
    text: 'Containers',
    logo: 'path/to/compute-logo.png',
    services: [
      { name: 'EC2', description: 'Scalable virtual servers in the cloud', link: '/ec2' },
      { name: 'Lambda', description: 'Run code without provisioning servers', link: '/lambda' },
      { name: 'Elastic Beanstalk', description: 'Easily deploy and scale applications', link: '/beanstalk' },
      // Add more compute-related services...
    ],
  },
  {
    text: 'Customer Enablement',
    logo: 'path/to/compute-logo.png',
    services: [
      { name: 'EC2', description: 'Scalable virtual servers in the cloud', link: '/ec2' },
      { name: 'Lambda', description: 'Run code without provisioning servers', link: '/lambda' },
      { name: 'Elastic Beanstalk', description: 'Easily deploy and scale applications', link: '/beanstalk' },
      // Add more compute-related services...
    ],
  },
  {
    text: 'Customer Enablement',
    logo: 'path/to/compute-logo.png',
    services: [
      { name: 'EC2', description: 'Scalable virtual servers in the cloud', link: '/ec2' },
      { name: 'Lambda', description: 'Run code without provisioning servers', link: '/lambda' },
      { name: 'Elastic Beanstalk', description: 'Easily deploy and scale applications', link: '/beanstalk' },
      // Add more compute-related services...
    ],
  },
  {
    text: 'Customer Enablement',
    logo: 'path/to/compute-logo.png',
    services: [
      { name: 'EC2', description: 'Scalable virtual servers in the cloud', link: '/ec2' },
      { name: 'Lambda', description: 'Run code without provisioning servers', link: '/lambda' },
      { name: 'Elastic Beanstalk', description: 'Easily deploy and scale applications', link: '/beanstalk' },
      // Add more compute-related services...
    ],
  },
  {
    text: 'Customer Enablement',
    logo: 'path/to/compute-logo.png',
    services: [
      { name: 'EC2', description: 'Scalable virtual servers in the cloud', link: '/ec2' },
      { name: 'Lambda', description: 'Run code without provisioning servers', link: '/lambda' },
      { name: 'Elastic Beanstalk', description: 'Easily deploy and scale applications', link: '/beanstalk' },
      // Add more compute-related services...
    ],
  },
  {
    text: 'Customer Enablement',
    logo: 'path/to/compute-logo.png',
    services: [
      { name: 'EC2', description: 'Scalable virtual servers in the cloud', link: '/ec2' },
      { name: 'Lambda', description: 'Run code without provisioning servers', link: '/lambda' },
      { name: 'Elastic Beanstalk', description: 'Easily deploy and scale applications', link: '/beanstalk' },
      // Add more compute-related services...
    ],
  },

];

const profileActions = [
  { text: 'Profile', href: '/profile' },
  { text: 'Sign out', href: '/signout' },
];

const TopNav = ({ search }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
    setSelectedCategory(null); // Reset the selected category when closing
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // Set the clicked category
  };

  return (
    <div>
      <TopNavigation
        identity={{
          href: '#',
          logo: {
            src: logo,
            alt: 'AWS logo',
          },
        }}
        search={search}
        utilities={[
          {
            type: 'button',
            text: 'AWS Services',
            iconName: 'Service',
            onClick: toggleDropdown,
            className: 'nav-button',
            'data-testid': 'aws-services-button',
          },
          {
            type: 'button',
            text: 'shell',
            icon: 'bash-icon', // Custom shell SVG icon
            className: 'nav-button',
            'data-testid': 'shell-button',
          },
          {
            type: 'button',
            iconName: 'notification',
            ariaLabel: 'Notifications',
            badge: true,
            disableUtilityCollapse: true,
          },
          {
            type: 'button',
            iconName: 'settings',
            title: 'Settings',
            ariaLabel: 'Settings',
          },
          {
            type: 'menu-dropdown',
            text: 'Customer name',
            description: 'customer@example.com',
            iconName: 'user-profile',
            items: profileActions,
          },
          
        ]}
      />

      {isDropdownOpen && (
        <div style={{ display: 'flex', left:'50px', position: 'absolute', backgroundColor: '#232f3e', padding: '20px', zIndex: 1000, boxShadow: '0px 50px 70px rgba(0, 0, 0, 0.1)', width: '850px',height:'50%' }}>
          {/* Cross Button to Close Dropdown */}
          <div style={{ position: 'absolute', right: '10px', top: '10px', color:'white', cursor: 'pointer', fontSize: '30px' }} onClick={closeDropdown}>
            &times; {/* Cross (X) symbol */}
          </div>

          {/* Left Panel for All Services with Scroll Bar */}
          <div style={{ width: '350px', marginRight: '20px', display: 'flex', flexDirection: 'column', height: '400px', overflowY: 'auto', height:'100%' }}>
            <h4>All Services</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {awsServiceCategories.map((category, index) => (
                <li
                  key={index}
                  style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                  onClick={() => handleCategoryClick(category)} // Handle category click
                >
                  <img src={category.logo} alt={`${category.text} logo`} style={{ width: '20px', marginRight: '10px' }} />
                  <span style={{ color: 'white' }}>{category.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Panel for Selected Category or Recently Visited */}
          <div style={{ width: '450px', marginLeft: '20px', overflowY: 'auto', height: '400px', height:'100%' }} data-testid="awsc-nav-services-menu-right-panel">
            {selectedCategory ? (
              <div>
                <h4>{selectedCategory.text}</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {selectedCategory.services.map((service, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                      <a href={service.link} style={{ textDecoration: 'none', color: 'white' }}>
                        <strong>{service.name}</strong>
                      </a>
                      <p>{service.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div>
                <h4>Recently Visited</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li><a href="/console-home" style={{ textDecoration: 'none', color: '#0073bb' }}>Console Home</a></li>
                  <li><a href="/insights" style={{ textDecoration: 'none', color: '#0073bb' }}>View resource insights, service shortcuts, and feature updates</a></li>
                  {/* Add more recently visited links */}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TopNav;
