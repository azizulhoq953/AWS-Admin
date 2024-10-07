import '../non-console/pages.css';
import React, { useState } from 'react';
import axios from 'axios'; // Import Axios

const DistributionForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    id: '',
    deliveryMethod: 'RTMP',
    domainName: '',
    origin: '',
    state: 'Deactivated',
    priceClass: 'Use all edge locations (best performance)',
    logging: 'on',
    sslCertificate: 'Default',
    tags: { department: [] },
    date: '',
  });

  // State for messages
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTagsChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      tags: { department: [value] }, // For simplicity, we set only one department
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/distributions', formData);
      console.log('Instance created:', response.data);
      
      // Check if onSubmit is a function before calling it
      if (typeof onSubmit === 'function') {
        onSubmit(formData);
      } else {
        console.error('onSubmit is not a function');
      }
  
      // Set success message
      setMessage('Instance created successfully!');
      setErrorMessage(''); // Clear error message
  
      // Reset form
      setFormData({
        id: '',
        deliveryMethod: 'RTMP',
        domainName: '',
        origin: '',
        state: 'Deactivated',
        priceClass: 'Use all edge locations (best performance)',
        logging: 'on',
        sslCertificate: 'Default',
        tags: { department: [] },
        date: '',
      });
    } catch (error) {
      console.error('Error creating Instance:', error);
      setErrorMessage('Error creating Instance. Please try again.'); // Set error message
      setMessage(''); // Clear success message
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="distribution-form">
      <h2>Create Instance</h2>
      
      {/* Success message */}
      {message && <p className="success-message">{message}</p>}
      
      {/* Error message */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div>
        <label htmlFor="id">ID:</label>
        <input
          type="text"
          id="id"
          name="id"
          value={formData.id}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="deliveryMethod">Delivery Method:</label>
        <select
          id="deliveryMethod"
          name="deliveryMethod"
          value={formData.deliveryMethod}
          onChange={handleChange}
        >
          <option value="RTMP">RTMP</option>
          <option value="HLS">HLS</option>
          <option value="HTTP">HTTP</option>
        </select>
      </div>
      <div>
        <label htmlFor="domainName">Domain Name:</label>
        <input
          type="text"
          id="domainName"
          name="domainName"
          value={formData.domainName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="origin">Origin:</label>
        <input
          type="text"
          id="origin"
          name="origin"
          value={formData.origin}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="state">State:</label>
        <select
          id="state"
          name="state"
          value={formData.state}
          onChange={handleChange}
        >
          <option value="Deactivated">Deactivated</option>
          <option value="Active">Active</option>
        </select>
      </div>
      <div>
        <label htmlFor="priceClass">Price Class:</label>
        <select
          id="priceClass"
          name="priceClass"
          value={formData.priceClass}
          onChange={handleChange}
        >
          <option value="Use all edge locations (best performance)">
            Use all edge locations (best performance)
          </option>
          <option value="Use only U.S., Canada, and Europe edge locations">
            Use only U.S., Canada, and Europe edge locations
          </option>
        </select>
      </div>
      <div>
        <label htmlFor="logging">Logging:</label>
        <select
          id="logging"
          name="logging"
          value={formData.logging}
          onChange={handleChange}
        >
          <option value="on">On</option>
          <option value="off">Off</option>
        </select>
      </div>
      <div>
        <label htmlFor="sslCertificate">SSL Certificate:</label>
        <select
          id="sslCertificate"
          name="sslCertificate"
          value={formData.sslCertificate}
          onChange={handleChange}
        >
          <option value="Default">Default</option>
          <option value="Custom">Custom</option>
        </select>
      </div>
      <div>
        <label htmlFor="tags">Tags (Department):</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags.department[0] || ''}
          onChange={handleTagsChange}
          placeholder="Enter department name"
        />
      </div>
      <div>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Create Distribution</button>
    </form>
  );
};

export default DistributionForm;
