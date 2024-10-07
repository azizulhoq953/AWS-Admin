import React from 'react';
import DistributionForm from './DistributionForm';

const ParentComponent = () => {
  const handleDistributionSubmit = (data) => {
    console.log('Received data:', data);
    // You can handle the data here, e.g., updating state or making another API call
  };

  return (
    <div>
      <h1>Create Distribution</h1>
      <DistributionForm onSubmit={handleDistributionSubmit} />
    </div>
  );
};

export default ParentComponent;
