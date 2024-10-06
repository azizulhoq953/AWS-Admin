
import React from 'react';
import { awsServices } from '../data/awsServices';
import './non-console/pages.css';

const AwsServicesCategories = () => {
  return (
    <div className='aws-services-container'>
    <div className="aws-category-box">
      <h1>AWS All Services Categories</h1>
      <div className="aws-services-grid">
        {awsServices.map((category, index) => (
          <div key={index} className="">
            <div className="aws-category-header">
              <img src={category.logo} alt={`${category.category} logo`} className="aws-category-logo" />
              <h2>{category.category}</h2>
            </div>
            <ul>
              {category.services.map((service, serviceIndex) => (
                <li key={serviceIndex} className="aws-service">
                  <a href={service.link} target="_blank" rel="noopener noreferrer">
                    <h3>{service.name}</h3>
                  </a>
                  <p>{service.description}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default AwsServicesCategories;
